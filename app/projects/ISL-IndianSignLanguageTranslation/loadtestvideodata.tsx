"use client";
import React, { useState, useEffect } from 'react';
import { ISLTestData, listCategories,getVideoUrl } from './interfaces/isl_r2';

const LoadTestVideoData = () => {
    const [frames, setFrames] = useState([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [testData, setTestData] = useState<ISLTestData>({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [expressions, setExpressions] = useState<string[]>([]);
    const [selectedExpression, setSelectedExpression] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');
    const [videoUrl, setVideoUrl] = useState<string>();

    const bucketName = 'your-r2-bucket-name'; // Replace with your R2 bucket name
    const fetchExpressions = async () => {
      console.log("selectedCategory", selectedCategory);
      try {
          const expressionsList = selectedCategory && testData[selectedCategory] ? 
          testData[selectedCategory] : {};
          console.log("expressionsList", expressionsList);
          setExpressions(Object.keys(expressionsList));
      } catch (error) {
          console.error("Error fetching categories:", error);
      }
  };


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const testData = await listCategories(); // Fetch top-level categories
                setTestData(testData);
                setCategories(Object.keys(testData));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        
        fetchCategories();
    }, []);
    useEffect(() => {fetchExpressions();}, [selectedCategory]);

    useEffect(() => {
      const showVideo = async () => {

        const url =await getVideoUrl({category: selectedCategory, expression: selectedExpression, filename: selectedFileName});
        console.log("url", url);
        setVideoUrl(url);
      }

      showVideo();
    }, [selectedFileName]);

    // useEffect(() => {
    //   if (selectedCategory && selectedExpression) {
    //     const fetchVideos = async () => {
    //       try {
    //         const videoList = await listObjectsFromR2(bucketName, selectedCategory + '/' + selectedExpression + '/');            
    //         const videoData = (videoList as string[]).length > 0 ? await Promise.all(videoList.map(async (videoKey) => ({
    //           key: videoKey,
    //           url: await generateR2PresignedUrl(bucketName, videoKey),
    //         }))) : [];


    //         setVideos(videoData);
    //       } catch (error) {
    //         console.error("Error fetching videos:", error);
    //       } finally {
    //         // Ensure that the loading indicator is hidden after the fetch is complete, regardless of success or failure.
    //         // setLoading(false);
    //       }
    //     };
    //     fetchVideos();
    //   } else { setVideos([]) } // Clear videos if no expression or category is selected
    // }, [selectedCategory, selectedExpression]);




    // const handleVideoSelect = async (video) => {
    //   setSelectedVideo(video);
    //   try {
    //     const videoBlob = await fetch(video.url).then(r=> r.blob());
    //     extractFramesFromVideo(videoBlob).then(frames => setFrames(frames)); // Example function, see implementation below
    //   }
    //   catch (error) {
    //     console.error("Error processing video frames: ", error)
    //   }
    // }



    // Replace with your actual R2 interaction logic.
    // const listObjectsFromR2 = async (bucketName, prefix) => {

    //   // Include your R2 authentication, API calls, error handling, etc., here.
    //   // This is a placeholder for demonstration purposes.

    //   if (prefix === '') {
    //       return ['category1', 'category2']; // Top-level categories
    //   } else if (prefix.endsWith('/')) { // If it's a category, return expressions
    //       const parts = prefix.split('/');
    //       const category = parts[0];
    //       if (category === 'category1'){
    //           return ['expressionA', 'expressionB'];
    //       } else if (category === 'category2'){
    //           return ['expressionC', 'expressionD'];
    //       }
    //   } else {  // Otherwise, return the video paths
    //       return ['video1.mov', 'video2.mov']; // Example
    //   }

    // };

    // // Replace with your actual presigned URL generation logic
    // const generateR2PresignedUrl = async (bucketName, videoKey) => {
    //     return `/r2/${bucketName}/${videoKey}`; // Replace this with your actual R2 presigned URL generation logic
    // };


    // // Replace with actual frame extraction logic using OpenCV.js or similar.
    // const extractFramesFromVideo = async (videoBlob) => {
    //     return new Promise((resolve) => {
    //       setTimeout(() => {
    //         const mockFrames = ['/frame1.jpg', '/frame2.jpg', '/frame3.jpg'];
    //         resolve(mockFrames);
    //       }, 500); 
    //     });
    //   };



    return (
      <div className='m-4 grid grid-cols-1 gap-4'>
      {/* <!-- Top Controls --> */}
  <div className="flex justify-center">
            {/* Category Selection */}
            <select onChange={(e) => setSelectedCategory(e.target.value)} className='select' value={selectedCategory}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                    {category}
                    </option>
                ))}
            </select>

          {/* Expression Selection */}
            <select onChange={(e) => {setSelectedExpression(e.target.value); console.log(e.target.value)}} className='select'  value={selectedExpression} disabled={!selectedCategory}>
                <option value="">Select Expression</option>
                {expressions.map((expression) => (
                    <option key={expression} value={expression}>
                    {expression}
                    </option>
                ))}
            </select>
            


            {/* Video Selection */}
            {/* <select onChange={e => handleVideoSelect(videos.find(v => v.key === e.target.value))} value={selectedVideo?.key || ''} disabled={!selectedExpression}>
                <option value="">Select a video</option>
                {videos.map((video) => (
                  <option key={video.key} value={video.key}>
                    {video.key}
                  </option>
                ))}
              </select> */}

            {/* Video Playback */}
            {/* {selectedVideo && (
                <div>
                    <video src={selectedVideo.url} controls width="640" height="480" />
                </div>
            )} */}

            {/* Frame Display */}
            {/* <div className="flex">
            {frames.map((frame, index) => (
                  <div key={index}>
                    <img src={frame} alt={`Frame ${index + 1}`} width="100" height="100" />
                  </div>
                ))}
              </div> */}
              </div>
              <div className='m-4 grid grid-cols-4 gap-4'>
            {/* Filename Display */}
            <div style={{width: '300px', overflowY: 'auto', maxHeight: '300px'}}>
              <ul style={{listStyleType: 'none', padding: 0}}>
                {testData[selectedCategory] && testData[selectedCategory][selectedExpression]?.map((filename, index) => (
                  <li key={index} onClick={() => setSelectedFileName(filename)} 
                  style={{
                    cursor: 'pointer',
                    backgroundColor: filename === selectedFileName ? '#ddd' : 'white'
                  }}>{filename}</li>
                ))}
              </ul>
            </div>
            {/* Video Preview */}
            <div id="video-preview cols-span-3">
              {videoUrl && <video src={videoUrl} controls width="640" height="480" />}
            </div>
          </div>
        </div>
    );
};

export default LoadTestVideoData;
