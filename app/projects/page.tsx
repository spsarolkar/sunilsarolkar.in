"use client";
import React from 'react'
import Header from "../header";
import Link from 'next/link';

const Index = () => {

  return (
    <div>
      <Header title="Projects" subtitle="" ></Header>
      <div className='flex flex-wrap justify-center min-h-screen py-10'>
        {/* Project 1: GCP ML Mock Exam */}
        <div className='justify-center m-4'>
          <div className="max-w-sm rounded overflow-hidden shadow-lg h-full bg-white">
            <img className="w-full h-48 object-cover" src="/assets/projects/GCPML_ENG_MOCK_EXAM/GCP_ml_exam_thumbnail.png" alt="GCP ML Exam" />
            <div className="px-6 py-4">
              <a href="https://spsarolkar.github.io/ml-cert-mock-exam/" target="_blank" rel="noopener noreferrer">
                <div className="font-bold text-xl mb-2 hover:text-blue-500">GCP ML Engineer Mock Exam App</div>
              </a>
              <p className="text-gray-700 text-base">Mock exam for GCP ML Engineer certification.</p>
            </div>
          </div>
        </div>

        {/* Project 2: StructFormer */}
        <div className='justify-center m-4'>
          <div className="max-w-sm rounded overflow-hidden shadow-lg h-full bg-white">
            <img className="w-full h-48 object-cover" src="/assets/projects/StructFormer/Structformer_Thumbnail.png" alt="StructFormer" />
            <div className="px-6 py-4">
              <Link href="/projects/structformer">
                <div className="font-bold text-xl mb-2 hover:text-blue-500">StructFormer</div>
              </Link>
              <p className="text-gray-700 text-base">Transformer-based model built to automate structured data transformation from one schema to another.</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Python</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#TensorFlow</span>
            </div>
          </div>
        </div>

        {/* Project 3: ISL (Existing) */}
        <div className='justify-center m-4'>
          <div className="max-w-sm rounded overflow-hidden shadow-lg h-full bg-white">
            <img className="w-full h-48 object-cover" src="/projects/ISL-Thumbnail.png" alt="ISL Translation" />
            <div className="px-6 py-4">
              <Link href="/projects/ISL-IndianSignLanguageTranslation"><div className="font-bold text-xl mb-2 hover:text-blue-500">Indian Sign Language Translation</div></Link>
              <p className="text-gray-700 text-base">Implementing the sign language translation feature for Indian Sign Language(ISL), using LSTM and Position models</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#signlanguage</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#translation</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#isl</span>
            </div>
          </div>
        </div>

        {/* Project 4: Vehicle Telemetry */}
        <div className='justify-center m-4'>
          <div className="max-w-sm rounded overflow-hidden shadow-lg h-full bg-white">
            <img className="w-full h-48 object-cover" src="/assets/projects/VehicleTelemetry/OBD2_Thumbnail.png" alt="Vehicle Telemetry" />
            <div className="px-6 py-4">
              <Link href="/projects/vehicle-telemetry">
                <div className="font-bold text-xl mb-2 hover:text-blue-500">Vehicle Telemetry</div>
              </Link>
              <p className="text-gray-700 text-base">Capturing vehicle parameters using Raspberry Pi & ELM327 with real-time anomaly detection.</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#IoT</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#RaspberryPi</span>
            </div>
          </div>
        </div>

        {/* Project 5: Rouge Syntax Highlighter */}
        <div className='justify-center m-4'>
          <div className="max-w-sm rounded overflow-hidden shadow-lg h-full bg-white">
            <img className="w-full h-48 object-cover" src="/assets/projects/SyntaxHeighlighting/syntax_heighlighte-thumbnail.png" alt="Rouge Theme Preview" />
            <div className="px-6 py-4">
              <a href="https://spsarolkar.github.io/rouge-theme-preview/" target="_blank" rel="noopener noreferrer">
                <div className="font-bold text-xl mb-2 hover:text-blue-500">Rouge Syntax Highlighter Preview</div>
              </a>
              <p className="text-gray-700 text-base">A simple application for previewing syntax highlighting using Rouge themes.</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Ruby</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Jekyll</span>
            </div>
          </div>
        </div>

        {/* Project 6: Findbugs Plugin */}
        <div className='justify-center m-4'>
          <div className="max-w-sm rounded overflow-hidden shadow-lg h-full bg-white">
            {/* No image for this one in JSON, using a placeholder or just text layout */}
            <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
            <div className="px-6 py-4">
              <a href="https://github.com/spsarolkar/Findbugs_AdResTrackr" target="_blank" rel="noopener noreferrer">
                <div className="font-bold text-xl mb-2 hover:text-blue-500">Findbugs Plugin</div>
              </a>
              <p className="text-gray-700 text-base">Plugin to fix connection leak detection issues in Findbugs.</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Java</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index

