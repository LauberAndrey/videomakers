import React, { useState, useEffect, useCallback } from 'react'
import './Header.css'
import Button from '../../components/Button/Button'
import VideoPopup from '../../components/VideoPopup/VideoPopup'

const Header = ({ scrollRef }) => {
    const [showPopup, setShowPopup] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handlePlayClick = () => {
        setShowPopup(true)
        document.body.style.overflow = 'hidden'
    }

    const closePopup = () => {
        setShowPopup(false)
        document.body.style.overflow = ''
    }

    const scrollToForm = useCallback(() => {
        if (scrollRef?.current) {
            scrollRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            })
        }
    }, [scrollRef])

    const handleButtonInteraction = (e, isTouch) => {
        const btnContainer = e.currentTarget.closest('.btn__container')
        if (!btnContainer) return
        
        if (isTouch) {
            void btnContainer.offsetWidth;
            btnContainer.classList.add('active')
            
            setTimeout(() => {
                btnContainer.classList.remove('active')
                void btnContainer.offsetWidth
            }, 300)
        }
    }

    return (
        <div className='wrapper-img'>
            <header className='header' id='header'>
                <div className='container'>
                    <div className='header__content'>
                        <video 
                            autoPlay 
                            muted 
                            loop 
                            playsInline
							preload="auto"
                            className="header-video-bg"
							onEnded={(e) => e.target.currentTime = 0}
                        >
                            
							<source src="/video/Showreel Short Loop.mp4" type="video/webm" />
                        </video>
                        
                        <div className='header_up'>
                            <h2 className='header__title'>
                                Мы снимаем клипы,{' '}
                                <img
                                    className='title_img'
                                    src='/images/money-icon.svg'
                                    alt=''
                                /> которые
                                <img
                                    className='title_img'
                                    src='/images/shapetextheader.svg'
                                    alt=''
                                />
                                приносят бабки
                            </h2>
                            <hr className='line' />
                        </div>

                        <div className='header-main-content'>
                            <div className='header-services'>
                                <ul className='services-list'>
                                    <li>Клипы для ТВ</li>
                                    <li>Клипы для соцсетей</li>
                                    <li>Промо для кавер-групп</li>
                                    <li>Сниппеты</li>
                                    <li>Концерты</li>
                                </ul>
                            </div>

                            <div 
                                className='play-button-container'
                                onClick={handlePlayClick}
                            >
                                <img
                                    src='/images/Play-text.svg'
                                    className='rotating-text'
                                    alt='Rotating Text'
                                />
                                <img
                                    src='/images/Play.svg'
                                    className='play-button'
                                    alt='Play Button'
                                />
                            </div>
                        </div>

                        <div className='header__info'>
                            <div className='header-stats'>
                                <div className='stat-item'>
                                    <span className='stat-number'>50</span>
                                    <span className='stat-label'>клипов</span>
                                </div>
                                <div className='stat-item'>
                                    <span className='stat-number'>1000+</span>
                                    <span className='stat-label'>проектов</span>
                                </div>
                                <div className='stat-item'>
                                    <span className='stat-number'>десятки</span>
                                    <span className='stat-label'>знаковых артистов</span>
                                </div>
                            </div>
                            
                            <Button
                                onClick={(e) => {
                                    scrollToForm()
                                    handleButtonInteraction(e, false)
                                }}
                                onTouchStart={(e) => handleButtonInteraction(e, true)}
                            >
                                Получить консультацию
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {showPopup && (
                <VideoPopup
                    videoSrc='/video/Шоурил клипы.mp4'
                    onClose={closePopup}
                    isMobile={isMobile}
                />
            )}
        </div>
    )
}

export default Header