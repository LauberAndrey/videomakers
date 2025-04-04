import React from 'react';
import './Footer.css';

const FooterSection = ({ scrollRef }) => {
  const scrollToForm = () => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
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
                <div className="social-btn-container">
                  <a href="#" className="social-btn">
                    <img src="/images/Telegram App.svg" alt="" className="social-icon" />
                  </a>
                  <div className="social-btn-outline"></div>
                </div>
                
                <div className="social-btn-container">
                  <a href="#" className="social-btn">
                    <img src="/images/WhatsApp.svg" alt="" className="social-icon" />
                  </a>
                  <div className="social-btn-outline"></div>
                </div>
                
                <div className="social-btn-container">
                  <a href="#" className="social-btn">
                    <img src="/images/VKontakte.svg" alt="" className="social-icon" />
                  </a>
                  <div className="social-btn-outline"></div>
                </div>
                
                <div className="social-btn-container">
                  <a href="#" className="social-btn">
                    <img src="/images/social_icon_email.svg" alt="" className="social-icon" />
                  </a>
                  <div className="social-btn-outline"></div>
                </div>
              </div>
              
              <div className="btn__container footer-btn-container">
                <button onClick={scrollToForm} className="consult-btn footer-btn">Получить консультацию</button>
              </div>
            </div>
          </div>
          
          <div className="footer-copyright">
            <p>2024, Все права защищены</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;