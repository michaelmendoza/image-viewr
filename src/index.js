import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import CSS from "./styles/main.scss";

console.log('Image Viewer - ','Version: 0.0.58', 'Date:May 18, 2020');

const root = document.getElementById('app-hook')
ReactDOM.render(<App/>, root);