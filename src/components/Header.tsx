"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWallet } from "../context/WalletContext";
import { Wallet, LogOut, Menu, X } from "lucide-react";

export default function Header() {
  const { isConnected, walletAddress, balance, connectWallet, disconnectWallet } = useWallet();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

          {/* Desktop Navigation */}
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

          {/* Right side Actions (Wallet / Hamburger) */}
          <div className="flex items-center gap-4">
            {/* Desktop Wallet Actions */}
            <div className="hidden md:flex items-center gap-4">
              {!isConnected ? (
                <button
                  onClick={connectWallet}
                  className="inline-flex items-center gap-2 justify-center rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-all"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-600 font-medium">Balance</span>
                    <span className="text-sm font-bold text-gray-900">{balance.toLocaleString()} GEN</span>
                  </div>
                  <div className="h-8 w-px bg-gray-300"></div>
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

            {/* Mobile Hamburger Button */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 rounded-md hover:bg-white/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/20 bg-white/60 backdrop-blur-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="block px-3 py-3 text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-white/40 rounded-md">
              Home
            </Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/dashboard" className="block px-3 py-3 text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-white/40 rounded-md">
              Dashboard
            </Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/submissions" className="block px-3 py-3 text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-white/40 rounded-md">
              Recent Submissions
            </Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/faq" className="block px-3 py-3 text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-white/40 rounded-md">
              FAQ
            </Link>

            <div className="mt-4 pt-4 border-t border-gray-200/50">
              {!isConnected ? (
                <button
                  onClick={() => { connectWallet(); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-all"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center bg-white/40 p-3 rounded-xl border border-white/60">
                    <span className="text-sm text-gray-600 font-medium">Balance</span>
                    <span className="text-sm font-bold text-gray-900">{balance.toLocaleString()} GEN</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/40 p-3 rounded-xl border border-white/60">
                    <span className="text-sm font-medium text-gray-800">{walletAddress}</span>
                    <button
                      onClick={() => { disconnectWallet(); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-1 text-sm text-red-600 font-bold hover:text-red-700 transition-colors"
                    >
                      Disconnect <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
