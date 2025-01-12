"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3'; // Import the standard D3 library



type PoseDataPoint = { x: number; y: number };

interface OpenPoseVisualizationProps {
    nose: PoseDataPoint;
    neck: PoseDataPoint;
    rightShoulder: PoseDataPoint;
    rightElbow: PoseDataPoint;
    rightWrist: PoseDataPoint;
    leftShoulder: PoseDataPoint;
    leftElbow: PoseDataPoint;
    leftWrist: PoseDataPoint;
    rightHip: PoseDataPoint;
    rightKnee: PoseDataPoint;
    rightAnkle: PoseDataPoint;
    leftHip: PoseDataPoint;
    leftKnee: PoseDataPoint;
    leftAnkle: PoseDataPoint;
    rightEye: PoseDataPoint;
    leftEye: PoseDataPoint;
    rightEar: PoseDataPoint;
    leftEar: PoseDataPoint;
}

// :React.FC<PoseVisualizationProps>   = ({ nose, leftEye,rightEye,leftShoulder,rightShoulder,leftElbow,rightElbow,leftWrist,rightWrist,leftHip,rightHip,leftKnee,rightKnee,leftAnkle,rightAnkle}) => {
  const PoseVisualization = (samplePoseData: OpenPoseVisualizationProps) => {
    const [showBubble, setShowBubble] = useState<string[]>([]);
    const svgRef = useRef<SVGSVGElement>(null);  // Use a ref for the SVG element
    const [poseData, setPoseData] = useState(samplePoseData);
  
    useEffect(() => {
      if (!poseData || !svgRef.current) return;
  
      const svg = d3.select(svgRef.current)
        .attr("width", 500)
        .attr("height", 500);
        const circlesData = Object.entries(poseData);

        circlesData.forEach(([key, value]) => {
          svg.append("circle")
            .attr("cx", value.x * 500)
            .attr("cy", value.y * 500)
            .attr("r", 5)
            .attr("fill", "red")
            .attr("id", `${key}Circle`).append("title")  // Use 'title' element for tooltip
            .text(key + ": " + JSON.stringify(value));

          // Add a label with a transparent black background
          svg.append("rect")
            .attr("x", (key!=='leftEye'&& key!=='rightEye')?value.x>=0.5?(value.x * 500 + key.length):(value.x * 500 - key.length *9):value.x>=0.5?(value.x * 500 + key.length):(value.x * 500 - key.length *9)) // Adjust position as needed
            .attr("y", (key!=='leftEye'&& key!=='rightEye')?value.y * 500:value.y * 500 - 20) // Adjust position as needed
            .attr("width", key.length * 8) // Adjust size as needed
            .attr("height", 20) // Adjust size as needed
            .attr("fill", "rgba(0, 0, 0, 0.5)"); // Transparent black fill

          svg.append("text")
            .attr("x", value.x>=0.5?(value.x * 500+key.length *5):(value.x * 500 - key.length *5))
            .attr("y", (key!=='leftEye'&& key!=='rightEye')?value.y * 500 + 15:value.y * 500-5)
            .attr("text-anchor", "middle").attr("fill", "white")
            .text(key);
        });    
      const circles = svg.selectAll("circle")
      .on("mouseover", function(event:any,d:any){
        const circleId = d3.select(this).attr("id");
        const id = circleId.split("Circle")[0];
        setShowBubble([...showBubble,id]);
        d3.select(this).transition()
        .duration(100)
        .attr("r", 10)
      });
      
      circles.on("mouseout", function(event:any,d:any){
        const circleId = d3.select(this).attr("id");
        const id = circleId.split("Circle")[0];
        setShowBubble(showBubble.filter(item => item !== id));
        d3.select(this).transition()
        .duration(300)
        .attr("r", 5);
      })

      // svg.selectAll("circle")
      // .filter(function(d,i){
      //   return showBubble.includes(d3.select(this).attr("id").split("Circle")[0])
      // })
      // .attr("r",10);



        const edges = [
          ["nose", "leftEye"], ["nose", "rightEye"],["leftEye", "leftEar"], ["rightEye", "rightEar"],
          ["neck", "leftShoulder"], ["neck", "rightShoulder"],["nose", "neck"],
           ["leftShoulder", "leftElbow"],
          ["rightShoulder", "rightElbow"], ["leftElbow", "leftWrist"],
          ["rightElbow", "rightWrist"], ["neck", "leftHip"],
          ["neck", "rightHip"], 
          ["leftHip", "leftKnee"], ["rightHip", "rightKnee"],
          ["leftKnee", "leftAnkle"], ["rightKnee", "rightAnkle"]
      ];
  
      edges.forEach(([startJoint, endJoint]) => {
          svg.append("line")
              .attr("x1", poseData[startJoint as keyof OpenPoseVisualizationProps].x * 500)
              .attr("y1", poseData[startJoint as keyof OpenPoseVisualizationProps].y * 500)
              .attr("x2", poseData[endJoint as keyof OpenPoseVisualizationProps].x * 500)
              .attr("y2", poseData[endJoint as keyof OpenPoseVisualizationProps].y * 500)
              .attr("stroke", "black")  // Set line color
              .attr("stroke-width", 2);   // Set line width
      });


        // ... Your D3 code to draw the visualization using the standard d3 API ...
        // Example:
        // svg.append("circle")
        //     .attr("cx", poseData.nose.x * 500)  // Scale coordinates to SVG size
        //     .attr("cy", poseData.nose.y * 500)
        //     .attr("r", 5)
        //     .attr("fill", "red");
  
        // ... (Rest of the D3 code to draw other body parts)
  
  
    }, [poseData]);
  
    return (
      <svg ref={svgRef}></svg>
    );
  };
  
  export default PoseVisualization;
