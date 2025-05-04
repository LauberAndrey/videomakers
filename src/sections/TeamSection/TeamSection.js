import React, { useState, useRef, useEffect } from 'react'
import './TeamSection.css'

const TeamSection = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	const cardRefs = useRef([])
	const [heights, setHeights] = useState([])

	const teamMembers = [
		{
			name: 'Николай Вечерский',
			role: 'Генеральный продюсер и режиссер',
			description:
				'11 лет в съемках клипов, работы в ротации МУЗ ТВ, BBC, промо для групп неоднократно побеждают на WA и TOP100AWARDS. Работал со многими артистами: Киркоров, Кобзон, Пресняков, Павлиашвили, Малахова и др',
			photo: '/images/Николай Вечерский.jpg',
		},
		{
			name: 'Игорь Галюк',
			role: 'Продюсер, режиссер и оператор-постановщик',
			description:
				'14 лет в видеоиндустрии и с 2019 года — с фокусом на музыкальные проекты. Работал с Слот, Грот, Рэм Дигга, Animal ДжаZ, Дельфин и др. Изготавливал медиаконтент для фестиваля «Тамань – полуостров свободы», а также сам был вовлечен в организацию концертов и фестивалей. Спокоен в хаосе, решает задачи до того, как они станут проблемами',
			photo: '/images/Игорь-Галюк.jpg',
		},
		{
			name: 'Константин Заболотный',
			role: 'Продюсер, режиссер и оператор-постановщик',
			description:
				'7 лет в видео продакшне, проекты для Лэтуаль, Т - банк, Столото, ВТБ, Московского Музея Дизайна, Академии Игоря Крутого. А также многочисленные Ютуб-проекты, в том числе Реалити-Шоу',
			photo: '/images/Константин Заболотный.jpg',
		},
		{
			name: 'Александр Акифьев',
			role: 'Художник по сценическому свету',
			description:
				'15 лет в деле. Светил концерты половины российского шоубиза. Резидент самого большого концертного зала юга - Геленджик Арены',
			photo: '/images/Александр Акифьев.jpg',
		},
		{
			name: 'Мария Фестовец',
			role: 'Художник-постановщик',
			description: 'Разорвёт в клочья ваше воображение сохранив бюджет',
			photo: '/images/Мария Фестовец.jpg',
		},
		{
			name: 'Екатерина Вечерская',
			role: 'Шеф - фотограф',
			description:
				'Тысячи муд бордов, сотни афиш для артистов и цензура всех проектов по цвету',
			photo: '/images/Екатерина Вечерская.jpg',
		},
	]

	useEffect(() => {
		const updateHeights = () => {
			const newHeights = cardRefs.current.map((ref) => {
				if (!ref) return { collapsed: 120, expanded: 355 }
				const content = ref.querySelector('.card-content')
				return {
					collapsed: 120,
					expanded: content.scrollHeight + 40,
				}
			})
			setHeights(newHeights)
		}

		updateHeights()
		window.addEventListener('resize', updateHeights)
		return () => window.removeEventListener('resize', updateHeights)
	}, [])

	return (
		<section className='wrapper-img team-section' id='team-section'>
			<img
				src='/images/teamicon1.svg'
				className='team-decor-icon top-icon'
				alt=''
			/>
			<img
				src='/images/teamicon2.svg'
				className='team-decor-icon bottom-icon'
				alt=''
			/>
			<img
				src='/images/touch.png'
				className='team-decor-icon center-icon'
				alt=''
			/>

			<div className='container'>
				<h2 className='team-title'>Наша команда</h2>

				<div className='team-column'>
					{teamMembers.map((member, index) => {
						const currentHeight =
							activeIndex === index
								? heights[index]?.expanded || 355
								: heights[index]?.collapsed || 120

						return (
							<div
								ref={(el) => (cardRefs.current[index] = el)}
								className={`team-card ${activeIndex === index ? 'active' : ''}`}
								key={index}
								onClick={() => setActiveIndex(index)}
								style={{
									height: `${currentHeight}px`,
									marginBottom: '20px',
								}}
							>
								<div className='card-content'>
									<div className='photo-placeholder'>
										<img src={member.photo} alt={member.name} />
									</div>

									<div className='text-content'>
										<div className='text-content__head'>
											<h3 className='member-name'>{member.name}</h3>
											<p className='member-role'>{member.role}</p>
										</div>
										<div
											className={`member-description ${
												activeIndex === index ? 'visible' : ''
											}`}
										>
											{member.description}
										</div>
									</div>
								</div>
								<div className='separator-line' />
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default TeamSection