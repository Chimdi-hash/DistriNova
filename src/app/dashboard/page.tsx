"use client";

import React, { useState } from "react";
import { useWallet } from "../../context/WalletContext";
import { PlusCircle, Search, CheckCircle, Clock } from "lucide-react";

export default function Dashboard() {
  const { isConnected } = useWallet();
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Grant Dashboard</h1>
          <p className="text-gray-600 mt-1">Explore, sponsor, and claim DistriNova grants.</p>
        </div>
        
        {isConnected && (
          <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition">
            <PlusCircle className="w-4 h-4" />
            Create Grant
          </button>
        )}
      </div>

      <div className="flex border-b border-white/40 mb-6">
        <button 
          onClick={() => setActiveTab("explore")}
          className={`pb-3 px-4 text-sm font-medium transition-colors ${activeTab === "explore" ? "border-b-2 border-gray-900 text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
        >
          Explore Grants
        </button>
        <button 
          onClick={() => setActiveTab("my-grants")}
          className={`pb-3 px-4 text-sm font-medium transition-colors ${activeTab === "my-grants" ? "border-b-2 border-gray-900 text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
        >
          My Grants
        </button>
      </div>

      {!isConnected && activeTab === "my-grants" ? (
        <div className="glass-card p-10 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center mb-4 text-gray-500">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Wallet Not Connected</h3>
          <p className="text-sm text-gray-600 mb-4">Please connect your wallet to view your grants and sponsorships.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mock Grant Card */}
          <div className="glass-card p-6 flex flex-col hover:shadow-lg transition-shadow border border-white/60">
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                <Clock className="w-3 h-3" /> Active
              </span>
              <span className="font-mono text-sm font-bold text-gray-900 bg-white/60 px-2 py-1 rounded">5,000 GEN</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">Agentic Swarm Framework</h3>
            <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">Build a swarm framework for GenVM with at least 1,000 GitHub stars.</p>
            
            <div className="bg-white/40 p-3 rounded-lg mb-4 text-xs font-medium text-gray-700 flex flex-col gap-1">
              <div className="flex justify-between">
                <span>Required:</span>
                <span className="font-bold">1,000 Stars</span>
              </div>
              <div className="flex justify-between">
                <span>Current:</span>
                <span className="font-mono">Verification Pending</span>
              </div>
            </div>
            
            <button className="w-full py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition disabled:opacity-50" disabled={!isConnected}>
              Verify & Claim
            </button>
          </div>

          {/* Another Mock Grant Card */}
          <div className="glass-card p-6 flex flex-col hover:shadow-lg transition-shadow border border-white/60">
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                <CheckCircle className="w-3 h-3" /> Resolved
              </span>
              <span className="font-mono text-sm font-bold text-gray-900 bg-white/60 px-2 py-1 rounded">2,500 GEN</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">Studio Network Explorer</h3>
            <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">A block explorer dedicated to the GenLayer Studio Network.</p>
            
            <div className="bg-white/40 p-3 rounded-lg mb-4 text-xs font-medium text-gray-700 flex flex-col gap-1">
              <div className="flex justify-between">
                <span>Required:</span>
                <span className="font-bold">Live URL</span>
              </div>
              <div className="flex justify-between">
                <span>Result:</span>
                <span className="text-green-700 font-bold">Verified by GenVM</span>
              </div>
            </div>
            
            <button className="w-full py-2 bg-gray-200 text-gray-500 rounded-lg text-sm font-bold cursor-not-allowed">
              Already Claimed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
