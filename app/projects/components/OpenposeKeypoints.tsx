import React from 'react'
import sampleOpenPoseData from './SamplePoseData'
import PoseVisualization from './PoseVisualiser'

const OpenposeKeypoints = () => {
  return (
    <div className='m-4 grid grid-cols-3 gap-4'>
        <div className='rounded-lg pl-20'><PoseVisualization nose={sampleOpenPoseData.nose} leftEye={sampleOpenPoseData.leftEye} rightEye={sampleOpenPoseData.rightEye} leftShoulder={sampleOpenPoseData.leftShoulder} rightShoulder={sampleOpenPoseData.rightShoulder} leftElbow={sampleOpenPoseData.leftElbow} rightElbow={sampleOpenPoseData.rightElbow} 
        leftWrist={sampleOpenPoseData.leftWrist} rightWrist={sampleOpenPoseData.rightWrist}
        leftHip={sampleOpenPoseData.leftHip} rightHip={sampleOpenPoseData.rightHip} leftKnee={sampleOpenPoseData.leftKnee} rightKnee={sampleOpenPoseData.rightKnee} leftAnkle={sampleOpenPoseData.leftAnkle}
        rightAnkle={sampleOpenPoseData.rightAnkle} rightEar={sampleOpenPoseData.rightEar} leftEar={sampleOpenPoseData.leftEar} neck={sampleOpenPoseData.neck} /></div>
        <div className='col-span-2 rounded-lg'><div className='m-4 p-4 grid grid-cols-3 gap-4'><div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>nose</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>leftEye</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>rightEye</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>leftShoulder</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>rightShoulder</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>leftElbow</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>rightElbow</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>leftWrist</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>rightWrist</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>leftHip</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>rightHip</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>leftKnee</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>rightKnee</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>leftAnkle</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>rightAnkle</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>rightEar</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>leftEar</div>
        <div className='flex items-center justify-center bodypose_item rounded-md min-h-[50px]'>neck</div>   
        </div></div>
        </div>
  )
}

export default OpenposeKeypoints
