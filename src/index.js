import React from 'react';
import ReactDom from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './routes/App';
import '@styles/global.css';

const app = ReactDOM.createRoot(document.getElementById('app'))
app.render(<App/>)