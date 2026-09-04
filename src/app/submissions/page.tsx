import React from "react";
import { History, CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Submissions() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <History className="w-8 h-8 text-blue-600" />
          Recent Submissions
        </h1>
        <p className="text-gray-600 mt-2">View recently verified milestone claims on the GenLayer Network.</p>
      </div>

      <div className="glass-card overflow-hidden border border-white/60">
        <div className="divide-y divide-white/40">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-6 hover:bg-white/20 transition-colors">
              <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">DeFi Analytics Dashboard</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3" /> VERIFIED
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Claimed by <span className="font-mono bg-white/50 px-1 rounded">0x3F...9a1</span></p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">Payout</p>
                    <p className="font-mono font-bold text-gray-900">10,000 GEN</p>
                  </div>
                  <Link href="#" className="p-2 bg-white/60 hover:bg-white rounded-full transition-colors text-gray-700 hover:text-gray-900 shadow-sm">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
