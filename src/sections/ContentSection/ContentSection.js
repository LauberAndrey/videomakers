import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './ContentSection.css'

const ContentSection = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	const [isMobile, setIsMobile] = useState(false)
	const [swiperInstance, setSwiperInstance] = useState(null)

	const cards = [
		{
			problem: 'Недостаточно просмотров',
			solution: 'Видео, которое увеличивает охваты',
			bgClose: 'bg-card-close1',
			bgOpen: 'bg-card-open1',
		},
		{
			problem: 'Низкая вовлеченность',
			solution: 'Видео, которое увлекает аудиторию',
			bgClose: 'bg-card-close2',
			bgOpen: 'bg-card-open2',
		},
		{
			problem: 'Мало подписчиков',
			solution: 'Видео, которое привлекает новых фанатов',
			bgClose: 'bg-card-close3',
			bgOpen: 'bg-card-open3',
		},
		{
			problem: 'Слабый бренд',
			solution: 'Видео, которое усиливает имидж',
			bgClose: 'bg-card-close4',
			bgOpen: 'bg-card-open4',
		},
		{
			problem: 'Мало концертов',
			solution: 'Видео, которое повышает узнаваемость',
			bgClose: 'bg-card-close5',
			bgOpen: 'bg-card-open5',
		},
	]

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 780)
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const handleSlideChange = (swiper) => {
		setActiveIndex(swiper.activeIndex)
	}

	return (
		<section className='wrapper-img content-section'>
			<div className='content__bg'>
				<div className='content__section'>
					<div className='container content__container'>
						<h2 className='content__title'>
							Ваш контент
							<span className='content__title-icon'>
								<img src='/images/content-text-img.svg' alt='Иконка' />
							</span>
							это ваша популярность
						</h2>
						<p className='content__text'>
							<strong>Мы понимаем</strong> музыкальные бизнес-процессы и{' '}
							<strong>снимаем видео</strong> под ваши цели: охваты,
							популярность, гастроли. <strong>Скажите</strong>, чего хотите
							достичь, а <strong>мы поможем</strong> этого добиться.
						</p>
					</div>

					{isMobile ? (
						<div className='content-mobile-slider-wrapper'>
							<Swiper
								modules={[Navigation, Pagination, FreeMode, Mousewheel]}
								className='content-swiper-container'
								spaceBetween={20}
								slidesPerView='auto'
								centeredSlides={true}
								freeMode={{
									enabled: true,
									sticky: true,
									momentumBounce: false,
								}}
								mousewheel={{
									forceToAxis: true,
									sensitivity: 0.7,
								}}
								resistanceRatio={0}
								onSwiper={setSwiperInstance}
								onSlideChange={handleSlideChange}
								pagination={{
									el: '.content-slider-dots',
									clickable: true,
									bulletClass: 'content-dot',
									bulletActiveClass: 'content-active',
									renderBullet: (_, className) =>
										`<button class="${className}" aria-label="Перейти к слайду"></button>`,
								}}
								breakpoints={{
									320: {
										slidesPerView: 1.1,
										spaceBetween: 15,
										freeMode: { momentumVelocityRatio: 0.5 },
									},
									480: {
										slidesPerView: 1.2,
										freeMode: { momentumVelocityRatio: 0.6 },
									},
									640: {
										slidesPerView: 'auto',
										spaceBetween: 20,
										freeMode: { momentumVelocityRatio: 0.7 },
									},
								}}
							>
								{cards.map((card, index) => (
									<SwiperSlide
										key={index}
										className='content-mobile-slide'
										style={{ width: '320px' }}
									>
										<div
											className={`content-mobile-card ${
												activeIndex === index ? 'content-active' : ''
											}`}
											style={{
												backgroundImage: `url(/images/${card.bgOpen}.svg)`,
											}}
										>
											<div className='content-mobile-card-content'>
												<h3 className='content-card-problem-title'>Проблема</h3>
												<p className='content-card-text'>{card.problem}</p>
												<h3 className='content-card-decision-title'>Решение</h3>
												<p className='content-card-text content-solution'>
													{card.solution}
												</p>
											</div>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
							<div className='content-slider-dots' />
						</div>
					) : (
						<>
							<div className='content__image'>
								<img
									src='/images/content-icon-top.svg'
									alt='Декоративный элемент'
								/>
							</div>

							<div className='content-cards-container'>
								{cards.map((card, index) => (
									<div
										key={index}
										className={`content-card ${
											activeIndex === index ? 'content-active' : ''
										}`}
										onClick={() => setActiveIndex(index)}
									>
										<div
											className='content-card-front'
											style={{
												backgroundImage: `url(/images/${card.bgClose}.svg)`,
											}}
										/>
										<div
											className='content-card-back'
											style={{
												backgroundImage: `url(/images/${card.bgOpen}.svg)`,
											}}
										>
											<div className='content-card-content'>
												<h3 className='content-card-problem-title'>Проблема</h3>
												<p className='content-card-text'>{card.problem}</p>
												<h3 className='content-card-decision-title'>Решение</h3>
												<p className='content-card-text'>{card.solution}</p>
											</div>
										</div>
									</div>
								))}
							</div>

							<div className='content__secondary-image'>
								<img
									src='/images/content-secondary-image.svg'
									alt='Декоративный элемент'
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
