import React, { useRef, useEffect, useState } from 'react'
import './VideoPopup.css'

const VideoPopup = ({ videoSrc, onClose }) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timeDisplay, setTimeDisplay] = useState('00:00 / 00:00')
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const video = videoRef.current

    const handleTimeUpdate = () => {
      if (video.duration) {
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
      setIsFullscreen(!!document.fullscreenElement)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = pos * videoRef.current.duration
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const element = videoRef.current.parentElement
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.webkitRequestFullscreen) { 
        element.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) { 
        document.webkitExitFullscreen()
      }
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
          />
          <div className="video-controls">
            <button className="play-btn" onClick={togglePlay}>
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <div
              className="progress-bar-container"
              onClick={handleProgressClick}
            >
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="time-display">{timeDisplay}</div>
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