import React from "react";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      q: "What is DistriNova?",
      a: "DistriNova is a decentralized startup funding platform. It uses GenLayer's Intelligent Contracts to automatically verify real-world milestones (like GitHub stars or API usage) and release escrowed funds without a centralized committee."
    },
    {
      q: "How does the verification work?",
      a: "When a milestone is claimed, the contract calls GenLayer's `gl.nondet.web.render` to fetch the live webpage (e.g. GitHub). It then uses an LLM (`gl.nondet.exec_prompt`) to extract the exact metric (e.g. number of stars). The validators use the Equivalence Principle to reach consensus on the LLM output."
    },
    {
      q: "Why build on GenLayer?",
      a: "GenLayer is the only network that natively supports fetching web data and evaluating it with AI via the GenVM, making autonomous grant distribution possible without trusting a single oracle."
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="glass-card p-6 border border-white/60">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
            <p className="text-gray-700 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
