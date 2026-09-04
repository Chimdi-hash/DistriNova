import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 relative overflow-hidden">
      
      {/* Background Floating Orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-70 floating" style={{ animationDelay: "0s" }}></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-200 rounded-full mix-blend-overlay filter blur-xl opacity-70 floating" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        
        <div className="glass-card sliding p-8 md:p-12 mb-10 w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4 text-center">
            Distri<span className="text-white drop-shadow-md">Nova</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-800 text-center font-medium mb-8">
            Decentralized Startup Grants & Verification
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/40 p-6 rounded-xl border border-white/50 floating" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-xl font-bold text-gray-900 mb-2">For Sponsors</h2>
              <p className="text-gray-800">
                Create grants with verifiable milestones. GenLayer's Equivalence Principle automatically validates GitHub stars or API metrics to release funds securely.
              </p>
              <button className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-colors w-full">
                Create Grant
              </button>
            </div>
            
            <div className="bg-white/40 p-6 rounded-xl border border-white/50 floating" style={{ animationDelay: "0.5s" }}>
              <h2 className="text-xl font-bold text-gray-900 mb-2">For Builders</h2>
              <p className="text-gray-800">
                Ship your project and claim grants instantly. No more waiting for centralized committees. Our Intelligent Contract verifies your impact.
              </p>
              <button className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-full font-bold border-2 border-gray-900 hover:bg-gray-100 transition-colors w-full">
                Claim Grant
              </button>
            </div>
          </div>
        </div>

        <div className="glass-card sliding p-8 md:p-12 w-full text-center" style={{ animationDelay: "0.3s" }}>
           <h3 className="text-2xl font-bold text-gray-900 mb-6">Active Grants</h3>
           
           <div className="flex flex-col gap-4">
              <div className="bg-white/50 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center text-left">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Agentic Swarm Framework</h4>
                    <p className="text-sm text-gray-800">Required: 1,000 GitHub Stars | Goal: Verify via GenVM LLM</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center gap-4">
                    <span className="font-mono font-bold text-gray-900 bg-white/60 px-3 py-1 rounded-md">5,000 GL</span>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 text-sm font-bold transition">Verify</button>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
