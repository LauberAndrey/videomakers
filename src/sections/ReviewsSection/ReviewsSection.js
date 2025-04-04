import React, { useRef, useEffect, useState } from 'react'
import './ReviewsSection.css'

const ReviewsSection = () => {
	const trackRef = useRef(null)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [currentIndex, setCurrentIndex] = useState(0)

	let isDragging = false
	let startPos = 0
	let currentTranslate = 0
	let prevTranslate = 0
	let velocity = 0
	let lastTime = 0
	let lastPos = 0
	let animationFrameId = null

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

	const getSlideWidth = () => {
		if (!trackRef.current) return 0
		return windowWidth < 768
			? trackRef.current.offsetWidth * 0.9 + 17
			: 207 + 17
	}

	const snapToSlide = (targetIndex) => {
		const maxIndex = Math.floor(
			(trackRef.current.scrollWidth - trackRef.current.offsetWidth) /
				getSlideWidth()
		)
		const clampedIndex = Math.max(0, Math.min(targetIndex, maxIndex))

		const targetPosition = -clampedIndex * getSlideWidth()
		const startPosition = currentTranslate
		const distance = targetPosition - startPosition
		const startTime = performance.now()

		const animate = (time) => {
			const elapsed = time - startTime
			const progress = Math.min(elapsed / 600, 1)
			const easedProgress = 0.5 * (1 - Math.cos(Math.PI * progress))

			trackRef.current.style.transform = `translateX(${
				startPosition + distance * easedProgress
			}px)`

			if (progress < 1) {
				animationFrameId = requestAnimationFrame(animate)
			} else {
				setCurrentIndex(clampedIndex)
				prevTranslate = targetPosition
				currentTranslate = targetPosition
			}
		}

		cancelAnimationFrame(animationFrameId)
		animationFrameId = requestAnimationFrame(animate)
	}

	useEffect(() => {
		const track = trackRef.current

		const handleResize = () => {
			setWindowWidth(window.innerWidth)
			snapToSlide(currentIndex)
		}

		const getPositionX = (e) => (e.touches ? e.touches[0].clientX : e.clientX)

		const dragStart = (e) => {
			isDragging = true
			startPos = getPositionX(e)
			track.classList.add('grabbing')
			lastPos = startPos
			lastTime = performance.now()
			velocity = 0
			track.style.transition = 'none'
			cancelAnimationFrame(animationFrameId)
		}

		const drag = (e) => {
			if (!isDragging) return
			const currentPos = getPositionX(e)
			const now = performance.now()
			const deltaTime = now - lastTime

			if (deltaTime > 0) {
				velocity = (currentPos - lastPos) / deltaTime
				lastPos = currentPos
				lastTime = now
			}

			const diff = (currentPos - startPos) * 0.6
			currentTranslate = prevTranslate + diff
			track.style.transform = `translateX(${currentTranslate}px)`
		}

		const dragEnd = () => {
			if (!isDragging) return
			isDragging = false
			track.classList.remove('grabbing')

			const velocityThreshold = 0.3
			const moveThreshold = getSlideWidth() * 0.2

			let targetIndex = currentIndex

			if (Math.abs(velocity) > velocityThreshold) {
				targetIndex += velocity > 0 ? -1 : 1
			} else if (Math.abs(currentTranslate - prevTranslate) > moveThreshold) {
				targetIndex += currentTranslate < prevTranslate ? 1 : -1
			}

			snapToSlide(targetIndex)
		}

		window.addEventListener('resize', handleResize)
		track.addEventListener('mousedown', dragStart)
		track.addEventListener('mousemove', drag)
		track.addEventListener('mouseup', dragEnd)
		track.addEventListener('mouseleave', dragEnd)
		track.addEventListener('touchstart', dragStart)
		track.addEventListener('touchmove', drag)
		track.addEventListener('touchend', dragEnd)

		return () => {
			window.removeEventListener('resize', handleResize)
			track.removeEventListener('mousedown', dragStart)
			track.removeEventListener('mousemove', drag)
			track.removeEventListener('mouseup', dragEnd)
			track.removeEventListener('mouseleave', dragEnd)
			track.removeEventListener('touchstart', dragStart)
			track.removeEventListener('touchmove', drag)
			track.removeEventListener('touchend', dragEnd)
			cancelAnimationFrame(animationFrameId)
		}
	}, [currentIndex, windowWidth])

	return (
		<section className='wrapper-img client-reviews-section'>
			<div className='client-reviews__bg'>
				<div className='container'>
					<h2 className='client-reviews__title'>
						Что говорят
						<img
							className='title_img'
							src='/images/shape__reviews.svg'
							alt=''
						/>
						наши клиенты
					</h2>

					<div className='client-reviews-slider'>
						<div
							className='client-reviews-slides client-reviews-track'
							ref={trackRef}
						>
							{reviews.map((review) => (
								<div
									key={review.id}
									className={`client-review-card-wrapper ${
										[4, 5, 10, 11].includes(review.id) ? 'card-flex-end' : ''
									}`}
								>
									<div className='client-review-number'>
										{review.id.toString().padStart(2, '0')}
									</div>
									<div
										className={`client-review-card ${
											[3, 6, 9, 12].includes(review.id)
												? 'client-review-card-large'
												: 'client-review-card-small'
										}`}
									>
										<div className='client-review-content'>
											<h3 className='client-review-name'>{review.name}</h3>
											<p className='client-review-text'>{review.text}</p>
											{[3, 6, 9, 12].includes(review.id) ? (
												<strong className='client-review-symbol'>///</strong>
											) : (
												<img
													src='/images/arrow.svg'
													alt=''
													className='client-review-arrow'
												/>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{windowWidth < 768 && (
						<div className='mobile-scroll-indicator'>← Прокрутите вбок →</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default ReviewsSection
