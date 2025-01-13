import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import App from './App.tsx';
import UsersPage from './components/UsersPage/UsersPage.tsx';
import CarsPage from './components/CarsPage/CarsPage.tsx';
import UserProvider from './context/userContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/cars" element={<CarsPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
)
