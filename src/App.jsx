import { useState, lazy, Suspense } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import Login from '../public/pages/login_pages/login';
import SignUp from '../public/pages/login_pages/signup';
import ForgotPassword from '../public/pages/login_pages/forgotPassword';
import MainPanel from '../public/pages/main_panel/main_panel.jsx';
import PlaylistLibrary from '../public/pages/playlist_library/playlist_library.jsx';
import LoadPage from '../public/pages/load_page/load_page';
import PrivateRoute from './utils/router/privateRoute';

import './index.css';

const SongPage = lazy(() => import('../public/pages/song_page/song_page.jsx'));
// const MainPanel = lazy(() => import('../public/pages/main_panel/main_panel.jsx'));
// const PlaylistLibrary = lazy(() => import('../public/pages/library_panel/library_panel.jsx'));
const NotFound = lazy(() => import('../public/pages/404/404.jsx'));


export default function App() {

  const user = useSelector((state) => state.user.user);
  const [isLogged, useIsLogged] = useState(user && ('login' in user && 'id' in user));

  return (
    <Routes>
      <Route path='/' exact
        element={
          isLogged ? <div className='allPanels'></div>
          : <Navigate to={"/login"} replace={true}/>
        } 
        //если "/" -> если пользователь зарегестрирован -> <MainPanel />, иначе <Navigate to={"/login"} />
      >
        <Route index element={<MainPanel />} /*Если будет просто "/" */ /> 
        <Route path='explore'
          element={
            <></>
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


  // return (
  //   <Routes>
  //     <Route
  //       path='/'
  //       exact
  //       element={isLogged ?
  //         <Navigate to="/songs" replace={true} /> :
  //         <Navigate to="/login" replace={true} />
  //       } />
  //     <Route
  //       path='songs'
  //       element={
  //         <Suspense fallback={<></>}>
  //           <SongPage />
  //         </Suspense>
  //       }>
  //       <Route
  //         index
  //         element={
  //           <Navigate to={"/songs/main"} replace={true} />
  //         }
  //       />
  //       <Route
  //         path='main'
  //         element={
  //           <MainPanel />
  //         }
  //       />
  //       <Route
  //         path='navigator'
  //         element={
  //           <PlaylistLibrary />
  //         }
  //       />
  //     </Route>

  //   </Routes>
  // )
}