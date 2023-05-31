import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import App from './App';
import './user/assets/css/index.css';
import './admin/assets/css/index.css';
import './admin/assets/css/satoshi.css';


const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ToastContainer />
      <Router>
      <App />
      </Router>
    </React.StrictMode>
  );

 // Если необходимо измерять производительность, можно передать функцию для логирования результатов
// Например, можно использовать функцию reportWebVitals(console.log) или отправить результаты на аналитический сервис.
  reportWebVitals();
} else {
  console.error("Unable to find root element");
}