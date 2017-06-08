import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import './css/index.css';

let name = "John";

ReactDOM.render(
    <App name={name}
         surname="Doe"/>,
    document.getElementById('root')
);
