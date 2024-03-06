import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './../public/pages/login';
import './App.css';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<><h1>Hello World</h1><Link to="/one">Переместиться</Link></>}>
              <Route index element={<div>No page is selected.</div>} />
          </Route>
          <Route path="/one" element={<Login />} />
        </Routes>
      </BrowserRouter>
  )
}
