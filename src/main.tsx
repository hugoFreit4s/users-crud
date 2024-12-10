import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import App from './App.tsx';
import UsersPage from './Users/UsersPage/UsersPage.tsx';
import CarsPage from './Cars/CarsPage/CarsPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/cars" element={<CarsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
