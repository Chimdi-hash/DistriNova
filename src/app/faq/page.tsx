"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    },
    {
      q: "Are the funds safe?",
      a: "Yes, funds are locked securely inside the Intelligent Contract. They are only released once the validators reach a consensus that the real-world milestone has been provably completed."
    },
    {
      q: "What kind of milestones are supported?",
      a: "Because we use GenLayer's LLM engine, we can evaluate nearly anything: GitHub stars, Product Hunt rankings, live web revenue dashboards, or specific API payloads."
    },
    {
      q: "Who evaluates the milestones?",
      a: "A decentralized set of validators on the GenLayer network run the evaluation locally and reach consensus via Optimistic Democracy."
    },
    {
      q: "What is the Equivalence Principle?",
      a: "It's the core mechanism in GenLayer that allows non-deterministic tasks (like LLM evaluations) to be verified by a decentralized network and agreed upon deterministically."
    },
    {
      q: "Can a sponsor cancel a grant?",
      a: "Once a grant is created and escrowed, it is locked. The sponsor cannot withdraw the funds unless a specified expiration period passes without the milestone being met."
    },
    {
      q: "How do I claim a grant as a builder?",
      a: "Navigate to the Dashboard, find your grant, and click 'Verify & Claim'. This triggers the GenLayer contract to evaluate your milestone."
    },
    {
      q: "What wallet do I need?",
      a: "DistriNova works with any Web3 wallet that supports the GenLayer Studio network configuration (like MetaMask)."
    },
    {
      q: "Is there a fee to use DistriNova?",
      a: "The only fees are the standard GenLayer network gas fees required to execute the transaction and compensate validators."
    },
    {
      q: "How can I appeal an incorrect milestone evaluation?",
      a: "GenLayer's Optimistic Democracy includes an appeal process. If the initial consensus is deemed incorrect, the transaction can be escalated to a wider set of validators."
    }
  ];

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">FAQ</h1>
        <p className="text-gray-600 mt-4 text-lg">Everything you need to know about DistriNova and GenLayer.</p>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className="w-full bg-white/20 backdrop-blur-md border border-white/40 rounded-[2rem] overflow-hidden transition-all duration-300 shadow-sm hover:bg-white/30 cursor-pointer"
              onClick={() => toggleOpen(index)}
            >
              <div className="flex justify-between items-center p-5 px-8">
                <h3 className="text-gray-900 font-semibold text-lg">{faq.q}</h3>
                <div className={`text-blue-600 transition-transform duration-300 ${isOpen ? "rotate-45 text-gray-600" : ""}`}>
                  <Plus className="w-6 h-6" />
                </div>
              </div>
              <div 
                className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="text-gray-700 leading-relaxed border-t border-white/40 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
