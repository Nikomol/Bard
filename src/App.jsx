import { useState, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FocusProvider } from "./context/FocusContext";

const Login = lazy(() => import('../public/pages/login_pages/login'));
const SignUp = lazy(() => import('../public/pages/login_pages/signup'));
const ForgotPassword = lazy(() => import('../public/pages/login_pages/forgotPassword'));
const SongPage = lazy(() => import('../public/pages/song_page/song_page'));
const NotFound = lazy(() => import('../public/pages/404/404'));

import './index.scss';

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
              <FocusProvider>
                <SongPage />
              </FocusProvider>
            </Suspense>
            : <Navigate to={"/login"} replace={true} />
        }
      //если "/" -> если пользователь зарегестрирован -> <MainPanel />, иначе <Navigate to={"/login"} />
      >
        <Route index element={
          <></>
        } /*Если будет просто "/" */ />
        <Route path='explore'
          element={
            <></>
          }
        //Если будет "/explore"
        />
        <Route path='playlist'
          element={
            <></>
          }
        />
        <Route path='profile'
          element={
            <></>
          }
        />
        <Route path='user'
          element={
          <></>
        }
        />
        <Route path='search' 
          element={
            <></>
          }
        />
        <Route path='settings'
          element={
            <></>
          }
        />
      </Route>
      <Route path="login"
        element={
          <Suspense fallback={<></>}>
            <Login />
          </Suspense>
        }
      />
      <Route path="register"
        element={
          <Suspense fallback={<></>}>
            <SignUp />
          </Suspense>
        }
      />
      <Route path="recovery"
        element={
          <Suspense fallback={<></>}>
            <ForgotPassword />
          </Suspense>
        }
      />
      <Route path="*"
        element={
          <Suspense fallback={<></>}>
            <NotFound />
          </Suspense>
        }
      />
      <Route path='404'
        element={
          <Suspense fallback={<></>}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}