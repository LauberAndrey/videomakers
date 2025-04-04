import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import './ArtistsSection.css';

const ArtistsSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="artists-wrapper-img">
      <div className="artists-section-bg">
        <div className="container">
          <h2 className="artists-section-title">
            Почему нас 
            <img className="artists-title-icon" src="/images/why_select_ass.svg" alt="" />
            <br/>
            выбирают 
            <img className="artists-title-icon" src="/images/why_select_as2.svg" alt="" /> 
            артисты?
          </h2>
          
          <div className="artists-cards-container">
            {/* Карточка 1 */}
            <div className="artist-card">
              <div className="artist-card-content">
                <h3 className="artist-card-title">Относимся к музыке<br/>как к бизнесу</h3>
                <img 
                  src="/images/shape1_card_as.svg" 
                  className="artist-card-image" 
                  alt="Иконка бизнеса" 
                />
              </div>
            </div>

            {/* Карточка 2 */}
            <div className="artist-card">
              <div className="artist-card-content">
                <h3 className="artist-card-title">Гарантируем результат<br/>выше стоимости клипа</h3>
                <img 
                  src="/images/shape2_card_as.svg" 
                  className="artist-card-image" 
                  alt="Иконка гарантии" 
                />
              </div>
            </div>

            {/* Карточка 3 */}
            <div className="artist-card">
              <div className="artist-card-content">
                <h3 className="artist-card-title">Работаем даже<br/>с небольшими<br/>для индустрии<br/>бюджетами</h3>
                <img 
                  src="/images/shape3_card_as.svg" 
                  className="artist-card-image" 
                  alt="Иконка бюджета" 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArtistsSection;