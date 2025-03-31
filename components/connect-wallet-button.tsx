"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Wallet, ChevronUp, ChevronDown } from "lucide-react";
import { useConnect } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";

export default function ConnectWalletButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { connectors, connect } = useConnect();

  const handleConnect = (connector: any) => {
    connect({ connector });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="text-white hover:text-[#00EDBE] hover:bg-white/5 transition-all flex items-center font-semibold"
      >
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
        {isOpen ? (
          <ChevronUp className="ml-2 w-4 h-4" /> // Show X when open
        ) : (
          <ChevronDown className="w-4 h-4 ml-2" /> // Default to Wallet icon when closed
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing the dropdown when clicking outside */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 bg-[#1A202C] rounded-lg shadow-lg border border-white/10 py-2 w-64 z-50" // BG Color changed
            >
              <div className="flex items-center justify-between px-4 pb-2 border-b border-white/10">
                <h3 className="text-white font-semibold">Select Wallet</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-400 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="py-2">
                {connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    onClick={() => handleConnect(connector)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left text-gray-300 hover:bg-[#00EDBE]/10 hover:text-white transition-colors"
                  >
                    <div className="flex items-center">
                        {connector.name.toLowerCase().includes("metamask") ? (
                           <img src="/wallet-icons/metamask.png" alt="MetaMask" className="w-5 h-5 mr-2" />
                            ) : connector.name.toLowerCase().includes("coinbase") ? (
                            <img src="/wallet-icons/coinbase.png" alt="Coinbase" className="w-5 h-5 mr-2" />
                           ) : (
                         <Wallet className="w-4 h-4 mr-2" />
                         )}

                      <span className="font-medium">{connector.name}</span>
                      {connector.name.toLowerCase().includes("metamask") && (
                        <span className="ml-2 text-xs text-[#00EDBE] font-medium px-2 py-0.5 bg-[#00EDBE]/10 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}