import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './StarsSlider.css';
import VideoPopup from '../../components/VideoPopup/VideoPopup';

const StarsSlider = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(2);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const slides = [
        {
            id: 1,
            image: '/images/image89.jpg',
            videoSrc: '/video/Music_Hunters_Band.mp4',
            name: 'MUSIC HUNTERS BAND',
            text: 'Первое видео — и гастроли по стране',
        },
        {
            id: 2,
            image: 'images/image87.svg',
            videoSrc: '/video/Bombey.mp4',
            name: 'BOMBEY',
            text: '3.5 миллиона просмотров, новый стандарт для  индустрии',
        },
        {
            id: 3,
            image: 'images/image93.svg',
            videoSrc: '/video/Пресняков.mp4',
            name: 'Владимир Пресняков',
            text: 'Реализовали сложный проект со скрытыми смыслами за крайне низкий для такого артиста бюджет',
        },
        {
            id: 4,
            image: 'images/image97.svg',
            videoSrc: '/video/Циркус.mov',
            name: 'Циркус',
            text: 'Реклама своего цирка',
        },
        {
            id: 5,
            image: '/images/image95.svg',
            videoSrc: '/video/Бак_с_бани.mp4',
            name: 'Бак с бани',
            text: 'Старая и добрая - классика',
        },
        {
            id: 6,
            image: '/images/image91.svg',
            videoSrc: '/video/Рикеда.mov',
            name: 'Рикеда',
            text: 'Клип, попавший на МузТВ и впечатливший лейблы',
        },
        {
            id: 7,
            image: '/images/image110.svg',
            videoSrc: '/video/daasha.mov',
            name: 'DAASHA',
            text: 'ТЕКСТ',
        },
        {
            id: 8,
            image: '/images/image103.svg',
            videoSrc: '/video/Малахова.mp4',
            name: 'Женя Малахова',
            text: 'ТЕКСТ',
        },
        {
            id: 9,
            image: '/images/image104.svg',
            videoSrc: '/video/Лина.mp4',
            name: 'Лиана Артемова',
            text: 'ТЕКСТ',
        }
    ];

    const handleSlideClick = (index, videoSrc) => {
        if (index === activeSlideIndex) {
            setSelectedVideo(videoSrc);
            setShowPopup(true);
            document.body.style.overflow = 'hidden';
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        document.body.style.overflow = '';
    };

    const handleTouchButton = (e) => {
        if (!isTouchDevice) return;
        
        const btnContainer = e.currentTarget;
        
        // Принудительный рефлоу для запуска анимации
        void btnContainer.offsetWidth;
        
        btnContainer.classList.add('active');
        
        setTimeout(() => {
            btnContainer.classList.remove('active');
            // Двойной рефлоу для гарантированного сброса
            void btnContainer.offsetWidth;
            void btnContainer.offsetWidth;
        }, 300);
    };

    return (
        <section className='wrapper-img stars-slider'>
            <div className='container'>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={true}
                    initialSlide={2}
                    onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
                    coverflowEffect={{
                        rotate: 20,
                        stretch: -30,
                        depth: 150,
                        modifier: 2,
                        slideShadows: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={{
                        nextEl: '.stars-slider__button-next',
                        prevEl: '.stars-slider__button-prev',
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className='stars-slider__swiper'
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide
                            key={slide.id}
                            className='stars-slider__slide'
                            onClick={() => handleSlideClick(index, slide.videoSrc)}
                        >
                            <div className='slide__image-wrapper'>
                                <img
                                    src={slide.image}
                                    alt={slide.name}
                                    className='slide__image'
                                />
                                <div className="slide__play-button">
                                    <img 
                                        src='/images/play-text-btn.svg'
                                        className='stars-section-play-icon'
                                        alt='Кнопка воспроизведения'
                                    />
                                </div>
                            </div>
                            <div className='slide__content'>
                                <h3 className='slide__name'>{slide.name}</h3>
                                <p className='slide__text'>{slide.text}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className='stars-slider__navigation'>
                    <div className='stars-slider__button-prev'>
                        <div 
                            className='btn__container'
                            onTouchStart={isTouchDevice ? handleTouchButton : undefined}
                        >
                            <div className='consult-btn'>←</div>
                        </div>
                    </div>
                    <div className='stars-slider__button-next'>
                        <div 
                            className='btn__container'
                            onTouchStart={isTouchDevice ? handleTouchButton : undefined}
                        >
                            <div className='consult-btn'>→</div>
                        </div>
                    </div>
                </div>
                
                {showPopup && <VideoPopup videoSrc={selectedVideo} onClose={closePopup} />}
            </div>
        </section>
    );
};

export default StarsSlider;