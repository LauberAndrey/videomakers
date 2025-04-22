import React from 'react'
import './StatsSection.css'

const StatsSection = () => {
	return (
		<section className='wrapper-img stats-section'>
			<div className='stats-container'>
				<div className='stats-content'>
					<div className='stats-text-block'>
						<h2 className='stats-title'>
							Видео, которые <span className='stats-highlight'>работают</span>
							<br />
							на вашу группу
						</h2>
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
