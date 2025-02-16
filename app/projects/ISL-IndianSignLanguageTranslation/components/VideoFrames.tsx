"use server";
import React from 'react'
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

export enum VideoToFramesMethod {
    fps,
    totalFrames
  }
  
export class VideoToFrames {
/**
 * Extracts frames from the video and returns them as an array of imageData
 * @param videoUrl url to the video file (html5 compatible format) eg: mp4
 * @param amount number of frames per second or total number of frames that you want to extract
 * @param type [fps, totalFrames] The method of extracting frames: Number of frames per second of video or the total number of frames acros the whole video duration. defaults to fps
 */
public static getFrames(
    videoUrl: string,
    amount: number,
    type: VideoToFramesMethod = VideoToFramesMethod.fps
): Promise<string[]> {
    return new Promise(
    (
        resolve: (frames: string[]) => void,
        reject: (error: string) => void
    ) => {
        let frames: string[] = [];
        let canvas: HTMLCanvasElement = document.createElement("canvas");
        let context: CanvasRenderingContext2D | null = canvas.getContext("2d");
        let duration: number;

        let video = document.createElement("video");
        video.preload = "auto";
        let that = this;
        video.addEventListener("loadeddata", async function () {
        canvas.width = video.videoWidth;
        if (!context) {
          reject("Could not get 2D rendering context");
          return;
        }
        canvas.height = video.videoHeight;
        duration = video.duration;

        let totalFrames: number = amount;
        if (type === VideoToFramesMethod.fps) {
            totalFrames = duration * amount;
        }
        for (let time = 0; time < duration; time += duration / totalFrames) {
            frames.push(await that.getVideoFrame(video, context, canvas, time));
        }
        resolve(frames);
        });
        video.src = videoUrl;
        video.load();
    }
    );
}

private static getVideoFrame(
    video: HTMLVideoElement,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    time: number
): Promise<string> {
    return new Promise(
    (resolve: (frame: string) => void, reject: (error: string) => void) => {
        let eventCallback = () => {
        video.removeEventListener("seeked", eventCallback);
        if (!context) {
          reject("Could not get 2D rendering context");
          return;
        }
        this.storeFrame(video, context!, canvas, resolve);
        };
        video.addEventListener("seeked", eventCallback);
        video.currentTime = time;
    }
    );
}

private static storeFrame(
    video: HTMLVideoElement,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    resolve: (frame: string) => void
) {
    if (context) {
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      resolve(canvas.toDataURL());
    } else {
      resolve("");
    }
}
}

const VideoFrames = (category: string, expression: string, filename: string) => {
// a client can be shared by different commands.
const client = new S3Client({ region: "REGION" });

const params = {
  /** input parameters */
};
const command = new ListBucketsCommand(params);
//   const bucketName = 'your-r2-bucket-name'; // Replace with your R2 bucket name
//   const videoKey = `${category}/${expression}/${filename}`;
//   const url = generateR2PresignedUrl(bucketName, videoKey);
//   const response = fetch(url);
//   const blob = response.then(res => res.blob());
//   const frames = blob.then(blob => extractFramesFromVideo(blob));

  return (
    <div className="grid grid-cols-4 gap-2">
      {/* {frames.then(frames => frames.map((frame: string, index: number) => (
        <img key={index} src={frame} alt={`Frame ${index + 1}`} />
      )))} */}
    </div>
  );

}

export default VideoFrames
