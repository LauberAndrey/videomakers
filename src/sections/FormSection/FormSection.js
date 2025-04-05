import React, { forwardRef } from 'react';
import './FormSection.css';

const FormSection = forwardRef((props, ref) => {
  return (
    <section id="consultation-form" className="wrapper-img discuss-form-section" ref={ref}>
      <div className="discuss-form-bg">
        <div className="container discussc-ontainer">
          <div className="discuss-form-wrapper">
            <form className="discuss-form">
              <h2 className="discuss-form-title">
                Давайте обсудим <br />
                ваш клип
              </h2>
              
              <div className="form-row">
                <label className="input-label">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Имя"
                    pattern="[A-Za-zА-Яа-яЁё\s]+"
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="input-label">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Контактный номер"
                    pattern="\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}"
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="input-label">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Группа/артист"
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="input-label">
                  <textarea
                    className="form-textarea"
                    placeholder="Краткое описание запроса"
                  ></textarea>
                </label>
              </div>

              <div className="btn__container form-btn-container">
                <button type="submit" className="consult-btn form-submit-btn">
                  Оставить заявку
                </button>
              </div>
            </form>

            <img 
              src="/images/star1.svg" 
              alt="" 
              className="form-decoration diamond-1" 
            />
            <img 
              src="/images/star2.svg" 
              alt="" 
              className="form-decoration diamond-2" 
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export default FormSection;