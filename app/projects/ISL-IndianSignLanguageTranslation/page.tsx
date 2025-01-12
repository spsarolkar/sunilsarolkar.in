"use client";
import React, { useState } from 'react'
import Header from "../../header";
import Mymenu from "../../mymenu";
import TopControls from './components/TopControls';
import PoseVisualization from './components/PoseVisualiser';
import sampleOpenPoseData from './components/SamplePoseData';
import OpenposeKeypoints from './components/OpenposeKeypoints';
import BlazeposeKeypoints from './components/BlazeposeKeypoints';

const ISL = () => {
    const [keypointModel, setKeypointModel] = useState('Openpose');

    const handleKeypointModelChange = (newModel: React.ChangeEvent<HTMLSelectElement>) => {
    setKeypointModel(newModel.target.value);
    };
    
  return (
    <div>
        <Mymenu />
        <Header title="Project - Indian Sign Language Translation" subtitle="" ></Header>
        <div className='flex flex-wrap justify-center h-[80vh]'>
        <div className=''>
        <div className=''>
          <div><h3 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl'>Problem statement</h3></div>
          <div className='mx-500'><p>Indian Sign Language is one of the most important and widely used forms of communication for
people with speaking and hearing impairments. Many people or communities have attempted to
create systems that read the sign language symbols and convert the same to text, but most of them
target either American Sign Language or British Sign Language. Our project would target
implementing the language translation feature for Indian Sign Language(ISL).</p></div>
          </div>
    </div>
          <div className='justify-center m-4'>
        <TopControls onKeypointModelChange={handleKeypointModelChange}/>
        {keypointModel ==='Openpose' ? (
          <OpenposeKeypoints />
        ) : (
          <BlazeposeKeypoints />
        )}
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
      <div id="heatmap"></div>
      <div style={{ float: 'left', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="label" style={{ width: '105px', marginRight: '10px' }}>
            Colors shows data, neuron and weight values.
          </div>
          <svg width="150" height="30" id="colormap">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59322" stopOpacity="1"></stop>
                <stop offset="50%" stopColor="#e8eaeb" stopOpacity="1"></stop>
                <stop offset="100%" stopColor="#0877bd" stopOpacity="1"></stop>
              </linearGradient>
            </defs>
            <g className="core" transform="translate(3, 0)">
              <rect width="144" height="10" style={{ fill: 'url(#gradient)' }}></rect>
            </g>
          </svg>
        </div>
        <br />
        <div style={{ display: 'flex' }}>
          <label className="ui-showTestData mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="show-test-data">
            <input type="checkbox" id="show-test-data" className="mdl-checkbox__input" defaultChecked />
            <span className="mdl-checkbox__label label">Show test data</span>
          </label>
          <label className="ui-discretize mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="discretize">
            <input type="checkbox" id="discretize" className="mdl-checkbox__input" defaultChecked />
            <span className="mdl-checkbox__label label">Discretize output</span>
          </label>
        </div>
      </div>
      <div className="more">
        <button className="mdl-button mdl-js-button mdl-button--fab">
          {/* Add button content here */}
        </button>
      </div>
    </div></div>
  )
}

export default ISL
