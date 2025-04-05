import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import './ReviewsSection.css'

const ReviewsSection = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
	const reviews = [
		{
			id: 1,
			name: 'Сергей',
			text: 'Долго искали команду для создания корпоративного видеоклипа и наконец нашли! Ребята учли все наши пожелания и предложили другие интересные решения',
		},
		{
			id: 2,
			name: 'Аня',
			text: 'Сотрудничество с этой компанией превзошло все мои ожидания! Команда профессионалов быстро поняла наши идеи и реализовала их на высоком уровне',
		},
		{
			id: 3,
			name: 'Макс',
			text: 'Обращались к ребятам для создания рекламного видеоклипа. Работа была выполнена в срок, результат нас поразил! Великолепные кадры, отличный звук, яркие спецэффекты. Спасибо вам за качественный подход!',
		},
		{
			id: 4,
			name: 'Игорь',
			text: 'Ребята подошли к процессу с творческим настроем и предложили много интересных идей. Итоговое видео получилось просто шикарным!',
		},
		{
			id: 5,
			name: 'Екатерина',
			text: 'Работа была настоящим удовольствием! Команда профессионалов, которые заботятся о клиентах и их идеях. Видеоклип получился ярким',
		},
		{
			id: 6,
			name: 'Дмитрий',
			text: 'Работали над съемкой видеопрезентации. Остался очень доволен! Быстрая обратная связь, креативный подход, и, что немаловажно, адекватная цена.',
		},
		{
			id: 7,
			name: 'Сергей',
			text: 'Долго искали команду для создания корпоративного видеоклипа и наконец нашли! Ребята учли все наши пожелания и предложили другие интересные решения',
		},
		{
			id: 8,
			name: 'Аня',
			text: 'Сотрудничество с этой компанией превзошло все мои ожидания! Команда профессионалов быстро поняла наши идеи и реализовала их на высоком уровне',
		},
		{
			id: 9,
			name: 'Макс',
			text: 'Обращались к ребятам для создания рекламного видеоклипа. Работа была выполнена в срок, результат нас поразил! Великолепные кадры, отличный звук, яркие спецэффекты. Спасибо вам за качественный подход!',
		},
		{
			id: 10,
			name: 'Игорь',
			text: 'Ребята подошли к процессу с творческим настроем и предложили много интересных идей. Итоговое видео получилось просто шикарным!',
		},
		{
			id: 11,
			name: 'Екатерина',
			text: 'Работа была настоящим удовольствием! Команда профессионалов, которые заботятся о клиентах и их идеях. Видеоклип получился ярким',
		},
		{
			id: 12,
			name: 'Дмитрий',
			text: 'Работали над съемкой видеопрезентации. Остался очень доволен! Быстрая обратная связь, креативный подход, и, что немаловажно, адекватная цена.',
		},
	]

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const groupReviews = () => {
		const groups = []
		for (let i = 0; i < reviews.length; i += 5) {
			const group = [
				reviews[i],
				reviews[i + 1],
				reviews[i + 2],
				reviews[i + 3],
				reviews[i + 4],
			].filter(Boolean)
			groups.push(group)
		}
		return groups
	}

	return (
		<section className='wrapper-img client-reviews-section'>
			<div className='client-reviews-bg'>
				<div className='client-reviews-container'>
					<h2 className='client-reviews-title'>
						Что говорят <img
							className='client-reviews-title-img'
							src='/images/shape__reviews.svg'
							alt=''
						/> наши клиенты
					</h2>

					<div className='client-reviews-slider'>
						<Swiper
							modules={[FreeMode, Mousewheel]}
							spaceBetween={17}
							slidesPerView='auto'
							freeMode={{
								enabled: true,
								sticky: true,
								momentumBounce: false,
							}}
							mousewheel={{ forceToAxis: true }}
							className='client-reviews-track'
							resistanceRatio={0}
						>
							{groupReviews().map((group, groupIndex) => (
								<React.Fragment key={groupIndex}>
									{/* Первые две маленькие карточки */}
									{group.slice(0, 2).map((review) => (
										<SwiperSlide
											key={review.id}
											style={{
												width: isMobile ? '90%' : 207,
												marginRight: '17px',
											}}
										>
											<div className='client-review-card-wrapper'>
												<div className='client-review-number'>
													{review.id.toString().padStart(2, '0')}
												</div>
												<div className='client-review-card client-review-card-small'>
													<div className='client-review-content'>
														<h3 className='client-review-name'>
															{review.name}
														</h3>
														<p className='client-review-text'>{review.text}</p>
														<img
															src='/images/arrow.svg'
															alt=''
															className='client-review-arrow'
														/>
													</div>
												</div>
											</div>
										</SwiperSlide>
									))}

									{/* Большая карточка */}
									{group[2] && (
										<SwiperSlide
											key={group[2].id}
											style={{
												width: isMobile ? '90%' : 321,
												marginRight: '17px',
											}}
										>
											<div className='client-review-card-wrapper'>
												<div className='client-review-number'>
													{group[2].id.toString().padStart(2, '0')}
												</div>
												<div className='client-review-card client-review-card-large'>
													<div className='client-review-content'>
														<h3 className='client-review-name'>
															{group[2].name}
														</h3>
														<p className='client-review-text'>
															{group[2].text}
														</p>
														<strong className='client-review-symbol'>
															///
														</strong>
													</div>
												</div>
											</div>
										</SwiperSlide>
									)}

									{/* Последние две маленькие */}
									{group.slice(3, 5).map(
										(review) =>
											review && (
												<SwiperSlide
													key={review.id}
													style={{
														width: isMobile ? '90%' : 207,
														marginRight: '17px',
													}}
												>
													<div className='client-review-card-wrapper card-flex-end'>
														<div className='client-review-number'>
															{review.id.toString().padStart(2, '0')}
														</div>
														<div className='client-review-card client-review-card-small'>
															<div className='client-review-content'>
																<h3 className='client-review-name'>
																	{review.name}
																</h3>
																<p className='client-review-text'>
																	{review.text}
																</p>
																<img
																	src='/images/arrow.svg'
																	alt=''
																	className='client-review-arrow'
																/>
															</div>
														</div>
													</div>
												</SwiperSlide>
											)
									)}
								</React.Fragment>
							))}
						</Swiper>
					</div>

					{isMobile && (
						<div className='client-reviews-mobile-scroll'>
							← Прокрутите вбок →
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default ReviewsSection