import React, { useEffect, useRef, useState } from 'react';

const videoSources = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
    "/videos/video4.mp4",
    "/videos/video5.mp4",
];
function VideoBackground() {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
    useEffect(() => {
      const videoElement = document.getElementById('background-video');
      videoElement.addEventListener('ended', handleVideoEnd);
  
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
      };
    }, []);
  
    const handleVideoEnd = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
    };
  
    return (
      <div className="video-background">
        <video id="background-video" autoPlay muted>
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  
  export default VideoBackground;