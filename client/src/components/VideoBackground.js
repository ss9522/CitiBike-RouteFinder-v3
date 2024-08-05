import React, { useEffect, useRef, useState } from 'react';

const videoSources = [
    './videos/video1.mp4',
    './videos/video2.mp4',
    './videos/video3.mp4',
    './videos/video4.mp4',
    './videos/video5.mp4'
];

const VideoBackground = ({ children }) => {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const handleEnded = () => {
      setCurrentVideo((prevVideo) => (prevVideo + 1) % videoSources.length);
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoSources[currentVideo];
      videoRef.current.play();
    }
  }, [currentVideo]);

  return (
    <div className="video-background">
      <video ref={videoRef} autoPlay muted playsInline loop>
        <source src={videoSources[0]} type="video/mp4" />
      </video>
      <div className="video-overlay">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;