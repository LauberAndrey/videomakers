import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './StarsSlider.css'
import VideoPopup from '../../components/VideoPopup/VideoPopup';

const StarsSlider = () => {
	const [activeSlideIndex, setActiveSlideIndex] = useState(2) // Начальный активный слайд
	const [selectedVideo, setSelectedVideo] = useState(null)
	const [showPopup, setShowPopup] = useState(false)

	const slides = [
		{
			id: 1,
			image: '/images/image89.svg',
			videoSrc: '/video/Music_Hunters_Band.mp4',
			name: 'MUSIC HUNTERS BAND',
			text: 'Реализовали сложный проект со скрытыми смыслами за крайне низкий для такого артиста бюджет',
		},
		{
			id: 2,
			image: 'images/image87.svg',
			videoSrc: '/video/Bombey.mp4',
			name: 'BOMBEY',
			text: 'Реализовали сложный проект со скрытыми смыслами за крайне низкий для такого артиста бюджет',
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
			image: 'images/image91.svg',
			videoSrc: '/video/Циркус.mp4',
			name: 'РИКЕДА',
			text: 'Реализовали сложный проект со скрытыми смыслами за крайне низкий для такого артиста бюджет',
		},
        {
			id: 5,
			image: '/images/image95.svg',
			videoSrc: '/video/Бак_с_бани.mp4',
			name: 'Бак с бани',
			text: 'Реализовали сложный проект со скрытыми смыслами за крайне низкий для такого артиста бюджет',
		},
	]

	const handleSlideClick = (index, videoSrc) => {
		if (index === activeSlideIndex) {
			setSelectedVideo(videoSrc)
			setShowPopup(true)
			document.body.style.overflow = 'hidden'
		}
	}

	const closePopup = () => {
		setShowPopup(false)
		document.body.style.overflow = ''
	}

	return (
		<section className='wrapper-img stars-slider'>
			<div className='container'>
				<Swiper
					effect={'coverflow'}
					grabCursor={true}
					centeredSlides={true}
					slidesPerView={'auto'}
					initialSlide={2}
					onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
					coverflowEffect={{
						rotate: 20, // Уменьшенный наклон
						stretch: -30, // Без сжатия
						depth: 150,
						modifier: 2, // Уменьшенный модификатор
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
							</div>
							<div className='slide__content'>
								<h3 className='slide__name'>{slide.name}</h3>
								<p className='slide__text'>{slide.text}</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Кастомные кнопки навигации */}
				<div className='stars-slider__navigation'>
					<div className='stars-slider__button-prev'>
						<div className='btn__container'>
							<div className='consult-btn'>←</div>
						</div>
					</div>
					<div className='stars-slider__button-next'>
						<div className='btn__container'>
							<div className='consult-btn'>→</div>
						</div>
					</div>
				</div>
				{showPopup && (
				<VideoPopup 
					videoSrc={selectedVideo} 
					onClose={closePopup} 
				/>
        )}
			</div>
		</section>
	)
}

export default StarsSlider
