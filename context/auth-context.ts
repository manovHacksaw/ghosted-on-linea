"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const MetaMaskAuthContext = createContext();

export function MetaMaskAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Linea Sepolia network params
  const lineaSepoliaParams = {
    chainId: "0xe705", // 656476 in decimal
    chainName: "Linea Sepolia",
    nativeCurrency: {
      name: "LineaETH",
      symbol: "LineaETH",
      decimals: 18,
    },
    rpcUrls: ["wss://linea-sepolia-rpc.publicnode.com"],
    blockExplorerUrls: ["https://edu-chain-testnet.blockscout.com/"],
  };

  // Check if MetaMask is installed
  const isMetaMaskInstalled = useCallback(() => {
    return typeof window !== "undefined" && window.ethereum && window.ethereum.isMetaMask;
  }, []);

  // Initialize on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (!isMetaMaskInstalled()) return;

      try {
        // Check if already connected
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsAuthenticated(true);
          
          // Get current chain ID
          const chainId = await window.ethereum.request({ method: "eth_chainId" });
          setChainId(chainId);
        }
      } catch (err) {
        setError("Failed to check connection status");
        console.error(err);
      }
    };

    checkConnection();

    // Set up event listeners
    if (isMetaMaskInstalled()) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (isMetaMaskInstalled()) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [isMetaMaskInstalled]);

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      logout();
    } else {
      // Account changed
      setAccount(accounts[0]);
      setIsAuthenticated(true);
    }
  };

  // Handle chain changes
  const handleChainChanged = (newChainId) => {
    setChainId(newChainId);
    // Optional: Force page reload on chain change
    // window.location.reload();
  };

  // Switch to Linea Sepolia network
  const switchToLineaSepolia = async () => {
    if (!isMetaMaskInstalled()) {
      setError("MetaMask is not installed");
      return false;
    }

    try {
      // Try to switch to the network
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: lineaSepoliaParams.chainId }],
      });
      return true;
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [lineaSepoliaParams],
          });
          return true;
        } catch (addError) {
          setError("Failed to add Linea Sepolia network");
          console.error(addError);
          return false;
        }
      } else {
        setError("Failed to switch to Linea Sepolia network");
        console.error(switchError);
        return false;
      }
    }
  };

  // Connect wallet function
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError("MetaMask is not installed");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      
      // Switch to the correct network
      const switched = await switchToLineaSepolia();
      
      if (switched) {
        setIsAuthenticated(true);
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        setChainId(chainId);
      }
    } catch (err) {
      setError(err.message || "Failed to connect wallet");
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  // Logout function
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setAccount(null);
    // Note: MetaMask doesn't have a "disconnect" method. This just clears the local state.
  }, []);

  const value = {
    isAuthenticated,
    account,
    chainId,
    isConnecting,
    error,
    connectWallet,
    logout,
    isMetaMaskInstalled: isMetaMaskInstalled(),
    switchToLineaSepolia,
  };

  return (
    <MetaMaskAuthContext.Provider value={value}>
      {children}
    </MetaMaskAuthContext.Provider>
  );
}

export const useMetaMaskAuth = () => {
  const context = useContext(MetaMaskAuthContext);
  if (!context) {
    throw new Error(
      "useMetaMaskAuth must be used within a MetaMaskAuthProvider"
    );
  }
  return context;
};