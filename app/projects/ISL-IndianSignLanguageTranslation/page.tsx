"use client";
import React, { useState } from 'react'
import Header from "../../header";
import Mymenu from "../../mymenu";
import TopControls from './components/TopControls';
import PoseVisualization from './components/PoseVisualiser';
import sampleOpenPoseData from './components/SamplePoseData';
import OpenposeKeypoints from './components/OpenposeKeypoints';
import BlazeposeKeypoints from './components/BlazeposeKeypoints';
import LoadTestVideoData from './loadtestvideodata';
import Image from 'next/image';
import ExpressionBarGraph from './components/ExpressionGraphPlot';
import ExpressionsPlot from './components/ExpressionsPlot';

const ISL = () => {
    const [keypointModel, setKeypointModel] = useState('Openpose');

    const handleKeypointModelChange = (newModel: React.ChangeEvent<HTMLSelectElement>) => {
    setKeypointModel(newModel.target.value);
    };
    
  return (
    <div>
        <Mymenu />
        <Header title="Project - Indian Sign Language Translation" subtitle="" ></Header>
        <div className='relative flex min-h-screen flex-col justify-center sm:py-12'>
        <div>
        <div className="relative px-6 pt-10 pb-8 ring-gray-900/5 sm:mx-auto sm:max-w-6xl sm:rounded-lg sm:px-10">
          <div className="mx-auto">
            <div><h3 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl'>Problem statement</h3></div>
            <div><p className='mb-4 text-sm leading-none tracking-tight text-gray-900 md:text-sm lg:text-lg'>Indian Sign Language is one of the most important and widely used forms of communication for people with speaking and hearing impairments. Many people or communities have attempted to
  create systems that read the sign language symbols and convert the same to text, but most of them
  target either American Sign Language or British Sign Language.  Our project would target
  implementing the language translation feature for Indian Sign Language(ISL).</p></div>
          </div>
        </div>
        <div className="relative px-6 pt-10 pb-8 ring-gray-900/5 sm:mx-auto sm:max-w-6xl sm:rounded-lg sm:px-10">
          <div className="mx-auto">
            <div><h3 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl'>Approach</h3></div>
            <div className='relative flex justify-center m-4'><Image src="/projects/ISL-block_diagram.png" alt="ISL-block-diagram" width={700} height={700} /> </div>
          </div>
        </div>
        <div className="relative px-6 pt-4 pb-8 ring-gray-900/5 sm:mx-auto sm:max-w-6xl sm:rounded-lg sm:px-10">
            <div><h3 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl'>Selecting the position model</h3></div>
            <div className='relative flex justify-center m-4'><TopControls onKeypointModelChange={handleKeypointModelChange}/>
            </div>
        </div>
        
          <div className="relative max-w-8xl px-6 pb-8 sm:max-w-8xl">
        {keypointModel ==='Openpose' ? (
              <OpenposeKeypoints />
            ) : (
              <BlazeposeKeypoints />
            )}
            </div>
            <div className='relative flex justify-center m-4 px-6 pt-4 pb-8 ring-gray-900/5 sm:mx-auto sm:max-w-6xl sm:rounded-lg sm:px-10'>
            <div className='m-4 grid grid-cols-1 gap-4'>
            <select className="select ">
  <option disabled>Select Dataset</option>
  <option>INCLUDE</option>
  
</select></div></div>
<div className='relative flex flex-col justify-center m-4 px-6 pt-4 pb-8 ring-gray-900/5 sm:mx-auto sm:max-w-6xl sm:rounded-lg sm:px-10'>
  <h3 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl'>INCLUDE: A Large Scale Dataset for Indian Sign Language Recognition</h3>
  <p className='mb-4 text-sm leading-none tracking-tight text-gray-900 md:text-sm lg:text-lg'>Dataset Details: The INCLUDE dataset has 4292 videos (the paper mentions 4287 videos but 5 videos were added later). The videos used for training are mentioned in train.csv (3475), while that used for testing is mentioned in test.csv (817 files). Each video is a recording of 1 ISL sign, signed by deaf students from St. Louis School for the Deaf, Adyar, Chennai.
INCLUDE50 has 766 train videos and 192 test videos.Each video is labeled with the corresponding ISL sign. The dataset is divided into training and testing sets.  The dataset is available for download at [link to dataset].
</p>
<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-900'>
  <thead className='text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-900'>
    <tr>
      <th scope='col' className='px-6 py-3'>Charasteristics</th>
      <th scope='col' className='px-6 py-3'>INCLUDE-DATASET</th>
    </tr>
  </thead>
  <tbody>
    <tr className='odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-gray-200 border-b dark:border-gray-700'>
      <td className='px-6 py-4'>Categories</td>
      <td className='px-6 py-4'>15</td>
    </tr>
    <tr className='odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-gray-200 border-b dark:border-gray-700'>
      <td className='px-6 py-4'>Words</td>
      <td className='px-6 py-4'>263</td>
    </tr>
    <tr className='odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-gray-200 border-b dark:border-gray-700'>
      <td className='px-6 py-4'>Videos</td>
      <td className='px-6 py-4'>4287</td>
    </tr>
    <tr className='odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-gray-200 border-b dark:border-gray-700'>
      <td className='px-6 py-4'>Avg Videos per class</td>
      <td className='px-6 py-4'>16.3</td>
    </tr>
    <tr className='odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-gray-200 border-b dark:border-gray-700'>
      <td className='px-6 py-4'>Avg Video Length</td>
      <td className='px-6 py-4'>2.57s</td>
    </tr>
    <tr className='odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-gray-200 border-b dark:border-gray-700'>
      <td className='px-6 py-4'>Min Video Length</td>
      <td className='px-6 py-4'>1.28s</td>
    </tr>
    <tr className='odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-gray-200 border-b dark:border-gray-700'>
      <td className='px-6 py-4'>Max Video Length</td>
      <td className='px-6 py-4'>6.16s</td>
    </tr>
    <tr className='odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-gray-200 border-b dark:border-gray-700'>
      <td className='px-6 py-4'>Frame Rate</td>
      <td className='px-6 py-4'>25fps</td>
    </tr>
    <tr className='odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-gray-200 border-b dark:border-gray-700'>
      <td className='px-6 py-4'>Resolution</td>
      <td className='px-6 py-4'>1920x1080</td>
    </tr>
  </tbody>
</table>
</div>
<div className='relative flex justify-center m-4 px-6 pt-4 pb-8 ring-gray-900'>
  <ExpressionsPlot />
  </div> 
  <div className='relative flex justify-center m-4 px-6 pt-4 pb-8 ring-gray-900'>
<LoadTestVideoData />
</div>
        </div>
      </div>


        {/* <div className="metrics">
        <div className="output-stats ui-percTrainData">
          <span>Test loss</span>
          <div className="value" id="loss-test"></div>
        </div>
        <div className="output-stats train">
          <span>Training loss</span>
          <div className="value" id="loss-train"></div>
        </div>
        <div id="linechart"></div>
        
      </div> */}
      
      
    </div>
  )
}

export default ISL
