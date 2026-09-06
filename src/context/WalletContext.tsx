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
        
        // Fetch real balance from the currently connected network
        const rawBalance = await ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });
        
        // Convert hex (wei) to decimal (GEN)
        const balanceInWei = parseInt(rawBalance, 16);
        const balanceInGen = balanceInWei / 1e18;

        setWalletAddress(accounts[0]);
        setIsConnected(true);
        setBalance(parseFloat(balanceInGen.toFixed(4))); 
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
