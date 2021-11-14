import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './utils/firebaseConfig';
export { default as Footer } from './components/Footer/Footer';


ReactDOM.render(
  
    <App />,
  
  document.getElementById('root'));

  reportWebVitals();
