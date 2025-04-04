import React from 'react';
import './Preloader.css';

function Preloader() {
  return React.createElement(
    'div',
    { className: 'preloader' },
    React.createElement(
      'div',
      { className: 'text-container' },
      React.createElement('h1', null, 'videomakers')
    )
  );
}

export default Preloader;