import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/20 bg-white/30 backdrop-blur-sm mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm font-medium text-gray-700">
          Built by <span className="font-bold text-gray-900">u_stacklabs</span> on <span className="text-blue-600 font-semibold">Genlayer Studio Network</span>
        </p>
        <div className="flex gap-6">
          <Link
            href="https://docs.genlayer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            GenLayer Docs
            <ExternalLink className="w-3 h-3" />
          </Link>
          <Link
            href="https://studio.genlayer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            GenLayer Studio
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
