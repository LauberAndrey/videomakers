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
      name: 'Мария Биленко',
      role: 'руководитель кавер-группы Bombay',
      text: 'Мы снимаем все большие проекты с Колей и его командой. За эти годы стали одной из лучших групп в России по версии и Wedding Awards, и TOP100. Да, главное — это крутой продукт, но без взаимопонимания с режиссером, без крутого контента это было бы сильно сложнее.',
      photo: '/images/marma.svg'
    },
    {
      id: 2,
      name: 'Женя Малахова',
      role: 'актриса, экс-солистка группы Reflex',
      text: 'Мы снимали клип на очень эмоциональный для меня трек. Уже на съемочной площадке поработали с эмоциями в кадре перед каждым мотором, нашли новые смыслы. Ну и эстетика кадра, всё как надо',
      photo: '/images/malahova.svg'
    },
    {
      id: 3,
      name: 'Владимир Пресняков',
      role: 'певец, музыкант, композитор',
      text: 'Все мои правки и пожелания были услышаны. В части с синхроном понравился визуал, и я решил оставить больше липсинка и вырезать несколько частей клипа. Из особого - съемочные дни подстроили под мой график, минимум времени на площадке.',
      photo: '/images/persikov.svg'
    },
    {
      id: 4,
      name: 'Андрей Филатов',
      role: 'руководитель BSB Production, Music Hunters Band',
      text: 'Надо было срочно снять что-то для запуска нового коллектива с новыми шоу. За пару дней придумали сценарий, арендовали библиотеку и за 6-7 часов отсняли промо. За полгода эту программу купили уже больше 200 раз!',
      photo: '/images/filatov.svg'
    },
    {
      id: 5,
      name: 'DASHAA',
      role: 'певица',
      text: 'Кроме написания и исполнения своих песен я сама клипмейкер. Хотелось снять простой и эффектный клип, но быстро и без больших затрат. На съемочной площадке придумывали новые идеи, обменивались мыслями. В общем, хорошо поработали. Клип взяли на МУЗ-ТВ.',
      photo: '/images/dashaa.svg'
    },
    {
      id: 6,
      name: 'Катя Рикеда',
      role: 'певица',
      text: 'Я очень рада, что удалось поработать с Колей и его командой. Всё было профессионально, хоть и в ограниченном бюджете. Несколько раз вносили правки, в основном по цвету, чтобы было, как я чувствую. В итоге клип попал на МУЗ-ТВ, победил в шоу Муз Раскрутка.',
      photo: '/images/rikeda.svg'
    }
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
    <section className='wrapper-img client-reviews-section' id='reviews'>
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
                        width: isMobile ? '90%' : 440,
                        marginRight: '240px',
                      }}
                    >
                      <div className='client-review-card-wrapper'>
                        <div className='client-review-number'>
                          {review.id.toString().padStart(2, '0')}
                        </div>
                        <div className='client-review-card client-review-card-small'>
                          <div className='client-review-content'>
                            <div className='client-review-header'>
                              <div className="client-review-name-wrapper">
                                <h3 className='client-review-name'>
                                  {review.name}
                                </h3>
                                {review.role && <p className='client-review-role'>{review.role}</p>}
                              </div>
                              {review.photo && (
                                <div className='client-review-photo'>
                                  <img src={review.photo} alt={review.name} />
                                </div>
                              )}
                            </div>
                            <p className='client-review-text'>{review.text}</p>
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
                        width: isMobile ? '90%' : 440,
                        marginRight: '240px',
                      }}
                    >
                      <div className='client-review-card-wrapper'>
                        <div className='client-review-number'>
                          {group[2].id.toString().padStart(2, '0')}
                        </div>
                        <div className='client-review-card client-review-card-large'>
                          <div className='client-review-content'>
                            <div className='client-review-header'>
                              <div className="client-review-name-wrapper">
                                <h3 className='client-review-name'>
                                  {group[2].name}
                                </h3>
                                {group[2].role && <p className='client-review-role'>{group[2].role}</p>}
                              </div>
                              {group[2].photo && (
                                <div className='client-review-photo'>
                                  <img src={group[2].photo} alt={group[2].name} />
                                </div>
                              )}
                            </div>
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
                            width: isMobile ? '90%' : 440,
                            marginRight: '240px',
                          }}
                        >
                          <div className='client-review-card-wrapper card-flex-end'>
                            <div className='client-review-number'>
                              {review.id.toString().padStart(2, '0')}
                            </div>
                            <div className='client-review-card client-review-card-small'>
                              <div className='client-review-content'>
                                <div className='client-review-header'>
                                  <div className="client-review-name-wrapper">
                                    <h3 className='client-review-name'>
                                      {review.name}
                                    </h3>
                                    {review.role && <p className='client-review-role'>{review.role}</p>}
                                  </div>
                                  {review.photo && (
                                    <div className='client-review-photo'>
                                      <img src={review.photo} alt={review.name} />
                                    </div>
                                  )}
                                </div>
                                <p className='client-review-text'>
                                  {review.text}
                                </p>
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