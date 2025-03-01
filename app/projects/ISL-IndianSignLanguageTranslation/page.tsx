"use client";
import React, { useState } from 'react';
import OpenposeKeypoints from './components/OpenposeKeypoints';
import BlazeposeKeypoints from './components/BlazeposeKeypoints';
import LoadTestVideoData from './loadtestvideodata';
import Image from 'next/image';
import ExpressionsPlot from './components/ExpressionsPlot';

const ISL = () => {
  const [keypointModel, setKeypointModel] = useState('Openpose');

  const handleKeypointModelChange = (newModel: React.ChangeEvent<HTMLSelectElement>) => {
    setKeypointModel(newModel.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      {/* Floating Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Indian Sign Language Translation</h1>
          <ul className="flex space-x-6">
            <li><a href="#problem" className="hover:text-blue-500">Problem</a></li>
            <li><a href="#approach" className="hover:text-blue-500">Approach</a></li>
            <li><a href="#model" className="hover:text-blue-500">Model</a></li>
            <li><a href="#dataset" className="hover:text-blue-500">Dataset</a></li>
            <li><a href="#visuals" className="hover:text-blue-500">Visuals</a></li>
          </ul>
        </div>
      </nav>


      <div className="relative flex flex-col items-center justify-center pt-24">
        <section id="problem" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">Problem Statement</h2>
          <p className="text-lg leading-relaxed">
            Indian Sign Language (ISL) is a crucial mode of communication for people with speaking and hearing impairments. Unlike American or British Sign Language, ISL has limited technological support. Our project aims to bridge this gap by creating an AI-powered translation system for ISL.
          </p>
        </section>

        <section id="approach" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">Approach</h2>
          <div className="flex justify-center">
            <Image src="/projects/ISL-block_diagram.png" alt="ISL-block-diagram" width={700} height={700} className="rounded-lg shadow-lg" />
          </div>
        </section>

        <section id="model" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">Model Selection</h2>
          <div className="flex justify-center mb-4">
            <select
              onChange={handleKeypointModelChange}
              value={keypointModel}
              className="px-4 py-2 border rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            >
              <option value="Openpose">Openpose</option>
              <option value="Blazepose">Blazepose</option>
            </select>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
            {keypointModel === 'Openpose' ? <OpenposeKeypoints /> : <BlazeposeKeypoints />}
          </div>
        </section>

        <section id="dataset" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">Dataset: INCLUDE</h2>
          <p className="text-lg leading-relaxed mb-4">
            The INCLUDE dataset contains 4292 videos of ISL signs recorded by deaf students from St. Louis School for the Deaf, Adyar, Chennai. Each video is labeled with the corresponding ISL sign and split into training and testing sets.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Characteristic</th>
                  <th className="border p-3">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-3">Categories</td><td className="border p-3">15</td></tr>
                <tr><td className="border p-3">Words</td><td className="border p-3">263</td></tr>
                <tr><td className="border p-3">Videos</td><td className="border p-3">4292</td></tr>
                <tr><td className="border p-3">Avg Videos per Class</td><td className="border p-3">16.3</td></tr>
                <tr><td className="border p-3">Avg Video Length</td><td className="border p-3">2.57s</td></tr>
                <tr><td className="border p-3">Min Video Length</td><td className="border p-3">1.28s</td></tr>
                <tr><td className="border p-3">Max Video Length</td><td className="border p-3">6.16s</td></tr>
                <tr><td className="border p-3">Frame Rate</td><td className="border p-3">25 fps</td></tr>
                <tr><td className="border p-3">Resolution</td><td className="border p-3">1920x1080</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="visuals" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">Visualizations</h2>
          <ExpressionsPlot />
        </section>
        <section id="visuals" className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-md mb-8">
          <h2 className="text-4xl font-extrabold mb-6">Test Videos Preview</h2>
          <LoadTestVideoData />

        </section>
      </div>
    </div>
  );
};

export default ISL;
