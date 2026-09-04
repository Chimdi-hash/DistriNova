"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Cpu, ShieldCheck, Zap, History, CheckCircle } from "lucide-react";
import { genlayerClient } from "../../lib/genlayer";

export default function Home() {
  const [grantCount, setGrantCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch directly from smart contract via genlayerClient
    const fetchGrants = async () => {
      const grants = await genlayerClient.getGrants();
      // Calculate length of the object keys or default to an empty state
      setGrantCount(Object.keys(grants).length);
      setIsLoading(false);
    };
    fetchGrants();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen relative overflow-hidden">
      
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 floating" style={{ animationDuration: "8s" }}></div>
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 floating" style={{ animationDuration: "10s", animationDelay: "2s" }}></div>
        <div className="absolute bottom-[10%] left-[40%] w-[600px] h-[600px] bg-white rounded-full mix-blend-overlay filter blur-[150px] opacity-50 floating" style={{ animationDuration: "12s", animationDelay: "4s" }}></div>
      </div>

      <div className="z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Hero Section */}
        <div className="w-full flex flex-col items-center text-center mt-24 mb-32 sliding">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 border border-white/50 backdrop-blur-md mb-8 text-sm font-semibold text-gray-800 shadow-sm hover:bg-white/40 transition-colors">
            <Zap className="w-4 h-4 text-yellow-500" />
            Live on GenLayer Studio Network
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tighter mb-6 leading-tight">
            The Future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-pink-600">
              Decentralized Grants
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 max-w-2xl font-medium mb-10 leading-relaxed">
            DistriNova uses GenLayer Intelligent Contracts to autonomously verify real-world startup milestones and securely release funds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold shadow-xl hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300">
              Explore Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/faq" className="inline-flex items-center gap-2 px-8 py-4 bg-white/40 backdrop-blur-md border border-white/60 text-gray-900 rounded-full font-bold shadow-sm hover:bg-white/60 transition-all duration-300">
              Learn More
            </Link>
          </div>
        </div>

        {/* Stats & Features Grid */}
        <div className="grid lg:grid-cols-3 gap-6 w-full mb-24 sliding" style={{ animationDelay: "0.2s" }}>
          <div className="glass-card p-8 rounded-[2rem] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Available Grants</h3>
              <p className="text-gray-600">Currently escrowed and waiting for verification on the network.</p>
            </div>
            <div className="mt-8">
              {isLoading ? (
                <div className="animate-pulse h-12 bg-gray-200/50 rounded w-24"></div>
              ) : (
                <span className="text-5xl font-extrabold text-gray-900">{grantCount}</span>
              )}
            </div>
          </div>

          <div className="glass-card p-8 rounded-[2rem] lg:col-span-2 relative overflow-hidden group">
            <div className="absolute right-0 top-0 opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-700">
              <ShieldCheck className="w-64 h-64 text-gray-900" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Equivalence Principle</h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-6 max-w-xl">
                Traditionally, grant distribution requires subjective manual reviews. DistriNova eliminates this by utilizing <strong>Optimistic Democracy</strong>. 
                Our Intelligent Contract autonomously fetches real-world web data (like GitHub stars) and uses LLMs natively in the GenVM to verify claims.
              </p>
              <Link href="/faq" className="text-blue-700 font-bold hover:underline flex items-center gap-1">
                Read how it works <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Submissions Snippet */}
        <div className="w-full mb-32 sliding" style={{ animationDelay: "0.4s" }}>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                <History className="w-8 h-8 text-blue-600" />
                Live Submissions
              </h2>
            </div>
            <Link href="/submissions" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2].map((item) => (
              <div key={item} className="bg-white/30 backdrop-blur-md border border-white/50 p-6 rounded-[1.5rem] hover:bg-white/40 transition-colors shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-gray-900 text-lg">DeFi Analytics Dashboard</h4>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold bg-green-100/80 text-green-800">
                    <CheckCircle className="w-3 h-3" /> VERIFIED
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-sm text-gray-600">Claimed by <span className="font-mono bg-white/50 px-1 rounded text-xs text-gray-800">0x3F...9a1</span></p>
                  <p className="font-mono font-bold text-gray-900 text-lg">10,000 GEN</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/submissions" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors sm:hidden block mt-6 text-center">
            View All Submissions →
          </Link>
        </div>

      </div>
    </div>
  );
}
