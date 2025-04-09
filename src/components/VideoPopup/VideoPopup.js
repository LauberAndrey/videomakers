import React, { useRef, useEffect, useState } from 'react';
import './VideoPopup.css';

const VideoPopup = ({ videoSrc, onClose }) => {
  const videoRef = useRef(null);
  const progressContainerRef = useRef(null);
  const volumeContainerRef = useRef(null);
  const popupContentRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeDisplay, setTimeDisplay] = useState('00:00 / 00:00');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isVolumeDragging, setIsVolumeDragging] = useState(false);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.volume = volume;

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (e) {
        console.error("Ошибка при автозапуске видео:", e);
      }
    };

    playVideo(); // Запустим видео сразу при открытии

    const handleTimeUpdate = () => {
      if (video.duration && !isDragging) {
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent);
        setTimeDisplay(
            `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`
        );
      }
    };

    const handleLoadedMetadata = () => {
      setTimeDisplay(`00:00 / ${formatTime(video.duration)}`);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(
          !!(document.fullscreenElement || document.webkitFullscreenElement)
      );
    };

    const handleMouseMove = (e) => {
      if (isDragging) handleProgress(e);
      if (isVolumeDragging) handleVolumeChange(e);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsVolumeDragging(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));

      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, isVolumeDragging, volume]);


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play().catch(e => console.log("Play error:", e));
    } else {
      video.pause();
    }
  };

  const handleProgress = (e) => {
    const rect = progressContainerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const duration = videoRef.current.duration || 1;
    videoRef.current.currentTime = pos * duration;
    setProgress(pos * 100);
    setTimeDisplay(`${formatTime(pos * duration)} / ${formatTime(duration)}`);
  };

  const handleVolumeChange = (e) => {
    const rect = volumeContainerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setVolume(pos);
    videoRef.current.volume = pos;
    setIsMuted(pos === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (isMuted) {
      video.volume = volume > 0 ? volume : 0.5;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        if (isIOS && videoRef.current?.webkitEnterFullscreen) {
          await videoRef.current.webkitEnterFullscreen();
        } else if (popupContentRef.current?.requestFullscreen) {
          await popupContentRef.current.requestFullscreen();
        } else if (popupContentRef.current?.webkitRequestFullscreen) {
          await popupContentRef.current.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  return (
    <div className={`popup-overlay ${isFullscreen ? 'fullscreen' : ''}`} onClick={onClose}>
      <div
        className="popup-content"
        ref={popupContentRef}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <div className="video-wrapper">
          <video
            ref={videoRef}
            src={videoSrc}
            controls={false}
            playsInline
            webkit-playsinline="true"
            x-webkit-airplay="allow"
            muted={isMuted}
            preload="auto"
          />
          <div className="video-controls">
            <button className="play-btn" onClick={togglePlay}>
              {isPlaying ? '⏸' : '▶'}
            </button>

            <div
              ref={progressContainerRef}
              className="progress-bar-container"
              onClick={handleProgress}
              onTouchStart={() => setIsDragging(true)}
              onMouseDown={() => setIsDragging(true)}
            >
              <div className="progress-bar" style={{ width: `${progress}%` }}>
                <div className="progress-thumb" />
              </div>
            </div>

            <div className="time-display">{timeDisplay}</div>

            <div className="volume-control">
              <button className="volume-btn" onClick={toggleMute}>
                {isMuted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
              </button>
              <div
                ref={volumeContainerRef}
                className="volume-bar-container"
                onClick={handleVolumeChange}
                onTouchStart={() => setIsVolumeDragging(true)}
                onMouseDown={() => setIsVolumeDragging(true)}
              >
                <div className="volume-bar" style={{ width: `${isMuted ? 0 : volume * 100}%` }}>
                  <div className="volume-thumb" />
                </div>
              </div>
            </div>

            <button className="fullscreen-btn" onClick={toggleFullscreen}>
              {isFullscreen ? '⤡' : '⤢'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;