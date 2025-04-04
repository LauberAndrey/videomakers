import React, { useState, useEffect } from 'react'
import VideoPopup from '../../components/VideoPopup/VideoPopup'
import './VideoSection.css'

const VideoSection = () => {
	const [showVideoPopup, setShowVideoPopup] = useState(false)
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768)
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const handleVideoPlay = () => {
		setShowVideoPopup(true)
		document.body.style.overflow = 'hidden'
	}

	const closeVideoPopup = () => {
		setShowVideoPopup(false)
		document.body.style.overflow = ''
	}

	return (
		<section className='wrapper-img'>
			<div className=' video-section video-section-container'>
				<div className='container'>
					<div className='video-section-content'>
						<div className='video-section-poster'>
							<img
								src='/images/videosect.svg'
								alt='Видео презентация'
								className='video-section-poster-image'
							/>

							<div
								className={`video-section-play-container ${
									isMobile ? 'video-section-mobile' : ''
								}`}
								onClick={handleVideoPlay}
							>
								<img
									src='/images/Play-text.svg'
									className='video-section-rotating-text'
									alt='Воспроизвести видео'
								/>
								<img
									src='/images/play-text-btn.svg'
									className='video-section-play-icon'
									alt='Кнопка воспроизведения'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{showVideoPopup && (
				<VideoPopup
					videoSrc='/video/Showreel Short Loop.mp4'
					onClose={closeVideoPopup}
					isMobile={isMobile}
				/>
			)}
		</section>
	)
}

export default VideoSection