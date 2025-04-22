import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './ContentSection.css'

const ContentSection = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 780)

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 780px)')
		const handleChange = (e) => setIsMobile(e.matches)

		mediaQuery.addEventListener('change', handleChange)
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [])

	const cards = useMemo(() => [
		{
			problem: 'Комплексный подход',
			solution: 'С каждой съемки - не только клип, но и вертикальный контент, бэкстейдж, фото для афиши, рилсы - всё включено в большинстве проектов',
			bgClose: 'bg-card-close1',
		},
		{
			problem: 'Топ-контент',
			solution: 'Не хуже, чем у метров индустрии, но экономнее',
			bgClose: 'bg-card-close2',
		},
		{
			problem: 'Мало подписчиков',
			solution: 'Видео, которое привлекает новых фанатов',
			bgClose: 'bg-card-close3',
		},
		{
			problem: 'Точно в цель',
			solution: 'Вникаем в целевую аудиторию, анализируем треки и выжимаем максимум результата из бюджета',
			bgClose: 'bg-card-close4',
		},
		{
			problem: 'Разумная цена',
			solution: 'Большой опыт, но мы ещё не успели охренеть',
			bgClose: 'bg-card-close5',
		},
	], [])

	const handleSlideChange = useCallback((swiper) => {
		setActiveIndex(swiper.activeIndex)
	}, [])

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
							<strong>снимаем видео</strong> под ваши цели: охваты, популярность, гастроли.{' '}
							<strong>Скажите</strong>, чего хотите достичь, а <strong>мы поможем</strong> этого добиться.
						</p>
					</div>

					{isMobile ? (
						<div className='content-mobile-slider-wrapper'>
							<Swiper
								modules={[Navigation, Pagination, FreeMode, Mousewheel]}
								className='content-swiper-container'
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={20}
								freeMode={{ enabled: true, sticky: true }}
								mousewheel={{ forceToAxis: true, sensitivity: 0.6 }}
								resistanceRatio={0}
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
									},
									480: {
										slidesPerView: 1.2,
									},
									640: {
										slidesPerView: 'auto',
										spaceBetween: 20,
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
											className={`content-mobile-card ${activeIndex === index ? 'content-active' : ''}`}
											style={{ backgroundImage: 'url(/images/bg-card-open.jpg)' }}
										>
											<div className='content-mobile-card-content'>
												{/* <h3 className='content-card-problem-title'>Проблема</h3> */}
												<p className='content-card-text'>{card.problem}</p>
												{/* <h3 className='content-card-decision-title'>Решение</h3> */}
												<p className='content-card-text content-solution'>{card.solution}</p>
											</div>
											<span className='content-card-count'>{`0${index + 1}`}</span>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
							<div className='content-slider-dots' />
						</div>
					) : (
						<>
							<div className='content__image'>
								<img src='/images/content-icon-top.svg' alt='Декоративный элемент' />
							</div>

							<div className='content-cards-container'>
								{cards.map((card, index) => (
									<div
										key={index}
										className={`content-card ${activeIndex === index ? 'content-active' : ''}`}
										onClick={() => setActiveIndex(index)}
									>
										<div
											className='content-card-front'
											style={{ backgroundImage: `url(/images/${card.bgClose}.jpg)` }}
										/>
										<div
											className='content-card-back'
											style={{ backgroundImage: 'url(/images/bg-card-open.jpg)' }}
										>
											<div className='content-card-content'>
												{/* <h3 className='content-card-problem-title'>Проблема</h3> */}
												<p className='content-card-text'>{card.problem}</p>
												{/* <h3 className='content-card-decision-title'>Решение</h3> */}
												<p className='content-card-text content-solution'>{card.solution}</p>
											</div>
											<span className='content-card-count'>{`0${index + 1}`}</span>
										</div>
									</div>
								))}
							</div>

							<div className='content__secondary-image'>
								<img src='/images/content-secondary-image.svg' alt='Декоративный элемент' />
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	)
}

export default ContentSection
