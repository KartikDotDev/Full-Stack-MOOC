import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


// dotenv is there by default in create-react-app in react-scripts, see node_modules/react-scripts/config/env.js
// require('dotenv').config({ path: '../.env', encoding: 'utf8' }); or require('dotenv').config() are not needed

// console.log(process.env.REACT_APP_KEY);

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);







