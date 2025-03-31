"use client"
import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles, Rocket, MessageSquare, Ghost, CheckCircle, ArrowRight, Award, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 15000) // Show after 15 seconds
    return () => clearTimeout(timer)
  }, [])

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push("/onboarding/web3")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-black via-gray-900 to-black border border-white/10 shadow-xl shadow-blue-500/20 p-0 overflow-hidden">
        {/* Animated glow effect background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#141BEB]/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#00EDBE]/30 rounded-full blur-3xl"></div>
        </div>

        {/* Progress indicator */}
        <div className="relative z-10 flex justify-center gap-2 py-3 border-b border-white/10">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-16 h-1 rounded-full transition-all duration-300 ${
                i <= step ? "bg-gradient-to-r from-[#141BEB] to-[#00EDBE]" : "bg-white/20"
              }`}
            ></div>
          ))}
        </div>

        <div className="relative z-10 text-center space-y-4 p-6">
          {step === 1 && (
            <>
              <div className="flex justify-center items-center space-x-2 text-3xl">
                <span className="animate-pulse">✨</span>
                <span className="font-bold bg-gradient-to-r from-[#141BEB] to-[#00EDBE] text-transparent bg-clip-text">
                  Congratulations!
                </span>
                <span className="animate-pulse">✨</span>
              </div>
              
              <p className="text-lg text-gray-200 font-medium">
                Your career journey is ready to take off! <Rocket className="inline-block h-5 w-5 text-[#00EDBE] ml-1" />
              </p>
              
              <div className="space-y-3 bg-white/5 rounded-lg p-4 border border-[#00EDBE]/20">
                <div className="flex items-center gap-2 text-[#00EDBE]">
                  <CheckCircle className="h-5 w-5" />
                  <span>AI-powered career insights ready</span>
                </div>
                <div className="flex items-center gap-2 text-[#00EDBE]">
                  <CheckCircle className="h-5 w-5" />
                  <span>Smart job tracking & skill recommendations set</span>
                </div>
                <div className="flex items-center gap-2 text-[#00EDBE]">
                  <CheckCircle className="h-5 w-5" />
                  <span>Personalized learning paths unlocked</span>
                </div>
              </div>
              
              <Badge className="bg-gradient-to-r from-[#141BEB]/50 to-[#00EDBE]/50 text-white border-none py-1 px-3">
                <Award className="mr-1 h-4 w-4" /> Onboarding Complete
              </Badge>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 rounded-full bg-[#141BEB]/20 flex items-center justify-center">
                  <Ghost className="h-8 w-8 text-[#00EDBE]" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white">
                Join our Web3 Network
              </h3>
              
              <p className="text-gray-300">
                Connect with professionals in a decentralized ecosystem that puts you in control.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <Zap className="h-5 w-5 text-[#00EDBE] mb-2" />
                  <p className="text-sm text-white font-medium">Verified Credentials</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <MessageSquare className="h-5 w-5 text-[#00EDBE] mb-2" />
                  <p className="text-sm text-white font-medium">Direct Connections</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <Award className="h-5 w-5 text-[#00EDBE] mb-2" />
                  <p className="text-sm text-white font-medium">Skill NFTs</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <Sparkles className="h-5 w-5 text-[#00EDBE] mb-2" />
                  <p className="text-sm text-white font-medium">Token Rewards</p>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex justify-center items-center space-x-2 text-2xl">
                <span className="font-bold bg-gradient-to-r from-[#141BEB] to-[#00EDBE] text-transparent bg-clip-text">
                  Claim Your Signup Bonus
                </span>
              </div>
              
              <div className="relative flex justify-center my-4">
                <div className="absolute inset-0 bg-[#00EDBE]/10 blur-2xl rounded-full"></div>
                <div className="relative bg-gradient-to-r from-[#141BEB] to-[#00EDBE] p-1 rounded-full">
                  <div className="bg-black rounded-full p-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-white">500</span>
                      <p className="text-sm text-[#00EDBE]">CAREER TOKENS</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 text-left">
                <p className="text-gray-300 text-sm">
                  <CheckCircle className="inline-block h-4 w-4 text-[#00EDBE] mr-2" />
                  Unlock premium job listings and recommendations
                </p>
                <p className="text-gray-300 text-sm">
                  <CheckCircle className="inline-block h-4 w-4 text-[#00EDBE] mr-2" />
                  Access advanced AI career coaching sessions
                </p>
                <p className="text-gray-300 text-sm">
                  <CheckCircle className="inline-block h-4 w-4 text-[#00EDBE] mr-2" />
                  Join exclusive networking events and career fairs
                </p>
              </div>
              
              <p className="text-white/60 text-xs mt-2">
                Limited time offer - first 1000 users only!
              </p>
            </>
          )}

          <Button 
            className="w-full bg-gradient-to-r from-[#141BEB] to-[#00EDBE] hover:opacity-90 transition-opacity text-white font-medium mt-4"
            onClick={handleNext}
          >
            {step === 3 ? (
              <>
                Claim & Continue
                <Ghost className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Next Step
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
          
          {step < 3 && (
            <button 
              className="text-xs text-gray-400 hover:text-gray-300 transition-colors mt-2"
              onClick={() => router.push("/onboarding/web3")}
            >
              Skip for now
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}