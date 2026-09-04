import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/20 bg-white/30 backdrop-blur-sm mt-auto py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand and Credits */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-extrabold text-2xl tracking-tight text-gray-900">
            Distri<span className="text-white drop-shadow-sm">Nova</span>
          </Link>
          <p className="text-sm font-medium text-gray-700">
            Built by <span className="font-bold text-gray-900">u_stacklabs</span> on <span className="text-blue-600 font-semibold">GenLayer Studio Network</span>
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-gray-900 mb-2">Navigation</h4>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
          <Link href="/submissions" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Recent Submissions</Link>
          <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">FAQ</Link>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-gray-900 mb-2">Resources</h4>
          <Link
            href="https://docs.genlayer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            GenLayer Docs
            <ExternalLink className="w-3 h-3" />
          </Link>
          <Link
            href="https://studio.genlayer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            GenLayer Studio
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

      </div>
    </footer>
  );
}
