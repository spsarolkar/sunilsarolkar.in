"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../../header";
import OpenposeKeypoints from "./components/OpenposeKeypoints";
import BlazeposeKeypoints from "./components/BlazeposeKeypoints";
import LoadTestVideoData from "./loadtestvideodata";
import ExpressionsPlot from "./components/ExpressionsPlot";
import AnimatedSignLanguagePipeline from "./components/SignLanguageTranslationDiagram";
const datasetDetails = [
    ["Categories", "15"], ["Words", "263"], ["Videos", "4292"],
    ["Avg videos per class", "16.3"], ["Avg video length", "2.57s"],
    ["Min video length", "1.28s"], ["Max video length", "6.16s"],
    ["Frame rate", "25 fps"], ["Resolution", "1920×1080"],
];
export default function ISL() {
    const [keypointModel, setKeypointModel] = useState("Openpose");
    return (<article className="wrap lab-page demo-page">
      <Link href="/projects" className="back-link">← All projects</Link>
      <Header eyebrow="Earlier web experiment / Computer vision" title="From movement to meaning." subtitle="An exploration of Indian Sign Language through video, pose estimation, and sequence models. This page documents the earlier OpenPose-based web demo."/>
      <aside className="note-panel">The project now also explores on-device learning with Swift, Vision and MLX. <a className="underline" href="https://github.com/spsarolkar/SignLanguageTranslate" target="_blank" rel="noopener noreferrer">Explore the current iPad project ↗</a></aside>
      <nav className="section-nav" aria-label="On this page">
        <a href="#problem">The question</a><a href="#approach">Pipeline</a><a href="#model">Keypoints</a><a href="#dataset">Dataset</a><a href="#visuals">Visualisations</a><a href="#videos">Video preview</a>
      </nav>

      <section id="problem" className="content-section">
        <h2>The question</h2>
        <p className="prose-copy">Indian Sign Language (ISL) is a crucial mode of communication for people with speaking and hearing impairments. Unlike American or British Sign Language, ISL has limited technological support. This project explores how computer vision and sequence models might help bridge that gap.</p>
      </section>
      <section id="approach" className="content-section">
        <h2>A look inside the pipeline</h2>
        <p className="prose-copy mb-6">From video frames to landmarks, features, and classification. This is an illustrative animation: the displayed class probabilities are simulated, not model predictions.</p>
        <div className="demo-scroll" tabIndex={0} role="region" aria-label="Illustrative sign-language pipeline, scroll horizontally on small screens"><AnimatedSignLanguagePipeline /></div>
      </section>
      <section id="model" className="content-section">
        <h2>Making movement visible</h2>
        <div className="max-w-xs mb-6"><label className="demo-label" htmlFor="keypoint-model">Keypoint model</label><select id="keypoint-model" value={keypointModel} onChange={(event) => setKeypointModel(event.target.value)}><option value="Openpose">OpenPose</option><option value="Blazepose">BlazePose</option></select></div>
        <div className="demo-surface demo-scroll">{keypointModel === "Openpose" ? <OpenposeKeypoints /> : <BlazeposeKeypoints />}</div>
      </section>
      <section id="dataset" className="content-section">
        <h2>The INCLUDE dataset</h2>
        <p className="prose-copy">The earlier demo uses INCLUDE videos of ISL signs recorded by deaf students from St. Louis School for the Deaf, Adyar, Chennai. These are the dataset characteristics documented for that demo.</p>
        <div className="demo-scroll"><table className="demo-table"><caption className="sr-only">Dataset characteristics documented in the original demo</caption><thead><tr><th scope="col">Characteristic</th><th scope="col">Details</th></tr></thead><tbody>{datasetDetails.map(([name, value]) => <tr key={name}><td>{name}</td><td>{value}</td></tr>)}</tbody></table></div>
      </section>
      <section id="visuals" className="content-section"><h2>Exploring the data</h2><div className="demo-scroll"><ExpressionsPlot /></div></section>
      <section id="videos" className="content-section"><h2>Video & frame preview</h2><p className="prose-copy mb-6">Choose a category and expression to inspect a clip and its extracted frames.</p><LoadTestVideoData /></section>
    </article>);
}
