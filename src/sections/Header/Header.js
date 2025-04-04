import React, { useState, useEffect, useCallback } from 'react';
import './Header.css';
import Button from '../../components/Button/Button';
import VideoPopup from '../../components/VideoPopup/VideoPopup';

const Header = ({ scrollRef }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePlayClick = () => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = '';
  };

  const scrollToForm = useCallback(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }, [scrollRef]);

  return (
    <div className="wrapper-img">
      <header className="header">
        <div className="container">
          <div className="header__content">
            <div className="header_up">
              <h2 className="header__title">
                Мы снимаем клипы, 
                <img className="title_img" src="/images/money-icon.svg" alt="" />
                
                которые
                <img className="title_img" src="/images/shapetextheader.svg" alt="" />
                приносят бабки
              </h2>
              <hr className="line" />
            </div>

            <div 
              className="play-button-container" 
              onClick={handlePlayClick}
              style={isMobile ? { left: '50%', transform: 'translateX(-50%)' } : {}}
            >
              <img src="/images/Play-text.svg" className="rotating-text" alt="Rotating Text" />
              <img src="/images/Play.svg" className="play-button" alt="Play Button" />
            </div>

            <div className="header__info">
              <div className="header__desk">
                <img src="/images/rings.svg" alt="" />
                <p className="header__desk-text">
                  Видео, которое стоит меньше, <br /> чем прибыль, которую оно приносит
                </p>
              </div>
              <Button onClick={scrollToForm}>Получить консультацию</Button>
            </div>
          </div>
        </div>
      </header>

      {showPopup && (
        <VideoPopup 
          videoSrc="/video/Showreel Full.mp4" 
          onClose={closePopup} 
          isMobile={isMobile}
        />
      )}
    </div>
  );
};

export default Header;