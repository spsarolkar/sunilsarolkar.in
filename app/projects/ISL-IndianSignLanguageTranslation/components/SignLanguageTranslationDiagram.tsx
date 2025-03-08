"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

// ------------------------
// Data Interfaces
// ------------------------
interface ISLTestData {
  [category: string]: {
    [expression: string]: string[];
  };
}

interface FrameData {
  rawUrl: string;
  pose?: any;
}

// ------------------------
// Helper: Random Choice
// ------------------------
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ------------------------
// CanvasFrame Component
// ------------------------
interface CanvasFrameProps {
  frameUrl: string;
  pose?: any;
  drawMarkers?: boolean;
  width?: number;
  height?: number;
}

const CanvasFrame: React.FC<CanvasFrameProps> = ({
  frameUrl,
  pose,
  drawMarkers = false,
  width,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Use provided width/height or fallback to image natural dimensions.
      const targetWidth = width || img.width;
      const targetHeight = height || img.height;
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      // Calculate scale factors.
      const scaleX = targetWidth / img.width;
      const scaleY = targetHeight / img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      if (drawMarkers && pose) {
        const colors = [
          [255, 0, 0],
          [255, 85, 0],
          [255, 170, 0],
          [255, 255, 0],
          [170, 255, 0],
          [85, 255, 0],
          [0, 255, 0],
          [0, 255, 85],
          [0, 255, 170],
          [0, 255, 255],
          [0, 170, 255],
          [0, 85, 255],
          [0, 0, 255],
          [85, 0, 255],
          [170, 0, 255],
          [255, 0, 255],
          [255, 0, 170],
          [255, 0, 85],
          [255, 255, 0],
          [255, 255, 85],
          [255, 255, 170],
          [255, 255, 255],
          [170, 255, 255],
          [85, 255, 255],
          [0, 255, 255],
        ];
        const toRGB = (c: number[]) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`;

        // Draw body pose sticks (keeping the same proportions).
        if (pose.bodypose_sticks) {
          const stickWidth = 4; // You might also reduce this if needed.
          pose.bodypose_sticks.forEach((stick: number[], idx: number) => {
            const [mX, mY, angle, length] = stick;
            const radians = (angle * Math.PI) / 180;
            ctx.save();
            // Scale the marker position.
            ctx.translate(mX * scaleX, mY * scaleY);
            ctx.rotate(radians);
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = toRGB(colors[idx % colors.length]);
            ctx.beginPath();
            // Scale the stick length as well.
            ctx.ellipse(0, 0, (length / 2) * scaleX, stickWidth * scaleY, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
          });
        }
        // Draw smaller body pose circles (keypoints) – radius reduced from 4 to 2.
        if (pose.bodypose_circles) {
          ctx.font = "10px Arial";
          pose.bodypose_circles.forEach((circle: number[], idx: number) => {
            let [x, y] = circle;
            x *= scaleX;
            y *= scaleY;
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, 2 * Math.PI); // Reduced radius
            ctx.fillStyle = toRGB(colors[idx % colors.length]);
            ctx.fill();
          });
        }
        // Draw hand pose edges.
        if (pose.handpose_edges) {
          const totalEdges = 20;
          pose.handpose_edges.forEach((handEdges: any[]) => {
            handEdges.forEach((edge: any) => {
              let [ie, x1, y1, x2, y2] = edge;
              x1 *= scaleX; y1 *= scaleY;
              x2 *= scaleX; y2 *= scaleY;
              const hue = (ie / totalEdges) * 360;
              ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            });
          });
        }
        // Draw hand pose peaks with reduced radius (from 3 to 2).
        if (pose.handpose_peaks) {
          ctx.font = "10px Arial";
          pose.handpose_peaks.forEach((handPeaks: any[]) => {
            handPeaks.forEach((peak: any) => {
              let [x, y] = peak;
              x *= scaleX; y *= scaleY;
              ctx.beginPath();
              ctx.arc(x, y, 0.5, 0, 2 * Math.PI); // Reduced radius
              ctx.fillStyle = "red";
              ctx.fill();
            });
          });
        }
      }
    };
    img.src = frameUrl;
  }, [frameUrl, pose, drawMarkers, width, height]);

  return <canvas ref={canvasRef} style={{ borderRadius: "6px" }} />;
};


// ------------------------
// Pipeline Block Components
// ------------------------
const DiagramBox: React.FC<{
  label: string;
  delay: number;
  variant?: "model" | "softmax" | "default";
  children?: React.ReactNode;
}> = ({ label, delay, variant = "default", children }) => {
  let boxStyle = styles.diagramBox;
  if (variant === "model") boxStyle = { ...boxStyle, ...styles.modelBox };
  if (variant === "softmax") boxStyle = { ...boxStyle, ...styles.softmaxBox };

  return (
    <div style={{ ...boxStyle, animationDelay: `${delay}ms` }} className="slide-in">
      <p style={styles.boxText}>{label}</p>
      {children && <div style={styles.boxContent}>{children}</div>}
    </div>
  );
};

const Arrow: React.FC<{ delay: number }> = ({ delay }) => (
  <div style={{ ...arrowStyles.container, animationDelay: `${delay}ms` }} className="slide-in">
    <div style={arrowStyles.line}></div>
    <div style={arrowStyles.head}></div>
  </div>
);

// ------------------------
// Neural Model & Softmax Components
// ------------------------
const NeuralModelBlock: React.FC = () => {
  return (
    <div style={styles.neuralBlockContainer}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} style={{ ...styles.neuron, animationDelay: `${idx * 100}ms` }} className="pulse" />
      ))}
    </div>
  );
};

const SoftmaxSwitch: React.FC<{
  onPredict: (predicted: string) => void;
}> = ({ onPredict }) => {
  const classes = ["Hello", "Thanks", "Yes", "No", "Please"];
  const [probs, setProbs] = useState<number[]>([]);

  const generateProbs = useCallback((): number[] => {
    const raw = classes.map(() => Math.random());
    const sum = raw.reduce((a, b) => a + b, 0);
    return raw.map((val) => val / sum);
  }, [classes]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newProbs = generateProbs();
      setProbs(newProbs);
      const maxIdx = newProbs.indexOf(Math.max(...newProbs));
      onPredict(classes[maxIdx]);
    }, 1000);
    return () => clearInterval(interval);
  }, [generateProbs, classes, onPredict]);

  return (
    <div style={styles.softmaxContainer}>
      {probs.length > 0 &&
        probs.map((p, idx) => (
          <div key={idx} style={styles.probRow}>
            <span style={styles.probLabel}>{classes[idx]}:</span>
            <span style={styles.probValue}>{(p * 100).toFixed(1)}%</span>
          </div>
        ))}
    </div>
  );
};

const OutputTranslation: React.FC<{ prediction: string }> = ({ prediction }) => {
  return (
    <div style={styles.outputContainer}>
      <p style={styles.outputText}>{prediction}</p>
    </div>
  );
};

// ------------------------
// TripleFrameCarousel Component
// ------------------------
interface TripleFrameCarouselProps {
  frames: FrameData[];
  frameWidth: number;
  frameHeight: number;
  interval?: number;
  drawMarkers?: boolean;
}

const TripleFrameCarousel: React.FC<TripleFrameCarouselProps> = ({
  frames,
  frameWidth,
  frameHeight,
  interval = 1500,
  drawMarkers = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate first 2 frames for smooth wrap-around if more than 3.
  const extendedFrames = frames.length > 3 ? [...frames, frames[0], frames[1]] : frames;
  const total = extendedFrames.length;

  useEffect(() => {
    if (frames.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, interval);
    return () => clearInterval(timer);
  }, [frames, interval]);

  useEffect(() => {
    if (currentIndex >= frames.length) {
      const timeout = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
          setCurrentIndex(0);
          void containerRef.current.offsetWidth;
          containerRef.current.style.transition = "transform 0.5s ease-in-out";
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, frames.length]);

  return (
    <div style={{ overflow: "hidden", width: frameWidth * 3, height: frameHeight, margin: "0 auto", border: "1px solid #ddd", borderRadius: "6px" }}>
      <div
        ref={containerRef}
        style={{
          display: "flex",
          width: `${extendedFrames.length * frameWidth}px`,
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentIndex * frameWidth}px)`,
        }}
      >
        {extendedFrames.map((frame, idx) => (
          <div key={idx} style={{ width: frameWidth, height: frameHeight, flexShrink: 0 }}>
            <CanvasFrame frameUrl={frame.rawUrl} pose={frame.pose} drawMarkers={drawMarkers} width={frameWidth} height={frameHeight} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ------------------------
// Main Component: AnimatedSignLanguagePipeline
// ------------------------
const AnimatedSignLanguagePipeline: React.FC = () => {
  const [testData, setTestData] = useState<ISLTestData>({});
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [frames, setFrames] = useState<FrameData[]>([]);
  const [poseData, setPoseData] = useState<any[]>([]);
  const [predictedExpression, setPredictedExpression] = useState<string>("");

  const [randomFileName, setRandomFileName] = useState<string>("");
  const [randomCategory, setRandomCategory] = useState<string>("");
  const [randomExpression, setRandomExpression] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement>(null);

  // ------------------------
  // Fetch test data, randomly select file, get video URL, and load CSV pose data.
  // ------------------------
  useEffect(() => {
    const fetchAll = async () => {
      try {
        // const res = await fetch("/api/listCategories", { method: "GET" });
        // if (!res.ok) throw new Error("Failed to fetch categories");
        // const data = await res.json();
        // const islTestData = data as ISLTestData;
        // setTestData(islTestData);

        // const categories = Object.keys(islTestData);
        // const randomCat = randomChoice(categories);
        // setRandomCategory(randomCat);
        // const expressions = Object.keys(islTestData[randomCat]);
        // const randomExpr = randomChoice(expressions);
        // setRandomExpression(randomExpr);
        // const files = islTestData[randomCat][randomExpr];
        // const randomFile = randomChoice(files);
        // setRandomFileName(randomFile);
        // const res2 = await fetch("/api/getVideoUrl", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     category: randomCat,
        //     expression: randomExpr,
        //     filename: randomFile,
        //   }),
        // });
        // if (!res2.ok) throw new Error("Failed to fetch video URL");
        // const data2 = await res2.json();
        // setVideoUrl("/projects/ISL/MVI_9590.MOV");

        // const res3 = await fetch("/api/getTestData");
        // if (!res3.ok) throw new Error("Failed to fetch test data");
        // const data3 = await res3.json();
        // const csvUrl = (data3 as { url: string }).url;
        const csvData = await d3.csv("/projects/ISL/testing_demo.csv");
        setPoseData(csvData);
        console.log("csvData", csvData);
        // console.log("poseData", poseData);
        
        // extractFrames();
      } catch (err) {
        console.error("Error in fetchAll:", err);
      }
    };

    fetchAll();
  }, []);

  // ------------------------
  // When videoUrl and poseData are available, start extracting frames.
  // ------------------------
  useEffect(() => {
    if (poseData && poseData.length > 0) {
      extractFrames();
    }
  }, [poseData]);

  // ------------------------
  // Extract frames asynchronously and update state as each frame loads.
  // ------------------------
  const extractFrames = async () => {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1920;
    canvas.height = 1080;

    // Instead of building an array first, update the state incrementally.
    const currentPoseData = poseData;//.filter((row) => row.Type === randomCategory && row.Expression === randomExpression && row.FileName === randomFileName);
    // console.log("currentPoseData", currentPoseData);
    for (let i = 1; i < 33; i++) {
      const poseRow = currentPoseData.find((row) => parseInt(row.Frame) === i);
      // console.log("poseData", poseData);
      let poseObj = undefined;
      if (poseRow) {
        try {
          const bodyposeCircles = JSON.parse(
            poseRow.bodypose_circles.replace(/array/g, "").replace(/\(/g, "[").replace(/\)/g, "]")
          );
          const bodyposeSticks = JSON.parse(
            poseRow.bodypose_sticks.replace(/array/g, "").replace(/\(/g, "[").replace(/\)/g, "]")
          );
          const handposeEdges = JSON.parse(
            poseRow.handpose_edges.replace(/array/g, "").replace(/\(/g, "[").replace(/\)/g, "]")
          );
          const handposePeaks = JSON.parse(
            poseRow.handpose_peaks.replace(/array/g, "").replace(/\(/g, "[").replace(/\)/g, "]").replace(/'/g, '"')
          );
          poseObj = {
            bodypose_circles: bodyposeCircles,
            bodypose_sticks: bodyposeSticks,
            handpose_edges: handposeEdges,
            handpose_peaks: handposePeaks,
          };
        } catch (err) {
          console.error("Error parsing pose data:", err);
        }
      }
      // console.log("poseObj", poseObj);
      // Update state incrementally: add the new frame to the frames array.
      const rawUrl = `/projects/ISL/demo-video/without-markers/${i}.png`;
      setFrames((prevFrames) => [...prevFrames, { rawUrl, pose: poseObj }]);
    }
  };


  return (
    <div style={styles.pageWrapper}>
      {/* PIPELINE DIAGRAM */}
      <div style={styles.diagramContainer}>
        <DiagramBox label="Sign Language Video Dataset" delay={0} />
        <Arrow delay={100} />
        <DiagramBox label="OpenPose Extraction" delay={200}>
          <TripleFrameCarousel frames={frames} frameWidth={120} frameHeight={80} interval={1500} drawMarkers={false} />
        </DiagramBox>
        <Arrow delay={300} />
        <DiagramBox label="Generated Stick Models (Feature Extraction)" delay={400}>
          <TripleFrameCarousel frames={frames} frameWidth={120} frameHeight={80} interval={1500} drawMarkers={true} />
        </DiagramBox>
        <Arrow delay={500} />
        <DiagramBox label="Our Model / Neural Network (LSTM / Transformer)" delay={600} variant="model">
          <NeuralModelBlock />
        </DiagramBox>
        <Arrow delay={700} />
        <DiagramBox label="Softmax Classification Layer" delay={800} variant="softmax">
          <SoftmaxSwitch onPredict={(pred) => setPredictedExpression(pred)} />
        </DiagramBox>
        <Arrow delay={900} />
        <DiagramBox label="Output / Translation" delay={1000}>
          <OutputTranslation prediction={predictedExpression} />
        </DiagramBox>
      </div>
    </div>
  );
};

export default AnimatedSignLanguagePipeline;

// ------------------------
// INLINE STYLES
// ------------------------
const styles: Record<string, React.CSSProperties> = {
  pageWrapper: {
    padding: "1rem",
  },
  diagramContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: "1rem",
  },
  diagramBox: {
    backgroundColor: "#0ea5e9",
    color: "#ffffff",
    padding: "0.8rem 1.2rem",
    borderRadius: "8px",
    fontWeight: 600,
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    textAlign: "center",
    minWidth: "260px",
    opacity: 0,
  },
  modelBox: {
    background: "linear-gradient(45deg, #4f46e5, #6366f1)",
  },
  softmaxBox: {
    background: "linear-gradient(45deg, #f59e0b, #fbbf24)",
  },
  boxText: {
    margin: 0,
    fontSize: "1rem",
  },
  boxContent: {
    marginTop: "0.5rem",
  },
  imageRow: {
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    borderRadius: "6px",
    overflow: "hidden",
  },
  imagePlaceholder: {
    width: "120px",
    height: "80px",
    backgroundColor: "#ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  neuralBlockContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.5rem",
  },
  neuron: {
    width: "15px",
    height: "15px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    border: "2px solid #6366f1",
  },
  softmaxContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    fontSize: "0.8rem",
    textAlign: "left",
  },
  probRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  probLabel: {
    fontWeight: 500,
  },
  probValue: {
    fontFamily: "monospace",
  },
  outputContainer: {
    backgroundColor: "#e5e7eb",
    padding: "0.5rem",
    borderRadius: "6px",
  },
  outputText: {
    margin: 0,
    fontWeight: 600,
    color: "#111827",
  },
};

const arrowStyles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    opacity: 0,
  },
  line: {
    width: "2px",
    height: "20px",
    backgroundColor: "#0ea5e9",
  },
  head: {
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderTop: "8px solid #0ea5e9",
    marginTop: "-1px",
  },
};

// ------------------------
// TripleFrameCarousel Component
// ------------------------
// interface TripleFrameCarouselProps {
//   frames: FrameData[];
//   frameWidth: number;
//   frameHeight: number;
//   interval?: number;
//   drawMarkers?: boolean;
// }

// const TripleFrameCarousel: React.FC<TripleFrameCarouselProps> = ({
//   frames,
//   frameWidth,
//   frameHeight,
//   interval = 1500,
//   drawMarkers = true,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Duplicate first 2 frames for seamless loop if more than 3.
//   const extendedFrames = frames.length > 3 ? [...frames, frames[0], frames[1]] : frames;
//   const total = extendedFrames.length;

//   useEffect(() => {
//     if (frames.length === 0) return;
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => prev + 1);
//     }, interval);
//     return () => clearInterval(timer);
//   }, [frames, interval]);

//   useEffect(() => {
//     if (currentIndex >= frames.length) {
//       const timeout = setTimeout(() => {
//         if (containerRef.current) {
//           containerRef.current.style.transition = "none";
//           setCurrentIndex(0);
//           void containerRef.current.offsetWidth;
//           containerRef.current.style.transition = "transform 0.5s ease-in-out";
//         }
//       }, 500);
//       return () => clearTimeout(timeout);
//     }
//   }, [currentIndex, frames.length]);

//   return (
//     <div style={{ overflow: "hidden", width: frameWidth * 3, height: frameHeight, margin: "0 auto", border: "1px solid #ddd", borderRadius: "6px" }}>
//       <div
//         ref={containerRef}
//         style={{
//           display: "flex",
//           width: `${extendedFrames.length * frameWidth}px`,
//           transition: "transform 0.5s ease-in-out",
//           transform: `translateX(-${currentIndex * frameWidth}px)`,
//         }}
//       >
//         {extendedFrames.map((frame, idx) => (
//           <div key={idx} style={{ width: frameWidth, height: frameHeight, flexShrink: 0 }}>
//             <CanvasFrame frameUrl={frame.rawUrl} pose={frame.pose} drawMarkers={drawMarkers} width={frameWidth} height={frameHeight} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
