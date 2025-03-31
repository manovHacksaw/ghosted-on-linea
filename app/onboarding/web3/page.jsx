"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Database,
  Shield,
  Award,
  Eye,
  FileCheck,
  Sparkles,
  Rocket,
  GraduationCap,
  BookOpen,
  Coins,
  Lock,
  Info,
  AlertCircle,
  ExternalLink,
  CheckCircle,
  XCircle,
  Wallet,
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useGhosted } from "@/context/GhostedContext"
import { SparklesCore } from "@/components/sparkles"
import { FloatingPaper } from "@/components/floating-paper"

export default function OnboardingPage() {
  const {
    address,
    isConnected,
    connectWallet,
    isCorrectChain,
    switchToLineaNetwork,
    onboardUser,
    loading,
    error: contextError,
    txHash,
    isConfirming,
    isConfirmed,
    LINEA_CONFIG,
  } = useGhosted()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    shareName: false,
    shareEmail: false,
    userType: 0, // Default to Applicant (0)
  })

  const [error, setError] = useState("")
  const [lineaInfo, setLineaInfo] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const toggleLineaInfo = () => {
    setLineaInfo(!lineaInfo)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    try {
      if (!window.ethereum) throw new Error("No crypto wallet found. Please install MetaMask.")

      if (!isConnected) {
        await connectWallet()
      }

      // Verify we're on the correct network
      if (!isCorrectChain) {
        await switchToLineaNetwork()
      }

      // Call the onboardUser function from context
      await onboardUser(
        formData.name,
        formData.email,
        formData.message,
        formData.shareEmail,
        formData.shareName,
        formData.userType,
      )

      setSuccess(true)
    } catch (error) {
      console.error("Error connecting to Linea Sepolia:", error)
      setError(error.message || "Failed to connect to Linea Sepolia. Please try again.")
    }
  }

  const features = [
    {
      icon: <Database className="h-6 w-6 text-blue-400" />,
      title: "On-Chain Tracking",
      description:
        "Every job application interaction is recorded on Linea Sepolia, preventing ghosting and ensuring accountability.",
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-400" />,
      title: "Decentralized Identity",
      description: "Control your career data with blockchain technology while maintaining full privacy and ownership.",
    },
    {
      icon: <Award className="h-6 w-6 text-blue-400" />,
      title: "Reputation System",
      description: "Recruiters build on-chain reputation scores based on their engagement and reliability.",
    },
    {
      icon: <Eye className="h-6 w-6 text-blue-400" />,
      title: "Profile Tracking",
      description: "Monitor who views your NFT-based resume while keeping your credentials verifiable.",
    },
    {
      icon: <FileCheck className="h-6 w-6 text-blue-400" />,
      title: "Verified Certifications",
      description: "Blockchain-verified skill certifications eliminate fraud and boost your credibility.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-blue-400" />,
      title: "Incentive Rewards",
      description: "Earn tokens for upskilling and applying to verified jobs in our incentive-driven ecosystem.",
    },
  ]

  const lineaBenefits = [
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Verifiable Credentials",
      description: "Certificates issued as NFTs",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Fast Transactions",
      description: "Powered by Linea L2 scaling",
    },
    {
      icon: <Coins className="h-5 w-5" />,
      title: "Low Gas Fees",
      description: "Affordable on-chain actions",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Data Privacy",
      description: "You control your data",
    },
  ]

  return (
    <div className="min-h-screen bg-black/[0.96] bg-grid-white/[0.02] text-white p-6 pt-20 relative overflow-hidden">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#00EDBE"
        />
      </div>

      {/* Floating papers in background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Linea Banner */}
        <div className="mb-10 text-center">
          <Badge variant="outline" className="mb-4 py-1.5 px-4 border-blue-400/30 text-blue-400">
            Powered by Linea Sepolia
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text">
            Welcome to the Future of Career Verification
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join our decentralized platform where your credentials, applications, and career progress are securely
            stored on Linea Sepolia, creating a transparent and accountable hiring ecosystem.
          </p>

          {/* Linea Benefits */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {lineaBenefits.map((benefit, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-blue-400 mb-2">{benefit.icon}</div>
                <h3 className="font-medium text-white">{benefit.title}</h3>
                <p className="text-sm text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Features Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Rocket className="mr-2 h-6 w-6 text-blue-400" />
              Features & Benefits
            </h2>

            <div className="grid grid-cols-1 gap-5">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/5 border border-white/10 hover:border-blue-400/30 transition-all backdrop-blur-sm"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="mt-1">{feature.icon}</div>
                      <div>
                        <h3 className="font-bold text-blue-400">{feature.title}</h3>
                        <p className="text-gray-300 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div>
            <Card className="bg-white/5 border border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text">
                  Connect to Linea Sepolia
                </CardTitle>
                <CardDescription className="text-center text-gray-300">
                  Your gateway to verifiable career credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isConnected ? (
                  <div className="text-center p-6">
                    <Wallet className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
                    <p className="text-gray-400 mb-6">
                      To interact with Linea Sepolia, you need to connect your Ethereum wallet first.
                    </p>
                    <Button
                      onClick={connectWallet}
                      className="bg-gradient-to-r from-purple-600 to-blue-400 hover:opacity-90 transition-opacity text-white"
                    >
                      Connect Wallet
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Connection Status Panel */}
                    <div className="bg-black/40 border border-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <h3 className="text-white font-medium mb-3">Connection Status</h3>

                      {/* Wallet Connection */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-gray-300">Wallet Connected</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {address ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-400" />
                              <span className="text-xs text-green-400">
                                {address.slice(0, 6)}...{address.slice(-4)}
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-red-400" />
                              <span className="text-xs text-red-400">Not Connected</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Network Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-gray-300">Linea Sepolia</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {loading && (
                            <span className="text-xs text-yellow-400 flex items-center gap-1">
                              <div className="h-3 w-3 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
                              Checking...
                            </span>
                          )}
                          {!loading && isCorrectChain ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-400" />
                              <span className="text-xs text-green-400">Connected</span>
                            </>
                          ) : !loading ? (
                            <>
                              <XCircle className="h-4 w-4 text-red-400" />
                              <Button
                                variant="link"
                                className="text-xs text-blue-400 p-0 h-auto"
                                onClick={switchToLineaNetwork}
                                type="button"
                              >
                                Switch Network
                              </Button>
                            </>
                          ) : null}
                        </div>
                      </div>

                      {/* Network Details */}
                      {isCorrectChain && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Info className="h-3 w-3" />
                            Connected to Linea Sepolia (Chain ID: 59141, Currency: LineaETH)
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Linea Token Info */}
                    <Alert className="bg-blue-900/20 border-blue-900/30 text-blue-300 backdrop-blur-sm">
                      <AlertCircle className="h-4 w-4" />
                      <div>
                        <AlertTitle className="text-blue-200 font-medium text-sm">Important</AlertTitle>
                        <AlertDescription className="flex flex-col gap-1">
                          <span>You&apos;ll need some LineaETH to pay for transaction gas fees.</span>
                          <div>
                            <Button
                              variant="link"
                              className="p-0 h-auto text-blue-300 underline text-xs"
                              onClick={toggleLineaInfo}
                              type="button"
                            >
                              {lineaInfo ? "Hide details" : "Show details"}
                            </Button>
                          </div>
                          {lineaInfo && (
                            <div className="text-xs mt-1 text-blue-200">
                              <p>Make sure to have enough LineaETH in your account.</p>
                              <p className="mt-1">
                                If not available, get tokens from:
                                <a
                                  href="https://faucet.goerli.linea.build/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 ml-1 flex items-center gap-1 inline-flex"
                                >
                                  Linea Sepolia Faucet
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </p>
                            </div>
                          )}
                        </AlertDescription>
                      </div>
                    </Alert>

                    {(error || contextError) && (
                      <Alert
                        variant="destructive"
                        className="bg-red-900/20 border-red-900/30 text-red-300 backdrop-blur-sm"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error || contextError}</AlertDescription>
                      </Alert>
                    )}

                    {txHash && (
                      <Alert className="bg-green-900/20 border-green-900/30 text-green-300 backdrop-blur-sm">
                        <FileCheck className="h-4 w-4" />
                        <AlertDescription>
                          Transaction submitted! Track it{" "}
                          <a
                            href={`${LINEA_CONFIG.blockExplorerUrls[0]}tx/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            here
                          </a>
                        </AlertDescription>
                      </Alert>
                    )}

                    {success && (
                      <Alert className="bg-green-900/20 border-green-900/30 text-green-300 backdrop-blur-sm">
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Successfully onboarded to Linea Sepolia! Your profile is now on-chain.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300">Your Name</label>
                        <Input
                          placeholder="Enter your name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-black/40 border-white/10 focus:border-blue-400/50 text-white"
                        />
                        <div className="flex items-center gap-2 mt-1">
                          <Checkbox
                            id="shareName"
                            checked={formData.shareName}
                            onCheckedChange={() => handleCheckboxChange("shareName")}
                            className="data-[state=checked]:bg-blue-400 data-[state=checked]:border-blue-400"
                          />
                          <label htmlFor="shareName" className="text-xs text-gray-400 flex items-center gap-1">
                            Share my name on Linea Sepolia
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-3 w-3" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Your name will be stored as part of your DID on Linea Sepolia</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-300">Your Email</label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-black/40 border-white/10 focus:border-blue-400/50 text-white"
                        />
                        <div className="flex items-center gap-2 mt-1">
                          <Checkbox
                            id="shareEmail"
                            checked={formData.shareEmail}
                            onCheckedChange={() => handleCheckboxChange("shareEmail")}
                            className="data-[state=checked]:bg-blue-400 data-[state=checked]:border-blue-400"
                          />
                          <label htmlFor="shareEmail" className="text-xs text-gray-400 flex items-center gap-1">
                            Share my email on Linea Sepolia
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-3 w-3" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Your email will be encrypted and only shared with approved recruiters</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-300">Your Message (Required)</label>
                        <Textarea
                          placeholder="Share why you're joining Ghosted..."
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="bg-black/40 border-white/10 focus:border-blue-400/50 text-white min-h-24"
                          required
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          This message will be stored on Linea Sepolia and visible to the community
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">User Type</label>
                        <RadioGroup
                          value={formData.userType.toString()}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, userType: Number.parseInt(value) }))
                          }
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="0"
                              id="applicant"
                              className="data-[state=checked]:bg-blue-400 data-[state=checked]:border-blue-400"
                            />
                            <Label htmlFor="applicant" className="text-gray-300">
                              Applicant
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="1"
                              id="recruiter"
                              className="data-[state=checked]:bg-blue-400 data-[state=checked]:border-blue-400"
                            />
                            <Label htmlFor="recruiter" className="text-gray-300">
                              Recruiter
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-400 hover:opacity-90 transition-opacity text-white"
                      disabled={loading || isConfirming}
                    >
                      {loading || isConfirming ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          {isConfirming ? "Confirming..." : "Processing..."}
                        </>
                      ) : !isCorrectChain ? (
                        <>
                          <Database className="mr-2 h-4 w-4" />
                          Switch to Linea Sepolia
                        </>
                      ) : (
                        <>
                          <Database className="mr-2 h-4 w-4" />
                          Onboard to Linea Sepolia
                        </>
                      )}
                    </Button>

                    <div className="bg-purple-900/10 border border-purple-900/20 rounded-lg p-3 text-sm text-gray-300 backdrop-blur-sm">
                      <p className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-400" />
                        Your data will be stored on Linea Sepolia with:
                      </p>
                      <ul className="mt-2 space-y-1 text-xs list-disc list-inside text-gray-400">
                        <li>End-to-end encryption for sensitive information</li>
                        <li>Decentralized identity (DID) for data ownership</li>
                        <li>Verifiable credentials as Soulbound Tokens</li>
                        <li>Fast and low-cost transactions via Linea L2 scaling</li>
                      </ul>
                    </div>

                    <p className="text-xs text-center text-gray-400">
                      By connecting, you agree to our terms and privacy policy. Your data will be stored securely on
                      Linea Sepolia and only shared according to your preferences.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

