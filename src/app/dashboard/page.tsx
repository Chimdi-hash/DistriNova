"use client";

import React, { useState } from "react";
import { useWallet } from "../../context/WalletContext";
import { PlusCircle, Search, CheckCircle, Clock, ExternalLink } from "lucide-react";

export default function Dashboard() {
  const { isConnected, walletAddress } = useWallet();
  const [activeTab, setActiveTab] = useState("explore");
  const [grants, setGrants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createData, setCreateData] = useState({ requiredStars: 1000, amount: 5000 });

  // Submit Modal State
  const [submitGrantId, setSubmitGrantId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitData, setSubmitData] = useState({ developerName: "", developer: "", repoUrl: "" });

  React.useEffect(() => {
    import("../../lib/genlayer").then(({ genlayerClient }) => {
      genlayerClient.getGrants().then((data) => {
        setGrants(Object.values(data));
        setIsLoading(false);
      });
    });
  }, []);

  const handleCreateGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const { genlayerClient } = await import("../../lib/genlayer");
      await genlayerClient.createGrant("", {
        grantId: Math.random().toString(36).substring(7),
        ...createData
      });
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleResolveGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitGrantId) return;
    setIsSubmitting(true);
    try {
      const { genlayerClient } = await import("../../lib/genlayer");
      await genlayerClient.resolveGrant("", submitGrantId, submitData.developerName, submitData.developer, submitData.repoUrl);
      setSubmitGrantId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClaim = async (grantId: string) => {
      const { genlayerClient } = await import("../../lib/genlayer");
      await genlayerClient.claimRewards("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Grant Dashboard</h1>
          <p className="text-gray-600 mt-1">Explore, sponsor, and claim DistriNova grants.</p>
        </div>
        
        {isConnected && (
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition"
          >
            <PlusCircle className="w-4 h-4" />
            Sponsor a Grant
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
      ) : isLoading ? (
        <div className="text-center py-20 text-gray-500 font-medium">Loading from GenLayer network...</div>
      ) : grants.length === 0 ? (
        <div className="glass-card p-12 text-center text-gray-500 font-medium">
          No grants found on the Studio Network yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grants.filter(g => activeTab === "explore" || g.developer === walletAddress || g.sponsor === walletAddress).map((grant) => (
            <div key={grant.id} className="glass-card p-6 flex flex-col hover:shadow-lg transition-shadow border border-white/60">
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${grant.has_resolved ? "bg-green-100 text-green-800 border-green-200" : "bg-blue-100 text-blue-800 border-blue-200"}`}>
                  {grant.has_resolved ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {grant.has_resolved ? "Resolved" : "Open Grant"}
                </span>
                <span className="font-mono text-sm font-bold text-gray-900 bg-white/60 px-2 py-1 rounded">{grant.amount} GEN</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">Grant #{grant.id}</h3>
              
              <div className="bg-white/40 p-3 rounded-lg mb-4 text-xs font-medium text-gray-700 flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>Target:</span>
                  <span className="font-bold">{grant.required_stars} Stars</span>
                </div>
                <div className="flex justify-between mt-1 pt-1 border-t border-gray-200/50">
                  <span>Sponsor:</span>
                  <span className="font-mono text-gray-500">{grant.sponsor ? grant.sponsor.substring(0,6) + '...' : 'Unknown'}</span>
                </div>
                {grant.developer && (
                  <div className="flex justify-between">
                    <span>Developer:</span>
                    <span className="font-mono text-gray-500">{grant.developer.substring(0,6)}...</span>
                  </div>
                )}
              </div>
              
              {grant.has_resolved && grant.developer === walletAddress ? (
                <button 
                  onClick={() => handleClaim(grant.id)}
                  className="w-full py-2 rounded-lg text-sm font-bold transition bg-green-600 text-white hover:bg-green-700 shadow-md flex items-center justify-center gap-2"
                >
                  Withdraw {grant.amount} GEN
                </button>
              ) : grant.has_resolved ? (
                <button disabled className="w-full py-2 rounded-lg text-sm font-bold transition bg-gray-200 text-gray-500 cursor-not-allowed">
                  Already Claimed by Developer
                </button>
              ) : (
                <button 
                  onClick={() => {
                     setSubmitData({ developerName: "", developer: walletAddress || "", repoUrl: "" });
                     setSubmitGrantId(grant.id);
                  }}
                  className="w-full py-2 rounded-lg text-sm font-bold transition bg-gray-900 text-white hover:bg-gray-800"
                  disabled={!isConnected}
                >
                  Submit & Verify
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Grant (Sponsor) Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sponsor a New Grant</h2>
            <p className="text-gray-600 text-sm mb-6">Deposit GEN into the contract escrow. Any developer who meets your star requirement can claim it.</p>
            
            <form onSubmit={handleCreateGrant} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Required Stars</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={createData.requiredStars}
                    onChange={(e) => setCreateData({...createData, requiredStars: parseInt(e.target.value) || 0})}
                    className="w-full bg-white/50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Payout (GEN)</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={createData.amount}
                    onChange={(e) => setCreateData({...createData, amount: parseInt(e.target.value) || 0})}
                    className="w-full bg-white/50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  type="button" 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isCreating}
                  className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isCreating ? "Escrowing..." : "Deposit & Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submit & Verify (Developer) Modal */}
      {submitGrantId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit to Grant #{submitGrantId}</h2>
            
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-6 rounded-r-lg">
              <p className="text-xs text-amber-800 font-medium">
                <strong>Security Proof:</strong> GenVM will scan your GitHub page to prove ownership. Make sure the <strong>Developer Name</strong> you enter below is visibly written in your repository's README or About section!
              </p>
            </div>
            
            <form onSubmit={handleResolveGrant} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Developer / Team Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. DistriNova Team"
                  value={submitData.developerName}
                  onChange={(e) => setSubmitData({...submitData, developerName: e.target.value})}
                  className="w-full bg-white/50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Your Wallet Address</label>
                <input 
                  type="text" 
                  required
                  value={submitData.developer}
                  onChange={(e) => setSubmitData({...submitData, developer: e.target.value})}
                  className="w-full bg-white/50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm text-gray-500"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">GitHub Repo URL</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://github.com/your-username/repo"
                  value={submitData.repoUrl}
                  onChange={(e) => setSubmitData({...submitData, repoUrl: e.target.value})}
                  className="w-full bg-white/50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  type="button" 
                  onClick={() => setSubmitGrantId(null)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {isSubmitting ? "GenVM Validating..." : "Verify & Claim"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
