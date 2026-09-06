"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  balance: number;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof (window as any).ethereum !== "undefined") {
      try {
        const ethereum = (window as any).ethereum;
        // Request account access
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        
        // Try to switch to GenLayer Studio Network
        const genLayerChainId = '0x12521'; // Example hex chain ID for GenLayer
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: genLayerChainId }],
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: genLayerChainId,
                    chainName: 'GenLayer Studio',
                    rpcUrls: ['https://studio.genlayer.com/rpc'],
                    nativeCurrency: {
                      name: 'GEN',
                      symbol: 'GEN',
                      decimals: 18
                    },
                  },
                ],
              });
            } catch (addError) {
              console.error("Failed to add GenLayer network", addError);
            }
          }
        }

        setWalletAddress(accounts[0]);
        setIsConnected(true);
        setBalance(5000); // Set mock balance for display purposes
      } catch (error) {
        console.error("User denied account access or error occurred:", error);
      }
    } else {
      alert('Please install MetaMask or another Web3 wallet to use DistriNova!');
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setBalance(0);
  };

  return (
    <WalletContext.Provider value={{ isConnected, walletAddress, balance, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
