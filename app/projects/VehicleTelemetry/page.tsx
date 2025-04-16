"use client";
import React from "react";

const VehicleTelemetryShowcase = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      {/* Floating Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Vehicle Telemetry Console</h1>
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
          <h2 className="text-4xl font-extrabold mb-6">🚗 Project Overview</h2>
          <p className="text-lg leading-relaxed">
            This project reads real-time <strong>vehicle telemetry</strong> (Speed and RPM)
            from a car’s <strong>OBD-II port</strong> using an <strong>ELM327 Bluetooth module</strong>
            and displays it on a <strong>Raspberry Pi-based instrument console</strong>.
          </p>
          <div className="bg-amber-50 border border-amber-300 text-amber-800 px-4 py-3 mt-4 rounded">
            ✅ Originally built in 2019 as a hobby project <br />
            📈 Planned: Stream to Kafka for ML-based real-time anomaly detection
          </div>
        </section>

        <section id="tech" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">🛠️ Technologies Used</h2>
          <ul className="grid grid-cols-2 gap-2 text-gray-700 text-lg list-disc list-inside">
            <li>Raspberry Pi (Python 3)</li>
            <li>ELM327 Bluetooth Module</li>
            <li>Bluetooth Serial Communication</li>
            <li>Custom Python UI for Dashboard</li>
            <li>🔜 Apache Kafka (Planned)</li>
            <li>🔜 Spark ML for Anomaly Detection (Planned)</li>
          </ul>
        </section>

        <section id="arch" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">🧭 System Architecture</h2>
          <img
            src="/projects/VehicleTelemetry/OBD2_Vehicle_detection.png"
            alt="System Architecture Diagram"
            className="rounded-lg border border-gray-300"
          />
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">✅ Implemented</h3>
            <ul className="list-disc list-inside">
              <li>Read OBD data via Bluetooth</li>
              <li>Display Speed/RPM on Pi</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2">🔜 Planned</h3>
            <ul className="list-disc list-inside">
              <li>Kafka data streaming</li>
              <li>Spark ML anomaly detection</li>
              <li>Fault prediction via ML</li>
            </ul>
          </div>
        </section>

        <section id="roadmap" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">📌 Roadmap</h2>
          <ul className="list-disc list-inside text-lg">
            <li>✅ Fetch RPM and Speed from OBD</li>
            <li>✅ Build UI Dashboard on Pi</li>
            <li>⏳ Kafka Integration</li>
            <li>⏳ Train ML Model</li>
            <li>⏳ Real-time Anomaly Detection</li>
          </ul>
        </section>
        <section id="roadmap" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
        <h2 className="text-4xl font-extrabold mb-6">Demo Video</h2>
        <iframe width="1080" height="610" src="https://www.youtube.com/embed/X3aA26rKwIs" title="🚗 Vehicle Telemetry Console using Raspberry Pi + ELM327 (OBD-II Bluetooth)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </section>
        <section id="repo" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">📂 GitHub Repository</h2>
          <a
            href="https://github.com/spsarolkar/Tesla/tree/master"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 text-lg"
          >
            github.com/spsarolkar/Tesla
          </a>
        </section>
      </div>
    </div>
  );
};

export default VehicleTelemetryShowcase;