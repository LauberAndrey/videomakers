import React, { forwardRef, useState, useRef, useEffect } from 'react'
import './FormSection.css'

const FormSection = forwardRef((props, ref) => {
	const [phone, setPhone] = useState('')
	const phoneRef = useRef(null)

	const formatPhone = (value) => {
		// Удаляем все нецифровые символы
		const numbers = value.replace(/\D/g, '')

		let formattedValue = ''

		if (numbers.length > 0) {
			formattedValue += `(${numbers.substring(0, 3)}`
		}
		if (numbers.length > 3) {
			formattedValue += `) ${numbers.substring(3, 6)}`
		}
		if (numbers.length > 6) {
			formattedValue += `-${numbers.substring(6, 8)}`
		}
		if (numbers.length > 8) {
			formattedValue += `-${numbers.substring(8, 10)}`
		}

		return formattedValue
	}

	const handlePhoneChange = (e) => {
		const input = e.target.value
		const previousValue = phone
		const cursorPos = e.target.selectionStart

		// Сохраняем количество цифр до курсора
		const digitsBeforeCursor = input
			.substring(0, cursorPos)
			.replace(/\D/g, '').length

		// Форматируем номер
		const formatted = formatPhone(input.replace(/\D/g, ''))
		setPhone(formatted)

		// Восстанавливаем позицию курсора
		setTimeout(() => {
			if (phoneRef.current) {
				let newCursorPos = 0
				let digitCount = 0

				for (let i = 0; i < formatted.length; i++) {
					if (/\d/.test(formatted[i])) {
						digitCount++
					}
					if (digitCount === digitsBeforeCursor) {
						newCursorPos = i + 1
						break
					}
				}

				// Если курсор в конце, оставляем его там
				if (digitsBeforeCursor >= input.replace(/\D/g, '').length) {
					newCursorPos = formatted.length
				}

				phoneRef.current.setSelectionRange(newCursorPos, newCursorPos)
			}
		}, 0)
	}

	const handlePhoneKeyDown = (e) => {
		// Обработка Backspace
		if (e.key === 'Backspace') {
			const cursorPos = e.target.selectionStart
			const value = e.target.value

			// Если курсор стоит после разделителя
			if (cursorPos > 0 && !/\d/.test(value[cursorPos - 1])) {
				e.preventDefault()

				// Находим предыдущую цифру
				let newCursorPos = cursorPos - 1
				while (newCursorPos > 0 && !/\d/.test(value[newCursorPos - 1])) {
					newCursorPos--
				}

				// Удаляем цифру
				const newValue =
					value.substring(0, newCursorPos - 1) + value.substring(newCursorPos)
				setPhone(formatPhone(newValue.replace(/\D/g, '')))

				setTimeout(() => {
					if (phoneRef.current) {
						phoneRef.current.setSelectionRange(
							newCursorPos - 1,
							newCursorPos - 1
						)
					}
				}, 0)
			}
		}
	}

	const handleButtonPress = (e) => {
		if (window.innerWidth >= 768) return;
		
		const btnContainer = e.currentTarget.closest('.btn__container');
		if (btnContainer) {
		  btnContainer.classList.add('active');
		  setTimeout(() => {
			btnContainer.classList.remove('active');
		  }, 300);
		}
	  };

	return (
		<section
			id='consultation-form'
			className='wrapper-img discuss-form-section'
			ref={ref}
		>
			<div className='discuss-form-bg'>
				<div className='container discussc-ontainer'>
					<div className='discuss-form-wrapper'>
						<form className='discuss-form'>
							<h2 className='discuss-form-title'>
								Давайте обсудим <br />
								ваш клип
							</h2>

							<div className='form-row'>
								<label className='input-label'>
									<input
										type='text'
										className='form-input'
										placeholder='Имя'
										pattern='[A-Za-zА-Яа-яЁё\s]+'
										required
									/>
								</label>
							</div>

							<div className='form-row'>
								<label className='input-label'>
									<div
										className='phone-input-container'
										style={{
											display: 'flex',
											alignItems: 'center',
											border: '1px solid #010101',
											borderRadius: '8px',
											backgroundColor: 'transparent',
											padding: '0 20px',
										}}
									>
										<span
											style={{
												marginRight: '8px',
												fontSize: '14px',
												fontFamily: 'Steppe',
												color: '#000',
											}}
										>
											+7
										</span>
										<input
											type='tel'
											ref={phoneRef}
											className='form-input'
											style={{
												border: 'none',
												padding: '15px 0',
												flex: 1,
												background: 'transparent',
												outline: 'none',
											}}
											value={phone}
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
										className='form-input'
										placeholder='Группа/артист'
									/>
								</label>
							</div>

							<div className='form-row'>
								<label className='input-label'>
									<textarea
										className='form-textarea'
										placeholder='Краткое описание запроса'
									></textarea>
								</label>
							</div>

							<div className='btn__container form-btn-container' onTouchStart={handleButtonPress}>
								<button type='submit' className='consult-btn form-submit-btn'>
									Оставить заявку
								</button>
							</div>
						</form>

						<img
							src='/images/star1.svg'
							alt=''
							className='form-decoration diamond-1'
						/>
						<img
							src='/images/star2.svg'
							alt=''
							className='form-decoration diamond-2'
						/>
					</div>
				</div>
			</div>
		</section>
	)
})

export default FormSection
