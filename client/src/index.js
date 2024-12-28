import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Monda:wght@400..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>

    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />}>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

