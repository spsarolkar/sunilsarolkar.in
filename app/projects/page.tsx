"use client";
import React, { useState } from 'react'
import GeneratingJunits from './GeneratingJunits'
import SignLanguageTranslation from './SignLanguageTranslation'
import ApplyingTransformer from './ApplyingTransformer'
import Link from "next/link";
import Header from "../header";
import Mymenu from "../mymenu";
import TopControls from './components/TopControls';
import PoseVisualization from './components/PoseVisualiser';
import sampleOpenPoseData from './components/SamplePoseData';
import OpenposeKeypoints from './components/OpenposeKeypoints';
import BlazeposeKeypoints from './components/BlazeposeKeypoints';

const Index = () => {
  const [keypointModel, setKeypointModel] = useState('Openpose');

  const handleKeypointModelChange = (newModel: React.ChangeEvent<HTMLSelectElement>) => {
    setKeypointModel(newModel.target.value);
  };
  return (
    <div>
        <Mymenu />
        <Header title="Project - Indian Sign Language Translation" subtitle="" ></Header>
        <TopControls onKeypointModelChange={handleKeypointModelChange}/>
        {keypointModel ==='Openpose' ? (
          <OpenposeKeypoints />
        ) : (
          <BlazeposeKeypoints />
        )}
        <div className="metrics">
        <div className="output-stats ui-percTrainData">
          <span>Test loss</span>
          <div className="value" id="loss-test"></div>
        </div>
        <div className="output-stats train">
          <span>Training loss</span>
          <div className="value" id="loss-train"></div>
        </div>
        <div id="linechart"></div>
      </div>
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
    </div>
  )
}

export default Index

