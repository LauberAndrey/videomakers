import React, { useState, useRef, useEffect } from 'react'
import './ContentSection.css'

const ContentSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const sliderRef = useRef(null)
    const startX = useRef(0)
    const currentX = useRef(0)
    const isDragging = useRef(false)
    const sliderWidth = useRef(0)

    const cards = [
        {
            problem: 'Недостаточно просмотров',
            solution: 'Видео, которое увеличивает охваты',
            bgClose: 'bg-card-close1',
            bgOpen: 'bg-card-open1'
        },
        {
            problem: 'Низкая вовлеченность',
            solution: 'Видео, которое увлекает аудиторию',
            bgClose: 'bg-card-close2',
            bgOpen: 'bg-card-open2'
        },
        {
            problem: 'Мало подписчиков',
            solution: 'Видео, которое привлекает новых фанатов',
            bgClose: 'bg-card-close3',
            bgOpen: 'bg-card-open3'
        },
        {
            problem: 'Слабый бренд',
            solution: 'Видео, которое усиливает имидж',
            bgClose: 'bg-card-close4',
            bgOpen: 'bg-card-open4'
        },
        {
            problem: 'Мало концертов',
            solution: 'Видео, которое повышает узнаваемость',
            bgClose: 'bg-card-close5',
            bgOpen: 'bg-card-open5'
        }
    ]

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 780
            setIsMobile(mobile)
            if (mobile && sliderRef.current) {
                sliderWidth.current = sliderRef.current.scrollWidth - sliderRef.current.offsetWidth
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleTouchStart = e => {
        startX.current = e.touches[0].clientX
        currentX.current = getTranslateX()
        isDragging.current = true
        sliderRef.current.style.transition = 'none'
    }

    const handleTouchMove = e => {
        if (!isDragging.current) return
        
        const touchX = e.touches[0].clientX
        const diff = touchX - startX.current
        const newTranslate = currentX.current + diff
        
        const maxTranslate = 0
        const minTranslate = -sliderWidth.current
        const boundedTranslate = Math.max(minTranslate, Math.min(maxTranslate, newTranslate))
        
        sliderRef.current.style.transform = `translateX(${boundedTranslate}px)`
    }

    const handleTouchEnd = () => {
        if (!isDragging.current) return
        isDragging.current = false

        const cardWidth = sliderRef.current.children[0]?.offsetWidth + 16
        const currentTranslate = getTranslateX()
        const newIndex = Math.round(-currentTranslate / cardWidth)
        goToSlide(Math.min(Math.max(newIndex, 0), cards.length - 1))
    }

    const getTranslateX = () => {
        if (!sliderRef.current) return 0
        const style = window.getComputedStyle(sliderRef.current)
        const matrix = new DOMMatrixReadOnly(style.transform)
        return matrix.m41
    }

    const goToSlide = index => {
        setActiveIndex(index)
        const cardWidth = sliderRef.current.children[0]?.offsetWidth + 16
        const offset = -index * cardWidth
        
        sliderRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        sliderRef.current.style.transform = `translateX(${offset}px)`
    }

    return (
        <section className="wrapper-img content-section">
            <div className="content__bg">
                <div className="content__section">
                    <div className="container content__container">
                        <h2 className="content__title">
                            Ваш контент
                            <span className="content__title-icon">
                                <img src="/images/content-text-img.svg" alt="Иконка" />
                            </span>
                            это
                            
                            ваша популярность
                        </h2>
                        <p className="content__text">
                            <strong>Мы понимаем</strong> музыкальные бизнес-процессы и{' '}
                            <strong>снимаем видео</strong> под ваши цели: охваты,
                            
                            популярность, гастроли. <strong>Скажите</strong>, чего хотите
                            достичь, а <strong>мы поможем</strong> этого добиться.
                        </p>
                    </div>

                    {isMobile ? (
                        <div className="mobile-slider-wrapper">
                            <div
                                className="mobile-slider-container"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div ref={sliderRef} className="mobile-slider-track">
                                    {cards.map((card, index) => (
                                        <div 
                                            key={index}
                                            className={`mobile-card ${activeIndex === index ? 'active' : ''}`}
                                            style={{ 
                                                backgroundImage: `url(/images/${card.bgOpen}.svg)`
                                            }}
                                        >
                                            <div className="mobile-card-content">
                                                <h3 className="card-problem-title">Проблема</h3>
                                                <p className="card-text">{card.problem}</p>
                                                <h3 className="card-decision-title">Решение</h3>
                                                <p className="card-text solution">{card.solution}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="slider-dots">
                                {cards.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`dot ${index === activeIndex ? 'active' : ''}`}
                                        onClick={() => goToSlide(index)}
                                        aria-label={`Перейти к слайду ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="content__image">
                                <img
                                    src="/images/content-icon-top.svg"
                                    alt="Декоративный элемент"
                                />
                            </div>

                            <div className="cards-container">
                                {cards.map((card, index) => (
                                    <div
                                        key={index}
                                        className={`card ${activeIndex === index ? 'active' : ''}`}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        <div
                                            className="card-front"
                                            style={{ backgroundImage: `url(/images/${card.bgClose}.svg)` }}
                                        />
                                        <div
                                            className="card-back"
                                            style={{ backgroundImage: `url(/images/${card.bgOpen}.svg)` }}
                                        >
                                            <div className="card-content">
                                                <h3 className="card-problem-title">Проблема</h3>
                                                <p className="card-text">{card.problem}</p>
                                                <h3 className="card-decision-title">Решение</h3>
                                                <p className="card-text">{card.solution}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="content__secondary-image">
                                <img
                                    src="/images/content-secondary-image.svg"
                                    alt="Декоративный элемент"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ContentSection