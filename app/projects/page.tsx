"use client";
import React, { useState } from 'react'
import Header from "../header";
import Mymenu from "../mymenu";
import TopControls from './ISL-IndianSignLanguageTranslation/components/TopControls';
import OpenposeKeypoints from './ISL-IndianSignLanguageTranslation/components/OpenposeKeypoints';
import BlazeposeKeypoints from './ISL-IndianSignLanguageTranslation/components/BlazeposeKeypoints';
import Link from 'next/link';

const Index = () => {
  const [keypointModel, setKeypointModel] = useState('Openpose');

  const handleKeypointModelChange = (newModel: React.ChangeEvent<HTMLSelectElement>) => {
    setKeypointModel(newModel.target.value);
  };
  return (
    <div>
        <Mymenu />
        <Header title="Projects" subtitle="" ></Header>
        <div className='flex flex-wrap justify-center h-[80vh]'> 
        <div className='justify-center m-4'>
          
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img className="w-full" src="/projects/ISL-Thumbnail.png" alt="Sunset in the mountains" />
              <div className="px-6 py-4">
              <Link href="/projects/ISL-IndianSignLanguageTranslation"><div className="font-bold text-xl mb-2">Indian Sign Language Translation</div></Link>
                <p className="text-gray-700 text-base">Implementing the sign language translation feature for Indian Sign Language(ISL), using LSTM and Position models</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#signlanguage</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#translation</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#isl</span>
              </div>
            </div>
          
        </div>
        </div>
    </div>
  )
}

export default Index

