import React, { useState } from 'react';
import './Footer.css';

const FooterSection = ({ scrollRef }) => {
  const [isTouchDevice] = useState('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const scrollToForm = () => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const handleButtonPress = (e) => {
    if (!isTouchDevice) return;
    
    const btnContainer = e.currentTarget;
    btnContainer.classList.add('active');
    
    setTimeout(() => {
      btnContainer.classList.remove('active');
    }, 300);
  };

  return (
    <footer className="footer-section">
      <div className="footer-bg">
        <div className="container">
          <div className="footer-content">
            <div className="footer-left">
              <h2 className="footer-title">Мы снимаем клипы,<br/>которые меняют карьеру</h2>
              <div className="footer-icons">
                <img src="/images/footer_shape1.svg" alt="" className="footer-icon" />
                <img src="/images/footer_shape2.svg" alt="" className="footer-icon" />
                <img src="/images/footer_shape3.svg" alt="" className="footer-icon" />
              </div>
            </div>
            
            <div className="footer-right">
              <div className="footer-social">
                <div className="btn__container social-btn-container" onTouchStart={handleButtonPress}>
                  <a href="https://vk.com/nickvecher#" className="social-btn" target='_blank'>
                    <img src="/images/Telegram App.svg" alt="" className="social-icon" />
                  </a>
                  <div className="social-btn-outline"></div>
                </div>
                
                <div className="btn__container social-btn-container" onTouchStart={handleButtonPress}>
                  <a href="https://vk.com/nickvecher" className="social-btn" target='_blank'>
                    <img src="/images/WhatsApp.svg" alt="" className="social-icon" />
                  </a>
                  <div className="social-btn-outline"></div>
                </div>
                
                <div className="btn__container social-btn-container" onTouchStart={handleButtonPress}>
                  <a href="https://vk.com/nickvecher" className="social-btn" target='_blank'>
                    <img src="/images/VKontakte.svg" alt="" className="social-icon" />
                  </a>
                  <div className="social-btn-outline"></div>
                </div>
                
                <div className="btn__container social-btn-container" onTouchStart={handleButtonPress}>
                  <a href="https://vk.com/nickvecher" className="social-btn" target='_blank'>
                    <img src="/images/social_icon_email.svg" alt="" className="social-icon" />
                  </a>
                  <div className="social-btn-outline"></div>
                </div>
              </div>
              
              <div className="btn__container footer-btn-container" onTouchStart={handleButtonPress}>
                <button onClick={scrollToForm} className="consult-btn footer-btn">Получить консультацию</button>
              </div>
            </div>
          </div>
          
          <div className="footer-copyright">
            <p>2025, Все права защищены</p>
            <a 
                href="https://docs.yandex.ru/docs/view?url=ya-disk-public%3A%2F%2FPl00vkJoKytI2JKXboIEfIWMvRTgl224Ghv8wKzaq1Qc9jl0Eou8ItV3Eeea%2Firhq%2FJ6bpmRyOJonT3VoXnDag%3D%3D&name=Политика%20конфиденциальности%20персональных%20данных.docx" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline' }}
              >
                Политика конфиденциальности
              </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;