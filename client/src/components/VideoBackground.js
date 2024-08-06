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
    
    const handleVideoEnd = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
    };

    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.src = videoSources[currentVideoIndex];
    videoElement.play().catch(error => console.error("Error playing video:", error));
  }, [currentVideoIndex]);

  return (
    <div className="video-background">
      <video id="background-video" ref={videoRef} autoPlay muted>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;