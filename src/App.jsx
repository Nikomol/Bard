import { useState, lazy, Suspense } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from '../public/pages/login_pages/login';
import SignUp from '../public/pages/login_pages/signup';
import ForgotPassword from '../public/pages/login_pages/forgotPassword';
//import TestPage from '../public/pages/test_page/test_page';
import PrivateRoute from './utils/router/privateRoute';
import LoadPage from '../public/pages/load_page/load_page';

const SongPage = lazy(() => import('../public/pages/song_page/song_page.jsx'));
const MainPage = lazy(() => import('../public/pages/main_panel/main_panel.jsx'));
const LibraryPanel = lazy(() => import('../public/pages/library_panel/library_panel.jsx'));

export default function App() {
  return (
    <Routes>
      <Route path='/' exact element={<><h1>Hello World</h1><Link to="/login">Переместиться</Link></>}>
        <Route index element={<div>No page is selected.</div>} />
      </Route>
      <Route
        path='songs'
        element={
          <Suspense fallback={<></>}>
            <SongPage />
          </Suspense>
        }>
        <Route index element={<Navigate to={"/songs/main"} replace={true}/>} />
        <Route
          path='main'
          element={
            <Suspense fallback={<></>}>
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path='navigator'
          element={
            <Suspense fallback={<></>}>
              <LibraryPanel />
            </Suspense>
          }
        />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUp />} />
      <Route path="recovery" element={<ForgotPassword />} />
    </Routes>
  )
}