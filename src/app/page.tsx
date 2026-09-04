import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Cpu, Coins } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative overflow-hidden flex-grow">
      {/* Background Floating Orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-60 floating" style={{ animationDelay: "0s" }}></div>
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-pink-300 rounded-full mix-blend-overlay filter blur-2xl opacity-50 floating" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        
        <div className="sliding mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Welcome to Distri<span className="text-white drop-shadow-sm">Nova</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            The next generation of decentralized startup funding, powered by <span className="font-bold text-gray-900">GenLayer Intelligent Contracts</span>.
          </p>
        </div>

        <div className="glass-card sliding p-8 md:p-10 w-full mb-12 text-left shadow-lg border border-white/40">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-blue-600" />
            Solving the Trust Problem
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Traditionally, grant distribution relies on centralized committees or subjective manual reviews to verify if a startup has met its milestones. DistriNova eliminates this bottleneck by utilizing GenLayer's <strong>Optimistic Democracy</strong> and <strong>Equivalence Principle</strong>. 
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our platform allows sponsors to escrow funds securely. When a builder claims a milestone (like reaching 1,000 GitHub stars or shipping a product), the Intelligent Contract autonomously fetches real-world web data and uses Large Language Models natively in the GenVM to verify the claim. If consensus is reached, the funds are instantly released.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full mb-12">
          <div className="glass-card p-6 floating shadow-md" style={{ animationDelay: "0.2s" }}>
            <Cpu className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Intelligent Verification</h3>
            <p className="text-sm text-gray-700">Native LLM evaluation of live web data ensures milestones are actually met.</p>
          </div>
          <div className="glass-card p-6 floating shadow-md" style={{ animationDelay: "0.4s" }}>
            <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Trustless Escrow</h3>
            <p className="text-sm text-gray-700">Funds are locked securely in GenLayer smart contracts until conditions are met.</p>
          </div>
          <div className="glass-card p-6 floating shadow-md" style={{ animationDelay: "0.6s" }}>
            <Coins className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Payouts</h3>
            <p className="text-sm text-gray-700">Builders receive their GEN tokens immediately upon validator consensus.</p>
          </div>
        </div>

        <div className="sliding" style={{ animationDelay: "0.4s" }}>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:bg-gray-800 transition-all hover:scale-105 active:scale-95">
            Launch App
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
