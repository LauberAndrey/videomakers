import React, { forwardRef, useState, useRef } from 'react'
import './FormSection.css'

const FormSection = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        artist: '',
        description: ''
    })
    const [isAgreed, setIsAgreed] = useState(false)

    const phoneRef = useRef(null)

    const formatPhone = (value) => {
        const numbers = value.replace(/\D/g, '')
        let formattedValue = ''

        if (numbers.length > 0) formattedValue += `(${numbers.substring(0, 3)}`
        if (numbers.length > 3) formattedValue += `) ${numbers.substring(3, 6)}`
        if (numbers.length > 6) formattedValue += `-${numbers.substring(6, 8)}`
        if (numbers.length > 8) formattedValue += `-${numbers.substring(8, 10)}`

        return formattedValue
    }

    const handlePhoneChange = (e) => {
        const input = e.target.value
        const cursorPos = e.target.selectionStart
        const digitsBeforeCursor = input.substring(0, cursorPos).replace(/\D/g, '').length

        const formatted = formatPhone(input.replace(/\D/g, ''))
        setFormData(prev => ({...prev, phone: formatted}))

        setTimeout(() => {
            if (phoneRef.current) {
                let newCursorPos = 0
                let digitCount = 0

                for (let i = 0; i < formatted.length; i++) {
                    if (/\d/.test(formatted[i])) digitCount++
                    if (digitCount === digitsBeforeCursor) {
                        newCursorPos = i + 1
                        break
                    }
                }

                if (digitsBeforeCursor >= input.replace(/\D/g, '').length) {
                    newCursorPos = formatted.length
                }

                phoneRef.current.setSelectionRange(newCursorPos, newCursorPos)
            }
        }, 0)
    }

    const handlePhoneKeyDown = (e) => {
        if (e.key === 'Backspace') {
            const cursorPos = e.target.selectionStart
            const value = e.target.value

            if (cursorPos > 0 && !/\d/.test(value[cursorPos - 1])) {
                e.preventDefault()
                let newCursorPos = cursorPos - 1
                while (newCursorPos > 0 && !/\d/.test(value[newCursorPos - 1])) {
                    newCursorPos--
                }

                const newValue = value.substring(0, newCursorPos - 1) + value.substring(newCursorPos)
                setFormData(prev => ({...prev, phone: formatPhone(newValue.replace(/\D/g, ''))}))

                setTimeout(() => {
                    if (phoneRef.current) {
                        phoneRef.current.setSelectionRange(newCursorPos - 1, newCursorPos - 1)
                    }
                }, 0)
            }
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!isAgreed) {
            alert('Пожалуйста, дайте согласие на обработку персональных данных')
            return
        }
        
        const cleanPhone = formData.phone.replace(/\D/g, '')
        const dataToSend = {
            ...formData,
            phone: cleanPhone ? `7${cleanPhone}` : ''
        }
        
        console.log('Form data:', dataToSend)
        
        await sendMessageToTelegram(
            `Новая заявка с сайта!\n
            Имя: ${dataToSend.name}\n
            Телефон: ${dataToSend.phone}\n
            Описание: ${dataToSend.description}\n
            Группа/артист: ${dataToSend.artist}`
        )

        setFormData({
            name: '',
            phone: '',
            artist: '',
            description: ''
        })
        setIsAgreed(false)
    }

    const sendMessageToTelegram = async (text) => {
        const chatId = 761929046;
        const url = `https://api.telegram.org/bot7634072014:AAFx8TWuw4vkQoSe66bpmrnfAbeYe8HqlDs/sendMessage`;
        const message = {
            chat_id: chatId,
            text: text,
        };

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
            const data = await res.json();
        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
        }
    };

    const handleButtonPress = (e) => {
        if (window.innerWidth >= 768) return;
        
        const btnContainer = e.currentTarget.closest('.btn__container')
        if (btnContainer) {
            btnContainer.classList.add('active')
            setTimeout(() => {
                btnContainer.classList.remove('active')
            }, 300)
        }
    }

    return (
        <section id='consultation-form' className='wrapper-img discuss-form-section' ref={ref}>
            <div className='discuss-form-bg'>
                <div className='container discussc-ontainer'>
                    <div className='discuss-form-wrapper'>
                        <form className='discuss-form' onSubmit={handleSubmit}>
                            <h2 className='discuss-form-title'>
                                Давайте обсудим <br />
                                ваш клип
                            </h2>

                            <div className='form-row'>
                                <label className='input-label'>
                                    <input
                                        type='text'
                                        name='name'
                                        className='form-input'
                                        placeholder='Имя'
                                        pattern='[A-Za-zА-Яа-яЁё\s]+'
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                            </div>

                            <div className='form-row'>
                                <label className='input-label'>
                                    <div className='phone-input-container' style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #010101',
                                        borderRadius: '8px',
                                        backgroundColor: 'transparent',
                                        padding: '0 20px',
                                    }}>
                                        <span style={{
                                            marginRight: '8px',
                                            fontSize: '14px',
                                            fontFamily: 'Steppe',
                                            color: '#000',
                                        }}>
                                            +7
                                        </span>
                                        <input
                                            type='tel'
                                            name='phone'
                                            ref={phoneRef}
                                            className='form-input'
                                            style={{
                                                border: 'none',
                                                padding: '15px 0',
                                                flex: 1,
                                                background: 'transparent',
                                                outline: 'none',
                                            }}
                                            value={formData.phone}
                                            onChange={handlePhoneChange}
                                            onKeyDown={handlePhoneKeyDown}
                                            placeholder='(999) 999-99-99'
                                            maxLength={18}
                                            required
                                        />
                                    </div>
                                </label>
                            </div>

                            <div className='form-row'>
                                <label className='input-label'>
                                    <input
                                        type='text'
                                        name='artist'
                                        className='form-input'
                                        placeholder='Группа/артист'
                                        value={formData.artist}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>

                            <div className='form-row'>
                                <label className='input-label'>
                                    <textarea
                                        name='description'
                                        className='form-textarea'
                                        placeholder='Краткое описание запроса'
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </label>
                            </div>

                            <div className='form-row'>
                                <label className='checkbox-label' style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type='checkbox'
                                        checked={isAgreed}
                                        onChange={(e) => setIsAgreed(e.target.checked)}
                                        required
                                        style={{ marginRight: '10px' }}
                                    />
                                    <span>
                                        Я даю согласие на обработку персональных данных в соответствии с{' '}
                                        <a 
                                            href="https://docs.yandex.ru/docs/view?url=ya-disk-public%3A%2F%2FPl00vkJoKytI2JKXboIEfIWMvRTgl224Ghv8wKzaq1Qc9jl0Eou8ItV3Eeea%2Firhq%2FJ6bpmRyOJonT3VoXnDag%3D%3D&name=Политика%20конфиденциальности%20персональных%20данных.docx" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'underline' }}
                                        >
                                            Политикой конфиденциальности
                                        </a>
                                    </span>
                                </label>
                            </div>

                            <div className='btn__container form-btn-container' onTouchStart={handleButtonPress}>
                                <button type='submit' className='consult-btn form-submit-btn'>
                                    Оставить заявку
                                </button>
                            </div>
                        </form>

                        <img src='/images/star1.svg' alt='' className='form-decoration diamond-1' />
                        <img src='/images/star2.svg' alt='' className='form-decoration diamond-2' />
                    </div>
                </div>
            </div>
        </section>
    )
})

export default FormSection