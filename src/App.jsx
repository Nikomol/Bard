import { useState, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import Login from '../public/pages/login_pages/login';
import SignUp from '../public/pages/login_pages/signup';
import ForgotPassword from '../public/pages/login_pages/forgotPassword';
import MainPanel from '../public/pages/main_panel/main_panel.jsx';
import PlaylistLibrary from '../public/pages/playlist_library/playlist_library.jsx';

import './index.css';

const SongPage = lazy(() => import('../public/pages/song_page/song_page.jsx'));
const NotFound = lazy(() => import('../public/pages/404/404.jsx'));


export default function App() {

  const user = useSelector((state) => state.user.user);
  const [isLogged, setIsLogged] = useState(user && 'login' in user && 'id' in user);

  useEffect(() => {
    setIsLogged(user && 'login' in user && 'id' in user);
  }, [user]);

  return (
    <Routes>
      <Route path='/' exact
        element={
          isLogged ? 
            <Suspense fallback={<></>}>
              <SongPage />
            </Suspense>
          : <Navigate to={"/login"} replace={true}/>
        } 
        //если "/" -> если пользователь зарегестрирован -> <MainPanel />, иначе <Navigate to={"/login"} />
      >
        <Route index element={
          <Suspense fallback={<></>}>
            <MainPanel />
          </Suspense>
        } /*Если будет просто "/" */ /> 
        <Route path='explore'
          element={
            <Suspense fallback={<></>}>
              <PlaylistLibrary />
            </Suspense>
          } 
          //Если будет "/explore"
        />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUp />} />
      <Route path="recovery" element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}