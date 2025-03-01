"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ISLTestData } from './interfaces/isl_r2';
import * as d3 from 'd3';

const LoadTestVideoData = () => {
  const [frames, setFrames] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [testData, setTestData] = useState<ISLTestData>({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expressions, setExpressions] = useState<string[]>([]);
  const [selectedExpression, setSelectedExpression] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [poseData, setPoseData] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch categories on mount
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

    // Fetch pose data from CSV (ensure that the CSV columns bodypose_circles, bodypose_sticks, handpose_edges, handpose_peaks are JSON strings)
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
    // Fetch the pose data (if not already fetched) – you may want to load it once or per video as needed.
    fetchPoseData();
  }, []);

  // Update expressions when category changes
  useEffect(() => {
    if (selectedCategory) {
      const expressionsList = testData[selectedCategory] ? testData[selectedCategory] : {};
      setExpressions(Object.keys(expressionsList));
    }
  }, [selectedCategory]);



  // When a new file is selected, fetch the video URL and the pose data for that video.
  useEffect(() => {
    const fetchVideo = async () => {
      if (selectedCategory && selectedExpression && selectedFileName) {
        try {
          const res = await fetch('/api/getVideoUrl', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              category: selectedCategory, 
              expression: selectedExpression, 
              filename: selectedFileName 
            })
          });
          if (!res.ok) throw new Error('Failed to fetch video URL');
          const data = await res.json();
          setVideoUrl((data as {url:string}).url);
        } catch (error) {
          console.error("Error fetching video URL:", error);
        }
      }
    };
    fetchVideo();
  }, [selectedFileName]);

  // Helper function to overlay markers on a given frame image
  const overlayMarkersOnFrame = (frameDataUrl: string, pose: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Create a new canvas to draw the overlay
        const canvasOverlay = document.createElement("canvas");
        canvasOverlay.width = img.width;
        canvasOverlay.height = img.height;
        const ctx = canvasOverlay.getContext("2d");
        if (!ctx) {
          reject("Could not get 2D context");
          return;
        }
        // Draw the original frame
        ctx.drawImage(img, 0, 0);

        // Define a colors array (same as your Python code)
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
          [0, 255, 255]
        ];
        const toRGB = (color: number[]) => `rgb(${color[0]},${color[1]},${color[2]})`;

        // --- Draw Body Pose Sticks ---
        // Assume pose.bodypose_sticks is an array of [mX, mY, angle, length]
        const stickWidth = 4;
        if (pose.bodypose_sticks) {
          pose.bodypose_sticks.forEach((stick: number[], idx: number) => {
            const [mX, mY, angle, length] = stick;
            // Convert angle from degrees to radians
            const radians = angle * Math.PI / 180;
            ctx.save();
            ctx.translate(mX, mY);
            ctx.rotate(radians);
            ctx.globalAlpha = 0.6; // similar to cv2.addWeighted blending
            ctx.fillStyle = toRGB(colors[idx % colors.length]);
            ctx.beginPath();
            // Draw an ellipse centered at (0,0)
            ctx.ellipse(0, 0, length / 2, stickWidth, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
          });
        }

        // --- Draw Body Pose Circles ---
        // Assume pose.bodypose_circles is an array of [x, y]
        if (pose.bodypose_circles) {
          pose.bodypose_circles.forEach((circle: number[], idx: number) => {
            const [x, y] = circle;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = toRGB(colors[idx % colors.length]);
            ctx.fill();
          });
        }

        // --- Draw Handpose Edges ---
        // Assume pose.handpose_edges is an array of arrays; each inner array contains edges in the form [ie, x1, y1, x2, y2]
        if (pose.handpose_edges) {
          const totalEdges = 20; // same as in your python code
          pose.handpose_edges.forEach((handEdges: any[]) => {
            handEdges.forEach((edge: any) => {
              const [ie, x1, y1, x2, y2] = edge;
              // Use HSL to mimic hsv_to_rgb conversion
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

        // --- Draw Handpose Peaks ---
        // Assume pose.handpose_peaks is an array of arrays; each inner array contains points in the form [x, y, text?]
        if (pose.handpose_peaks) {
          pose.handpose_peaks.forEach((handPeaks: any[]) => {
            handPeaks.forEach((peak: any) => {
              const [x, y] = peak; // ignoring any text for now
              ctx.beginPath();
              ctx.arc(x, y, 3, 0, 2 * Math.PI);
              ctx.fillStyle = "red";
              ctx.fill();
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

  // Function to extract frames and overlay markers on each frame
  const getFrames = async () => {
    console.log('Extracting frames...');
    setFrames([]);
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
    const totalFrames = Math.floor(duration * 25); // assuming 30fps
    const newFrames: string[] = [];

    // Filter pose data for the current video file
    const currentPoseData = poseData.filter(row => row.FileName === selectedFileName);

    // Loop through and extract each frame
    for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
      const time = frameIndex * (duration / totalFrames);
      const frameDataUrl = await getVideoFrame(video, context, canvas, time);
      // Look up the corresponding pose data (assuming "Frame" column matches frameIndex)
      const poseRow = currentPoseData.find(row => parseInt(row.Frame) === frameIndex);
      let overlayedFrame: string;
      if (poseRow) {
        // Parse the pose data columns (make sure these are valid JSON strings)
        // console.log(poseRow.handpose_peaks);
        // console.log(poseRow.handpose_peaks.replace(/array/g, '').replace(/\(/g, '[').replace(/\)/g, ']').replace(/'/g, ''));
        const bodyposeCircles = JSON.parse( poseRow.bodypose_circles.replace(/array/g, '').replace(/\(/g, '[').replace(/\)/g, ']'));
        const bodyposeSticks = JSON.parse(poseRow.bodypose_sticks.replace(/array/g, '').replace(/\(/g, '[').replace(/\)/g, ']'));
        const handposeEdges = JSON.parse(poseRow.handpose_edges.replace(/array/g, '').replace(/\(/g, '[').replace(/\)/g, ']'));
        const handposePeaks = JSON.parse(poseRow.handpose_peaks.replace(/array/g, '').replace(/\(/g, '[').replace(/\)/g, ']').replace(/'/g, ''));
        overlayedFrame = await overlayMarkersOnFrame(frameDataUrl, {
          bodypose_circles: bodyposeCircles,
          bodypose_sticks: bodyposeSticks,
          handpose_edges: handposeEdges,
          handpose_peaks: handposePeaks
        });
      } else {
        overlayedFrame = frameDataUrl;
      }
      newFrames.push(overlayedFrame);
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
    return new Promise((resolve, reject) => {
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

  return (
    <div className='bg-gray-100 min-h-screen p-6'>
      <div className='max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          {/* Sidebar for categories, expressions, and filenames */}
          <div className='col-span-1 space-y-4'>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
              className='w-full p-3 border rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 focus:ring-2 focus:ring-blue-400'
            >
              <option value=''>Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              onChange={(e) => setSelectedExpression(e.target.value)}
              value={selectedExpression}
              className='w-full p-3 border rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 focus:ring-2 focus:ring-blue-400'
              disabled={!selectedCategory}
            >
              <option value=''>Select Expression</option>
              {expressions.map((expression) => (
                <option key={expression} value={expression}>{expression}</option>
              ))}
            </select>

            <div className='border rounded-lg max-h-80 overflow-y-auto p-3 bg-gray-50'>
              {testData[selectedCategory]?.[selectedExpression]?.map((filename, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedFileName(filename)}
                  className={`p-2 cursor-pointer rounded ${filename === selectedFileName ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                >
                  {filename}
                </div>
              ))}
            </div>
          </div>

          {/* Video Player and Frames */}
          <div className='col-span-3'>
            {videoUrl ? (
              <div className='w-full aspect-video rounded-lg overflow-hidden shadow-md mb-4'>
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
              <p className='text-center text-gray-500'>Select a video to preview</p>
            )}

            <h3 className='text-xl font-bold mb-4'>Extracted Frames</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {frames.map((frame, index) => (
                <div key={index} className='border rounded-lg overflow-hidden shadow-md'>
                  <img src={frame} alt={`Frame ${index + 1}`} className='w-full' />
                  <p className='text-center text-sm p-2 bg-gray-200'>Frame#: {index}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadTestVideoData;
