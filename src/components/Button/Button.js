import React from 'react';
import './Button.css';

function Button({ onClick, type = 'button', children }) {
  return (
    <div className="btn__container">
      <button 
        className="consult-btn"
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;