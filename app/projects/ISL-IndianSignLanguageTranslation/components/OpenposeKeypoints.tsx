import React from 'react'
import sampleOpenPoseData from './SamplePoseData'
import PoseVisualization from './PoseVisualiser'

const OpenposeKeypoints = () => {
  return (
    <div className='m-10 flex flex-col xl:flex-row flex-wrap'>
        <div className='w-full max-w-3xl'>
             <PoseVisualization 
               nose={sampleOpenPoseData.nose} 
               leftEye={sampleOpenPoseData.leftEye} 
               rightEye={sampleOpenPoseData.rightEye} 
               leftShoulder={sampleOpenPoseData.leftShoulder} 
               rightShoulder={sampleOpenPoseData.rightShoulder} 
               leftElbow={sampleOpenPoseData.leftElbow} 
               rightElbow={sampleOpenPoseData.rightElbow} 
               leftWrist={sampleOpenPoseData.leftWrist} 
               rightWrist={sampleOpenPoseData.rightWrist}
               leftHip={sampleOpenPoseData.leftHip} 
               rightHip={sampleOpenPoseData.rightHip} 
               leftKnee={sampleOpenPoseData.leftKnee} 
               rightKnee={sampleOpenPoseData.rightKnee} 
               leftAnkle={sampleOpenPoseData.leftAnkle}
               rightAnkle={sampleOpenPoseData.rightAnkle} 
               rightEar={sampleOpenPoseData.rightEar} 
               leftEar={sampleOpenPoseData.leftEar} 
               neck={sampleOpenPoseData.neck} 
             />
           </div>
        
        {/* <div className='w-full md:w-2/3 md:order-2 order-1'> 
          <div className='m-4 p-4 grid grid-cols-2 md:grid-cols-3 gap-4'>
            {Object.keys(sampleOpenPoseData).map((key) => (
              <div key={key} className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>
                {key}
              </div>
            ))}
          </div>
        </div> */}
      </div>
  )
}

export default OpenposeKeypoints
