import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './../public/pages/login';
import SignUp from '../public/pages/signup';
import ForgotPassword from '../public/pages/forgotPassword';
import CheckYourPassword from '../public/pages/checkyourmail';
import './App.css';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<><Navigate to="/login"/></>}>
              <Route index element={<div>No page is selected.</div>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/check-your-password" element={<CheckYourPassword />} />
        </Routes>
      </BrowserRouter>
  )
}