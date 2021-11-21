import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import 'normalize.css';
import './styles/main.scss';

console.log('Image Viewer - ','Version: 0.1.1', 'Date:Nov 19, 2021');

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );