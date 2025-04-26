import React from 'react';
import './StagesSection.css';

const StagesSection = () => {
    const stages = [
        {
            number: '1',
            title: 'Заявка',
            text: 'Пишите нам на сайте или в мессенджере',
            image: '/images/stage1.svg'
        },
        {
            number: '2',
            title: 'Созвоны / переписка',
            text: 'Уточняем идею, референсы, задачи',
            image: '/images/stage2.svg'
        },
        {
            number: '3',
            title: 'Идеи и концепт',
            text: 'Присылаем вам творческие концепты, визуальный стиль и подачу',
            image: '/images/stage3.svg'
        },
        {
            number: '4',
            title: 'Смета и тритиент',
            text: 'Согласовываем бюджет и прорабатываем выбранную идею',
            image: '/images/stage4.svg'
        },
        {
            number: '5',
            title: 'Договор',
            text: 'Фиксируем условия, бронируем дату съёмки',
            image: '/images/stage5.svg'
        },
        {
            number: '6',
            title: 'Съёмка',
            text: 'Организованная, комфортная и креативная работа на площадке',
            image: '/images/stage6.svg'
        },
        {
            number: '7',
            title: 'Черновой монтаж',
            text: 'Первый вариант — на согласование ритма и атмосферы',
            image: '/images/stage7.svg'
        },
        {
            number: '8',
            title: 'Финальный монтаж',
            text: 'Цветокоррекция, графика, ретушь — доводим клип до идеала',
            image: '/images/stage8.svg'
        },
        {
            number: '9',
            title: 'Готовый клип',
            text: 'Вы получаете файл в нужных форматах для соцсетей, интернет-платформ и ТВ',
            image: '/images/stage9.svg'
        }
    ];

    return (
        <section className='wrapper-img stages-section' id='stages-section'>
            {/* Декоративный элемент */}
            <div className='stages-decor'>
                <img 
                    src='/images/stage_decor.svg' 
                    alt='' 
                    className='decor-line'
                />
            </div>
            <div className='container'>
                <h2 className='stages-title'>
                    Этапы{' '}
                    <img 
                        className='stages-title-img' 
                        src='/images/shape_state.svg' 
                        alt='' 
                    />{' '}
                    работы
                </h2>

                <div className='stages-list'>
                    {stages.map((stage, index) => (
                        <div 
                            className={`stage-item ${index % 2 === 0 ? 'left' : 'right'}`} 
                            key={index}
                        >
                            <div className='stage-image'>
                                <img 
                                    src={stage.image} 
                                    alt={stage.title} 
                                    className='stage-icon'
                                />
                            </div>
                            <div className='stage-content'>
                                <div className='stage-header'>
                                    <span className='stage-number'>{stage.number} / {stage.title}</span>
                                </div>
                                <p className='stage-text'>{stage.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StagesSection;