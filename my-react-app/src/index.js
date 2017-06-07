import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import './css/index.css';

let name = "Bryan";

ReactDOM.render(
    <App name={name}
         surname="N"/>,
    document.getElementById('root')
);
