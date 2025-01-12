type PoseDataPoint = { x: number; y: number };

interface PoseVisualizationProps {

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

const sampleOpenPoseData: PoseVisualizationProps = {
    nose: { x: 0.5, y: 0.2 },
    neck: { x: 0.5, y: 0.3 },
    rightEye: { x: 0.52, y: 0.17 },
    leftEye: { x: 0.48, y: 0.17 },
    rightEar: { x: 0.56, y: 0.19 },
    leftEar: { x: 0.44, y: 0.19 },
    rightShoulder: { x: 0.6, y: 0.3 },
    rightElbow: { x: 0.65, y: 0.43 },
    rightWrist: { x: 0.73, y: 0.55 },
    leftShoulder: { x: 0.4, y: 0.3 },
    leftElbow: { x: 0.35, y: 0.43 },
    leftWrist: { x: 0.27, y: 0.55 },
    rightHip: { x: 0.58, y: 0.55 },
    rightKnee: { x: 0.58, y: 0.75 },
    rightAnkle: { x: 0.58, y: 0.95 },
    leftHip: { x: 0.42, y: 0.55 },
    leftKnee: { x: 0.42, y: 0.75 },
    leftAnkle: { x: 0.42, y: 0.95 },
    
    
}

export default sampleOpenPoseData;
