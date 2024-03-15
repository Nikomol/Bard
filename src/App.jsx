import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from '../public/pages/login';
import SignUp from '../public/pages/signup';
import ForgotPassword from '../public/pages/forgotPassword';
import './App.css';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<><h1>Hello World</h1><Link to="/login">Переместиться</Link></>}>
              <Route index element={<div>No page is selected.</div>} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
          <Route path="recovery" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
  )
}