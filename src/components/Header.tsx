"use client";

import React from "react";
import Link from "next/link";
import { useWallet } from "../context/WalletContext";
import { Wallet, LogOut } from "lucide-react";

export default function Header() {
  const { isConnected, walletAddress, balance, connectWallet, disconnectWallet } = useWallet();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/40 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-gray-900 hover:opacity-80 transition-opacity">
              <span>Distri<span className="text-white drop-shadow-sm">Nova</span></span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/submissions" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Recent Submissions
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              FAQ
            </Link>
          </nav>

          {/* Wallet Actions */}
          <div className="flex items-center gap-4">
            {!isConnected ? (
              <button
                onClick={connectWallet}
                className="inline-flex items-center gap-2 justify-center rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-all"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs text-gray-600 font-medium">Balance</span>
                  <span className="text-sm font-bold text-gray-900">{balance.toLocaleString()} GEN</span>
                </div>
                <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>
                <div className="flex items-center gap-2 bg-white/50 border border-white/60 rounded-full px-3 py-1.5 shadow-sm">
                  <span className="text-sm font-medium text-gray-800">{walletAddress}</span>
                  <button
                    onClick={disconnectWallet}
                    className="text-gray-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                    title="Disconnect Wallet"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
