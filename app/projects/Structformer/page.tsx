"use client";
import React from "react";

const StructFormerShowcase = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      {/* Floating Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">StructFormer</h1>
          <ul className="flex space-x-6">
            <li><a href="#overview" className="hover:text-blue-500">Overview</a></li>
            <li><a href="#tech" className="hover:text-blue-500">Technologies</a></li>
            <li><a href="#arch" className="hover:text-blue-500">Architecture</a></li>
            <li><a href="#roadmap" className="hover:text-blue-500">Roadmap</a></li>
            <li><a href="#repo" className="hover:text-blue-500">Repository</a></li>
          </ul>
        </div>
      </nav>

      <div className="pt-28 flex flex-col items-center justify-center">
        <section id="overview" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">📊 Project Overview</h2>
          <p className="text-lg leading-relaxed">
            <strong>StructFormer</strong> is a Transformer-based model built to automate structured data adjustments from validation errors. It learns to generate SQL or CSV-based inserts, updates, or deletes based on input errors and lookup data.
          </p>
          <div className="bg-amber-50 border border-amber-300 text-amber-800 px-4 py-3 mt-4 rounded">
            🚀 Trained with SentencePiece tokenizer on domain-specific errors and adjustments<br />
            💡 Can be extended to any structured transformation task
          </div>
        </section>

        <section id="tech" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">🛠️ Technologies Used</h2>
          <ul className="grid grid-cols-2 gap-2 text-gray-700 text-lg list-disc list-inside">
            <li>Python 3.10</li>
            <li>Keras 3 with PyTorch backend</li>
            <li>SentencePiece Tokenizer</li>
            <li>Transformer Encoder-Decoder</li>
            <li>FastAPI (Planned)</li>
            <li>LangChain (Planned for prompt-based data refinement)</li>
          </ul>
        </section>

        <section id="arch" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">🧭 System Architecture</h2>
          <img
            src="/projects/Structformer/Structformer-Architecture.png"
            alt="System Architecture Diagram"
            className="rounded-lg border border-gray-300"
          />
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">✅ Implemented</h3>
            <ul className="list-disc list-inside">
              <li>Validation Error + Lookup ➝ SQL Adjustments</li>
              <li>Sliding window + BOS/EOS prep for Transformer</li>
              <li>Inference with custom greedy decoder</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2">🔜 Planned</h3>
            <ul className="list-disc list-inside">
              <li>Online fine-tuning via FastAPI backend</li>
              <li>LLM fallback support via HuggingFace pipeline</li>
              <li>Enterprise dashboard for per-record diff</li>
            </ul>
          </div>
        </section>

        <section id="roadmap" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">📌 Roadmap</h2>
          <ul className="list-disc list-inside text-lg">
            <li>✅ Tokenizer training with SentencePiece</li>
            <li>✅ Transformer model with custom layers</li>
            <li>✅ Inference with greedy decoding</li>
            <li>⏳ Model hosting on HuggingFace</li>
            <li>⏳ API-first interface with FastAPI</li>
          </ul>
        </section>

        <section id="repo" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">📂 GitHub Repository</h2>
          <a
            href="https://github.com/spsarolkar/StructFormer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 text-lg"
          >
            github.com/spsarolkar/StructFormer
          </a>
        </section>
      </div>
    </div>
  );
};

export default StructFormerShowcase;