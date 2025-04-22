import React, { useState, useEffect } from 'react';
import './FixedMenu.css';

const FixedMenu = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className='wrapper-img'>
      <header className={`menu ${scrolled ? 'menu--scrolled' : ''}`}>
        <div className='container'>
          <nav className='menu__nav'>
            {/* Телефон - всегда слева */}
            <div className='menu__phone-wrapper'>
              <a href='tel:+79897720272' className='menu__phone-link'>
                <img src="/images/Phone.png" alt="Телефон" className='menu__phone-icon' />
                <span className='menu__phone-number'>+7 (989) 772-02-72</span>
              </a>
            </div>

            {/* Бургер-иконка для мобильных */}
            <button 
              className='menu__burger' 
              onClick={toggleMobileMenu}
              aria-label="Меню"
            >
              <img src="/images/Menu.png" alt="Меню" />
            </button>

            {/* Основное меню */}
            <ul className={`menu__list ${mobileMenuOpen ? 'menu__list--open' : ''}`}>
              <li className='menu__item'>
                <a href='#header' className='menu__link' onClick={() => setMobileMenuOpen(false)}>
                  Главная
                </a>
              </li>
              <li className='menu__item'>
                <a href='#stars-slider' className='menu__link' onClick={() => setMobileMenuOpen(false)}>
                  Портфолио
                </a>
              </li>
              <li className='menu__item'>
                <a href='#team-section' className='menu__link' onClick={() => setMobileMenuOpen(false)}>
                  Команда
                </a>
              </li>
              <li className='menu__item'>
                <a href='#reviews' className='menu__link' onClick={() => setMobileMenuOpen(false)}>
                  Отзывы
                </a>
              </li>
              <li className='menu__item'>
                <a href='#consultation-form' className='menu__link' onClick={() => setMobileMenuOpen(false)}>
                  Контакты
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default FixedMenu;