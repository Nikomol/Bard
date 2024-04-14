import { useState, lazy, Suspense } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from '../public/pages/login_pages/login';
import SignUp from '../public/pages/login_pages/signup';
import ForgotPassword from '../public/pages/login_pages/forgotPassword';
//import TestPage from '../public/pages/test_page/test_page';
import PrivateRoute from './utils/router/privateRoute';
import LoadPage from '../public/pages/load_page/load_page';

//import 'normalize.css';

const SongPage = lazy(() => import('../public/pages/song_page/song_page.jsx'));
const MainPanel = lazy(() => import('../public/pages/main_panel/main_panel.jsx'));
const PlaylistLibrary = lazy(() => import('../public/pages/library_panel/library_panel.jsx'));
const NotFound = lazy(() => import('../public/pages/404/404.jsx'));

export default function App() {
  return (
    <Routes>
      <Route path='/' exact element={<Navigate to="/login" replace={true} />}>
        <Route index element={<><h2>No page is selected.</h2></>} />
      </Route>
      <Route
        path='songs'
        element={
          <Suspense fallback={<></>}>
            <SongPage />
          </Suspense>
        }>
        <Route index element={<Navigate to={"/songs/main" } replace={true}/>} />
        <Route
          path='main'
          element={
            <Suspense fallback={<></>}>
              <MainPanel />
            </Suspense>
          }
        />
        <Route
          path='navigator'
          element={
            <Suspense fallback={<></>}>
              <PlaylistLibrary />
            </Suspense>
          }
        />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUp />} />
      <Route path="recovery" element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}