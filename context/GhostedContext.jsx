"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain, useBalance, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { metaMask } from "wagmi/connectors"
import { parseAbi } from "viem"
import { CONTRACT_ADDRESS } from "@/utils/constants"
import CONTRACT_ABI from "@/utils/abi"

const GhostedContext = createContext(null)

const LINEA_CONFIG = {
    chainId: "0xe705", // 59141 in hex
    chainName: "Linea Sepolia",
    nativeCurrency: {
        name: "LineaETH",
        symbol: "LineaETH",
        decimals: 18,
    },
    rpcUrls: ["https://linea-sepolia-rpc.publicnode.com"],
    blockExplorerUrls: ["https://sepolia.lineascan.build/"],
}

export function GhostedProvider({ children }) {
    const { address, isConnected } = useAccount()
    const { data: balanceData } = useBalance({
        address,
        enabled: !!address,
    })
    const { connect } = useConnect({ connector: metaMask() })
    const { disconnect } = useDisconnect()
    const chainId = useChainId()
    const { switchChain } = useSwitchChain()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { writeContract, isPending: isWritePending, data: txHash } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: txHash,
    })

    const isCorrectChain = chainId === parseInt(LINEA_CONFIG.chainId, 16)

    const connectWallet = async () => {
        try {
            setLoading(true)
            setError(null)
            await connect()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const switchToLineaNetwork = async () => {
        try {
            setLoading(true)
            setError(null)
            
            if (window.ethereum) {
                try {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: LINEA_CONFIG.chainId }],
                    })
                } catch (switchError) {
                    // This error code indicates that the chain has not been added to MetaMask
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [LINEA_CONFIG],
                        })
                    } else {
                        throw switchError
                    }
                }
            } else {
                throw new Error("MetaMask is not installed")
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // 📌 Function to onboard a user
    const onboardUser = async (_name, _email, _message, _shareEmail, _shareName, _userType) => {
        try {
            setLoading(true)
            setError(null)

            if (!isCorrectChain) {
                await switchToLineaNetwork()
            }

            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: "onboardUser",
                args: [_name, _email, _message, _shareEmail, _shareName, _userType]
            })
            
            return txHash
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    // 📌 Function to submit a job application
    const submitApplication = async (_jobId, _metadataURI) => {
        try {
            setLoading(true)
            setError(null)

            if (!isCorrectChain) {
                await switchToLineaNetwork()
            }

            const tx = await writeContract({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: "submitApplication",
                args: [_jobId, _metadataURI]
            })
            return tx
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    // 📌 Function to record application view
    const recordView = async (_appId) => {
        try {
            setLoading(true)
            setError(null)

            if (!isCorrectChain) {
                await switchToLineaNetwork()
            }

            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: "recordView",
                args: [_appId]
            })
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    // 📌 Function to update application status
    const updateStatus = async (_appId, _newStatus) => {
        try {
            setLoading(true)
            setError(null)

            if (!isCorrectChain) {
                await switchToLineaNetwork()
            }

            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: "updateStatus",
                args: [_appId, _newStatus]
            })
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return (
        <GhostedContext.Provider value={{
            address,
            isConnected,
            balanceData,
            connectWallet,
            disconnect,
            isCorrectChain,
            switchToLineaNetwork,
            loading,
            error,
            onboardUser,
            submitApplication,
            recordView,
            updateStatus,
            txHash,
            isConfirming,
            isConfirmed,
            LINEA_CONFIG
        }}>
            {children}
        </GhostedContext.Provider>
    )
}

export function useGhosted() {
    const context = useContext(GhostedContext)
    if (!context) {
        throw new Error("useGhosted must be used within a GhostedProvider")
    }
    return context
}
