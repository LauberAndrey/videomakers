import React, { useRef, useEffect, useState } from 'react'
import './VideoPopup.css'

const VideoPopup = ({ videoSrc, onClose }) => {
  const videoRef = useRef(null)
  const progressContainerRef = useRef(null)
  const volumeContainerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timeDisplay, setTimeDisplay] = useState('00:00 / 00:00')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isVolumeDragging, setIsVolumeDragging] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const progressContainer = progressContainerRef.current
    const volumeContainer = volumeContainerRef.current

    // Установка начальной громкости
    video.volume = volume

    const handleTimeUpdate = () => {
      if (video.duration && !isDragging) {
        const percent = (video.currentTime / video.duration) * 100
        setProgress(percent)
        setTimeDisplay(
          `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`
        )
      }
    }

    const handleLoadedMetadata = () => {
      setTimeDisplay(`00:00 / ${formatTime(video.duration)}`)
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement || !!video.webkitDisplayingFullscreen)
    }

    const handleMouseMove = (e) => {
      if (isDragging) {
        handleProgress(e)
      }
      if (isVolumeDragging) {
        handleVolumeChange(e)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsVolumeDragging(false)
    }

    const handleTouchMove = (e) => {
      if (isDragging) {
        handleProgress(e)
      }
      if (isVolumeDragging) {
        handleVolumeChange(e)
      }
    }

    const handleOrientationChange = () => {
      if (isFullscreen) {
        video.style.width = '100%'
        video.style.height = '100%'
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('play', () => setIsPlaying(true))
    video.addEventListener('pause', () => setIsPlaying(false))
    video.addEventListener('webkitbeginfullscreen', () => setIsFullscreen(true))
    video.addEventListener('webkitendfullscreen', () => setIsFullscreen(false))
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleMouseUp)
    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('play', () => setIsPlaying(true))
      video.removeEventListener('pause', () => setIsPlaying(false))
      video.removeEventListener('webkitbeginfullscreen', () => setIsFullscreen(true))
      video.removeEventListener('webkitendfullscreen', () => setIsFullscreen(false))
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleMouseUp)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [isDragging, isVolumeDragging, volume, isFullscreen])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }

  const handleProgress = (e) => {
    const rect = progressContainerRef.current.getBoundingClientRect()
    let pos = 0
    
    if (e.type.includes('touch')) {
      const touch = e.touches[0] || e.changedTouches[0]
      pos = (touch.clientX - rect.left) / rect.width
    } else {
      pos = (e.clientX - rect.left) / rect.width
    }
    
    pos = Math.max(0, Math.min(1, pos))
    const duration = videoRef.current.duration || 1
    videoRef.current.currentTime = pos * duration
    setProgress(pos * 100)
    setTimeDisplay(
      `${formatTime(pos * duration)} / ${formatTime(duration)}`
    )
  }

  const handleVolumeChange = (e) => {
    const rect = volumeContainerRef.current.getBoundingClientRect()
    let pos = 0
    
    if (e.type.includes('touch')) {
      const touch = e.touches[0] || e.changedTouches[0]
      pos = (touch.clientX - rect.left) / rect.width
    } else {
      pos = (e.clientX - rect.left) / rect.width
    }
    
    pos = Math.max(0, Math.min(1, pos))
    const newVolume = pos
    setVolume(newVolume)
    videoRef.current.volume = newVolume
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    if (isMuted) {
      videoRef.current.volume = volume > 0 ? volume : 0.5
      setVolume(volume > 0 ? volume : 0.5)
      setIsMuted(false)
    } else {
      videoRef.current.volume = 0
      setIsMuted(true)
    }
  }

  const handleProgressMouseDown = () => {
    setIsDragging(true)
  }

  const handleVolumeMouseDown = () => {
    setIsVolumeDragging(true)
  }

  const handleProgressClick = (e) => {
    handleProgress(e)
  }

  const handleVolumeClick = (e) => {
    handleVolumeChange(e)
  }

  const toggleFullscreen = () => {
    const videoElement = videoRef.current
    
    // Для iOS используем метод видео элемента
    if (videoElement.webkitEnterFullscreen) {
      videoElement.webkitEnterFullscreen()
    } else if (!document.fullscreenElement) {
      videoElement.parentElement.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error('Error attempting to enable fullscreen:', err))
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error('Error attempting to exit fullscreen:', err))
    }
  }

  return (
    <div className={`popup-overlay ${isFullscreen ? 'fullscreen' : ''}`} onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
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
            muted={isMuted}
          />
          <div className="video-controls">
            <button className="play-btn" onClick={togglePlay}>
              {isPlaying ? (
                <span style={{ fontSize: '1.2em' }}>⏸</span>
              ) : (
                <span style={{ fontSize: '1.2em' }}>▶</span>
              )}
            </button>
            <div
              ref={progressContainerRef}
              className="progress-bar-container"
              onClick={handleProgressClick}
              onMouseDown={handleProgressMouseDown}
              onTouchStart={handleProgressMouseDown}
            >
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              >
                <div className="progress-thumb" />
              </div>
            </div>
            <div className="time-display">{timeDisplay}</div>
            
            <div className="volume-control">
              <button className="volume-btn" onClick={toggleMute}>
                {isMuted || volume === 0 ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
              </button>
              <div
                ref={volumeContainerRef}
                className="volume-bar-container"
                onClick={handleVolumeClick}
                onMouseDown={handleVolumeMouseDown}
                onTouchStart={handleVolumeMouseDown}
              >
                <div
                  className="volume-bar"
                  style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                >
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
  )
}

export default VideoPopup