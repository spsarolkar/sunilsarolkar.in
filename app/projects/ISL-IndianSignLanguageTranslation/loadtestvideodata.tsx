"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ISLTestData } from './interfaces/isl_r2';
import * as d3 from 'd3';

interface FrameData {
  url: string;
  pose?: {
    bodypose_circles?: any;
    bodypose_sticks?: any;
    handpose_edges?: any;
    handpose_peaks?: any;
  };
}

const LoadTestVideoData = () => {
  const [frames, setFrames] = useState<FrameData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [testData, setTestData] = useState<ISLTestData>({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expressions, setExpressions] = useState<string[]>([]);
  const [selectedExpression, setSelectedExpression] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [poseData, setPoseData] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Modal state: which frame (by index) is shown in modal?
  const [modalFrameIndex, setModalFrameIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Fetch categories and pose data on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/listCategories', { method: 'GET' });
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setTestData(data as ISLTestData);
        setCategories(Object.keys(data as ISLTestData));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchPoseData = async () => {
      try {
        const res = await fetch('/api/getTestData', { method: 'GET' });
        if (!res.ok) throw new Error('Failed to fetch test data');
        const data = await res.json();
        const csvUrl = (data as { url: string }).url;
        const csvData = await d3.csv(csvUrl);
        setPoseData(csvData);
      } catch (error) {
        console.error("Error fetching pose data:", error);
      }
    };

    fetchCategories();
    fetchPoseData();
  }, []);

  // Update expressions when category changes
  useEffect(() => {
    if (selectedCategory) {
      const expressionsList = testData[selectedCategory] || {};
      setExpressions(Object.keys(expressionsList));
    }
  }, [selectedCategory, testData]);

  // Fetch video URL when a new file is selected
  useEffect(() => {
    const fetchVideo = async () => {
      if (selectedCategory && selectedExpression && selectedFileName) {
        try {
          const res = await fetch('/api/getVideoUrl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              category: selectedCategory, 
              expression: selectedExpression, 
              filename: selectedFileName 
            })
          });
          if (!res.ok) throw new Error('Failed to fetch video URL');
          const data = await res.json();
          setVideoUrl((data as { url: string }).url);
        } catch (error) {
          console.error("Error fetching video URL:", error);
        }
      }
    };
    fetchVideo();
  }, [selectedFileName, selectedCategory, selectedExpression]);

  // Overlay markers and coordinate labels on image
  const overlayMarkersOnFrame = (frameDataUrl: string, pose: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvasOverlay = document.createElement("canvas");
        canvasOverlay.width = img.width;
        canvasOverlay.height = img.height;
        const ctx = canvasOverlay.getContext("2d");
        if (!ctx) {
          reject("Could not get 2D context");
          return;
        }
        // Draw original frame
        ctx.drawImage(img, 0, 0);

        const colors = [
          [255, 0, 0], [255, 85, 0], [255, 170, 0], [255, 255, 0],
          [170, 255, 0], [85, 255, 0], [0, 255, 0], [0, 255, 85],
          [0, 255, 170], [0, 255, 255], [0, 170, 255], [0, 85, 255],
          [0, 0, 255], [85, 0, 255], [170, 0, 255], [255, 0, 255],
          [255, 0, 170], [255, 0, 85], [255, 255, 0], [255, 255, 85],
          [255, 255, 170], [255, 255, 255], [170, 255, 255], [85, 255, 255],
          [0, 255, 255]
        ];
        const toRGB = (color: number[]) => `rgb(${color[0]},${color[1]},${color[2]})`;

        ctx.font = "10px Arial";
        ctx.fillStyle = "black";

        // Draw Body Pose Sticks (no coordinates for sticks)
        const stickWidth = 4;
        if (pose.bodypose_sticks) {
          pose.bodypose_sticks.forEach((stick: number[], idx: number) => {
            const [mX, mY, angle, length] = stick;
            const radians = angle * Math.PI / 180;
            ctx.save();
            ctx.translate(mX, mY);
            ctx.rotate(radians);
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = toRGB(colors[idx % colors.length]);
            ctx.beginPath();
            ctx.ellipse(0, 0, length / 2, stickWidth, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
          });
        }

        // Draw Body Pose Circles and label xy coordinates
        if (pose.bodypose_circles) {
          pose.bodypose_circles.forEach((circle: number[], idx: number) => {
            const [x, y] = circle;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = toRGB(colors[idx % colors.length]);
            ctx.fill();
            // Draw text (x,y) near the circle
            ctx.fillStyle = "black";
            ctx.fillText(`(${x},${y})`, x + 5, y + 5);
          });
        }

        // Draw Handpose Edges (no coordinates here)
        if (pose.handpose_edges) {
          const totalEdges = 20;
          pose.handpose_edges.forEach((handEdges: any[]) => {
            handEdges.forEach((edge: any) => {
              const [ie, x1, y1, x2, y2] = edge;
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

        // Draw Handpose Peaks and label xy coordinates
        if (pose.handpose_peaks) {
          pose.handpose_peaks.forEach((handPeaks: any[]) => {
            handPeaks.forEach((peak: any) => {
              const [x, y] = peak;
              ctx.beginPath();
              ctx.arc(x, y, 3, 0, 2 * Math.PI);
              ctx.fillStyle = "red";
              ctx.fill();
              // Draw text for the hand keypoint coordinates
              ctx.fillStyle = "black";
              ctx.fillText(`(${x},${y})`, x + 5, y + 5);
            });
          });
        }
        resolve(canvasOverlay.toDataURL());
      };
      img.onerror = (err) => {
        reject(err);
      };
      img.src = frameDataUrl;
    });
  };

  // Extract frames and overlay markers on each frame
  const getFrames = async () => {
    console.log('Extracting frames...');
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      console.error("Could not get 2D rendering context for canvas");
      return;
    }
    const video = videoRef.current;
    if (!video) {
      console.error("Video element not found");
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const duration = video.duration;
    const totalFrames = Math.floor(duration * 25); // assuming 25 fps
    const newFrames: FrameData[] = [];

    // Filter pose data for the current video file
    const currentPoseData = poseData.filter(row => (row.FileName === selectedFileName && row.Expression === selectedExpression && row.Type === selectedCategory));
    console.log('currentPoseData:', currentPoseData);
    for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
      const time = frameIndex * (duration / totalFrames);
      const frameDataUrl = await getVideoFrame(video, context, canvas, time);
      const poseRow = currentPoseData.find(row => parseInt(row.Frame) === frameIndex);
      let overlayedFrame: string;
      let poseObj = undefined;
      if (poseRow) {
        const bodyposeCircles = JSON.parse(
          poseRow.bodypose_circles.replace(/array/g, '').replace(/\(/g, '[').replace(/\)/g, ']')
        );
        const bodyposeSticks = JSON.parse(
          poseRow.bodypose_sticks.replace(/array/g, '').replace(/\(/g, '[').replace(/\)/g, ']')
        );
        const handposeEdges = JSON.parse(
          poseRow.handpose_edges.replace(/array/g, '').replace(/\(/g, '[').replace(/\)/g, ']')
        );
        const handposePeaks = JSON.parse(
          poseRow.handpose_peaks.replace(/array/g, '').replace(/\(/g, '[').replace(/\)/g, ']').replace(/'/g, '"')
        );
        poseObj = {
          bodypose_circles: bodyposeCircles,
          bodypose_sticks: bodyposeSticks,
          handpose_edges: handposeEdges,
          handpose_peaks: handposePeaks
        };
        overlayedFrame = await overlayMarkersOnFrame(frameDataUrl, poseObj);
      } else {
        overlayedFrame = frameDataUrl;
      }
      newFrames.push({ url: overlayedFrame, pose: poseObj });
    }
    setFrames(newFrames);
  };

  // Helper to get a single video frame as a data URL
  const getVideoFrame = (
    video: HTMLVideoElement,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    time: number
  ): Promise<string> => {
    return new Promise((resolve) => {
      const eventCallback = () => {
        video.removeEventListener("seeked", eventCallback);
        storeFrame(video, context, canvas, resolve);
      };
      video.addEventListener("seeked", eventCallback);
      video.currentTime = time;
    });
  };

  const storeFrame = (
    video: HTMLVideoElement,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    resolve: (frame: string) => void
  ) => {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    resolve(canvas.toDataURL());
  };

  // Auto-advance modal frame when playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && modalFrameIndex !== null) {
      timer = setInterval(() => {
        setModalFrameIndex((prev) => {
          if (prev === null) return 0;
          const next = prev + 1;
          return next >= frames.length ? 0 : next;
        });
      }, 500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, modalFrameIndex, frames.length]);

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {/* Sidebar for categories, expressions, and filenames */}
        <div className='col-span-1 space-y-4'>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            aria-label="Video category"
            className="lab-select"
          >
            <option value=''>Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            onChange={(e) => setSelectedExpression(e.target.value)}
            value={selectedExpression}
            aria-label="Sign expression"
            className="lab-select"
            disabled={!selectedCategory}
          >
            <option value=''>Select Expression</option>
            {expressions.map((expression) => (
              <option key={expression} value={expression}>{expression}</option>
            ))}
          </select>
          <div className="video-files">
            {testData[selectedCategory]?.[selectedExpression]?.map((filename, index) => (
              <button
                type="button"
                key={filename}
                onClick={() => setSelectedFileName(filename)}
                aria-pressed={filename === selectedFileName}
                className="video-file"
              >
                {filename}
              </button>
            ))}
          </div>
        </div>

        {/* Video Player and Frames */}
        <div className="min-w-0 md:col-span-3">
          {videoUrl ? (
            <div className="w-full aspect-video rounded-sm overflow-hidden mb-4">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                className='w-full h-full'
                crossOrigin='anonymous'
                onLoadedData={getFrames}
              />
            </div>
          ) : (
            <p className="demo-empty">Select a video to preview</p>
          )}
          <h3 className="text-2xl mt-6 mb-4">Extracted Frames</h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {frames.map((frame, index) => (
              <button
                type="button"
                key={index}
                className="frame-button"
                aria-label={`Inspect frame ${index + 1}`}
                onClick={() => setModalFrameIndex(index)}
              >
                <img src={frame.url} alt="" className="w-full" />
                <span>Frame {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal overlay for playing frames */}
      {modalFrameIndex !== null && (
        <div
          className="frame-modal"
          onClick={() => { setModalFrameIndex(null); setIsPlaying(false); }}
        >
          <div className="frame-modal-panel" onClick={(e) => e.stopPropagation()}>
            <button
              className="frame-close" aria-label="Close frame preview"
              onClick={() => { setModalFrameIndex(null); setIsPlaying(false); }}
            >
              &times;
            </button>
            <div className="flex justify-center">
              <img
                src={frames[modalFrameIndex].url}
                alt={`Frame ${modalFrameIndex + 1}`}
                className="max-w-full max-h-[80vh]"
              />
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="lab-button"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                className="lab-button secondary"
                onClick={() => setModalFrameIndex((prev) => (prev === null ? 0 : Math.max(prev - 1, 0)))}
              >
                Prev
              </button>
              <button
                className="lab-button secondary"
                onClick={() =>
                  setModalFrameIndex((prev) =>
                    prev === null ? 0 : Math.min(prev + 1, frames.length - 1)
                  )
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadTestVideoData;
