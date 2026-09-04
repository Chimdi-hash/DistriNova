import React from "react";
import { History, CheckCircle, ExternalLink, Activity, Network } from "lucide-react";
import Link from "next/link";

export default function Submissions() {
  const submissions = [
    {
      id: 1,
      title: "DeFi Analytics Dashboard",
      address: "0x3F9...a1C",
      payout: "10,000 GEN",
      time: "10 minutes ago",
      txHash: "0x8fa9...b22c",
      metric: "1,500 GitHub Stars",
      aiConfidence: "99.8%",
    },
    {
      id: 2,
      title: "Agentic Swarm Protocol",
      address: "0x7F2...b94",
      payout: "25,000 GEN",
      time: "2 hours ago",
      txHash: "0x2da1...e45f",
      metric: "Launched on Mainnet",
      aiConfidence: "98.5%",
    },
    {
      id: 3,
      title: "Studio Network Explorer",
      address: "0x1E4...c77",
      payout: "5,000 GEN",
      time: "5 hours ago",
      txHash: "0x9ef2...a11b",
      metric: "50,000 API Requests",
      aiConfidence: "99.1%",
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
      
      {/* Futuristic Background Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 floating"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 floating" style={{ animationDelay: "2s" }}></div>

      <div className="mb-12 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 border border-white/60 backdrop-blur-md mb-4 text-xs font-bold text-gray-800 uppercase tracking-widest shadow-sm">
            <Activity className="w-3 h-3 text-blue-600 animate-pulse" />
            Live Network Feed
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <Network className="w-8 h-8 text-blue-600" />
            Recent Submissions
          </h1>
          <p className="text-gray-700 mt-2 text-lg">Real-time GenVM validator consensus & payouts.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Global Validation</p>
          <p className="font-mono text-xl font-bold text-gray-900 bg-white/30 px-3 py-1 rounded-lg border border-white/50">100% Deterministic</p>
        </div>
      </div>

      <div className="relative z-10 grid gap-6">
        {submissions.map((sub, idx) => (
          <div 
            key={sub.id} 
            className="group relative bg-white/20 backdrop-blur-xl border border-white/40 rounded-3xl p-6 hover:bg-white/30 transition-all duration-500 shadow-[0_8px_32px_rgba(31,38,135,0.05)] hover:shadow-[0_8px_32px_rgba(31,38,135,0.15)] overflow-hidden sliding"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            {/* Glowing sweep effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>

            <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">
              
              {/* Left Column: Title & Verifier */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">{sub.title}</h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100/80 text-green-800 border border-green-200 shadow-sm">
                    <CheckCircle className="w-3.5 h-3.5" /> VERIFIED
                  </span>
                </div>
                <p className="text-gray-600 flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {sub.time}
                </p>
                
                <div className="inline-flex flex-wrap items-center gap-2 text-sm bg-white/40 px-3 py-2 rounded-xl border border-white/50">
                  <span className="text-gray-500">Developer:</span>
                  <span className="font-mono font-semibold text-gray-900 bg-white/50 px-2 rounded">{sub.address}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500">Tx:</span>
                  <span className="font-mono text-blue-600 hover:underline cursor-pointer">{sub.txHash}</span>
                </div>
              </div>
              
              {/* Right Column: Stats & Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col justify-between items-start lg:items-end gap-4 border-t lg:border-t-0 lg:border-l border-white/30 pt-4 lg:pt-0 lg:pl-6 min-w-[200px]">
                
                <div className="w-full">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 lg:text-right">GenVM Evaluation</p>
                  <div className="flex justify-between lg:justify-end items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 bg-white/50 px-2 rounded">{sub.metric}</span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-100/50 px-2 rounded-full shadow-inner">{sub.aiConfidence} Conf</span>
                  </div>
                </div>

                <div className="w-full flex justify-between lg:justify-end items-center gap-6 mt-auto">
                  <div className="lg:text-right">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Payout Settled</p>
                    <p className="font-mono text-2xl font-black text-gray-900 drop-shadow-sm">{sub.payout}</p>
                  </div>
                  <Link href="#" className="p-3 bg-gray-900 text-white hover:bg-blue-600 rounded-full transition-colors shadow-lg hover:shadow-blue-500/30 group-hover:scale-110 duration-300">
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
