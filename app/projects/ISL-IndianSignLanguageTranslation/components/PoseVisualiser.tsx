"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

// Define a type for each keypoint coordinate.
type PoseDataPoint = { x: number; y: number };

// Define keypoints for OpenPose. You could add another interface for BlazePose if needed.
export interface PoseKeypoints {
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

// Component for drawing a line between two keypoints.
const PoseEdge: React.FC<{
  start: PoseDataPoint;
  end: PoseDataPoint;
  scaleX: (x: number) => number;
  scaleY: (y: number) => number;
}> = ({ start, end, scaleX, scaleY }) => {
  return (
    <line
      x1={scaleX(start.x)}
      y1={scaleY(start.y)}
      x2={scaleX(end.x)}
      y2={scaleY(end.y)}
      stroke="#00BFFF"
      strokeWidth={3}
      strokeLinecap="round"
    />
  );
};

// Component for drawing a keypoint (circle).
const PoseKeypoint: React.FC<{
  point: PoseDataPoint;
  scaleX: (x: number) => number;
  scaleY: (y: number) => number;
}> = ({ point, scaleX, scaleY }) => {
  return (
    <circle
      cx={scaleX(point.x)}
      cy={scaleY(point.y)}
      r={6}
      fill="red"
      stroke="#fff"
      strokeWidth={2}
    />
  );
};

// Component for rendering a label with a dynamic background.
// It measures the text element to adjust the offset so the label is centered.
interface PoseLabelProps {
  x: number;
  y: number;
  text: string;
  defaultOffset?: { dx: number; dy: number };
}

const PoseLabel: React.FC<PoseLabelProps> = ({
  x,
  y,
  text,
  defaultOffset = { dx: 10, dy: -10 },
}) => {
  const textRef = useRef<SVGTextElement>(null);
  const [offset, setOffset] = useState(defaultOffset);

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      // Adjust offset to center the text relative to the keypoint
      setOffset({
        dx: defaultOffset.dx - bbox.width / 2,
        dy: defaultOffset.dy - bbox.height / 2,
      });
    }
  }, [text, defaultOffset]);

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={offset.dx - 5}
        y={offset.dy+20}
        width={textRef.current ? textRef.current.getBBox().width + 10 : 0}
        height={textRef.current ? textRef.current.getBBox().height + 10 : 0}
        fill="rgba(0, 0, 0, 0.7)"
        rx={4}
      />
      <text
        ref={textRef}
        x={offset.dx}
        y={offset.dy+35}
        fill="white"
        fontSize="12px"
        fontFamily="Arial"
      >
        {text}
      </text>
    </g>
  );
};

// Main visualization component that puts everything together.
const PoseVisualization: React.FC<PoseKeypoints> = (poseData) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 500;
  const height = 500;

  // Scale functions to convert normalized coordinates to pixel values.
  const scaleX = (x: number) => x * width;
  const scaleY = (y: number) => y * height;

  // Define the skeleton connections for OpenPose.
  const edges: [keyof PoseKeypoints, keyof PoseKeypoints][] = [
    ["nose", "leftEye"],
    ["nose", "rightEye"],
    ["leftEye", "leftEar"],
    ["rightEye", "rightEar"],
    ["nose", "neck"],
    ["neck", "leftShoulder"],
    ["neck", "rightShoulder"],
    ["leftShoulder", "leftElbow"],
    ["leftElbow", "leftWrist"],
    ["rightShoulder", "rightElbow"],
    ["rightElbow", "rightWrist"],
    ["neck", "leftHip"],
    ["neck", "rightHip"],
    ["leftHip", "leftKnee"],
    ["rightHip", "rightKnee"],
    ["leftKnee", "leftAnkle"],
    ["rightKnee", "rightAnkle"],
  ];

  // Adjusted label offsets to spread out face labels.
  const labelOffsets: Record<string, { dx: number; dy: number }> = {
    nose: { dx: 0, dy: -15 },
    leftEye: { dx: -30, dy: -40 },  // further left and up
    rightEye: { dx: 30, dy: -40 },  // further right and up
    leftEar: { dx: -60, dy: -10 },  // further left
    rightEar: { dx: 60, dy: -10 },  // further right
    leftShoulder:{dx: -20, dy: -10},
    rightShoulder:{dx: +20, dy: -10},
    neck:{dx: 0, dy: 0}
  };

  // Convert poseData into an array of [key, point] pairs.
  const points = Object.entries(poseData) as [keyof PoseKeypoints, PoseDataPoint][];

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        style={{ maxWidth: "100%", height: "auto" }}
      >
        {/* Render edges */}
        {edges.map(([startKey, endKey]) => (
          <PoseEdge
            key={`${startKey}-${endKey}`}
            start={poseData[startKey]}
            end={poseData[endKey]}
            scaleX={scaleX}
            scaleY={scaleY}
          />
        ))}

        {/* Render keypoints */}
        {points.map(([key, point]) => (
          <PoseKeypoint key={key} point={point} scaleX={scaleX} scaleY={scaleY} />
        ))}

        {/* Render labels */}
        {points.map(([key, point]) => (
          <PoseLabel
            key={`label-${key}`}
            x={scaleX(point.x)}
            y={scaleY(point.y)}
            text={key}
            defaultOffset={labelOffsets[key] || { dx: 10, dy: -10 }}
          />
        ))}
      </svg>
    </div>
  );
};

export default PoseVisualization;
