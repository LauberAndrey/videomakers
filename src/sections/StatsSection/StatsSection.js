import React from 'react'
import './StatsSection.css'

const StatsSection = () => {
	return (
		<section className='wrapper-img stats-section'>
			<div className='stats-container'>
				<div className='stats-content'>
					<div className='stats-numbers'>
						<div className='stats-item'>
							<div className='stats-number' data-count='50'>
								50
							</div>
							<div className='stats-label'>клипов</div>
						</div>

						<div className='stats-item'>
							<div className='stats-number' data-count='1000+'>
								1000+
							</div>
							<div className='stats-label'>проектов</div>
						</div>

						<div className='stats-item'>
							<div className='stats-number'>десятки</div>
							<div className='stats-label'>знаковых артистов</div>
						</div>
					</div>

					<div className='stats-text-block'>
						<p className='stats-description'>Видео, которые</p>
						<strong className='stats-description-strong'>работают</strong>
						<p className='stats-description'>на вашу группу</p>
					</div>

					<div className='stats-decoration stats-ellipse'>
						<img src='/images/ellipse.svg' alt='' aria-hidden='true' />
					</div>
				</div>

				<div className='stats-decoration stats-star'>
					<img src='/images/star.svg' alt='' aria-hidden='true' />
				</div>
			</div>
		</section>
	)
}

export default StatsSection
