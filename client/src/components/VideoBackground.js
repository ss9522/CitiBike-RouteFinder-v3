import React, { useEffect, useRef, useState } from 'react';

const videoSources = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
  "/videos/video4.mp4",
  "/videos/video5.mp4"
];

const VideoBackground = () => {
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleVideoEnd = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
    };

    const handleError = (e) => {
      console.error("Video error:", e);
    };

    videoElement.addEventListener('ended', handleVideoEnd);
    videoElement.addEventListener('error', handleError);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
      videoElement.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.src = videoSources[currentVideoIndex];
    videoElement.load(); // Explicitly load the new source

    videoElement.play().catch(error => {
      console.error("Error playing video:", error);
      // Try to play again after a short delay
      setTimeout(() => videoElement.play().catch(e => console.error("Retry failed:", e)), 1000);
    });
  }, [currentVideoIndex]);

  return (
    <div className="video-background">
      <video 
        id="background-video" 
        ref={videoRef} 
        autoPlay 
        muted 
        playsInline
        onCanPlayThrough={() => console.log("Video can play through")}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;