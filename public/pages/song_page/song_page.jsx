import Player from "../player/player";
import { useState, useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import HomePanel from "../home_panel/home_panel";
import LibraryPanel from "../library_panel/library_panel";
import SearchPanel from "../search_panel/search_panel";
import { useSelector } from "react-redux";
//import MainPanel from '../main_panel/main_panel';
//import Explore from '../playlist_library/playlist_library';
//import PlaylistContent from "../playlistContent/playlistContent";
//import ProfilePage from "../profile_page/profilePage";

import './song_page.scss';

//const HomePanel = lazy(() => import("../home_panel/home_panel"));
//const LibraryPanel = lazy(() => import("../library_panel/library_panel"));
//const SearchPanel = lazy(() => import("../search_panel/search_panel"));
const MainPanel = lazy(() => import('../main_panel/main_panel'));
const Explore = lazy(() => import('../playlist_library/playlist_library'));
const PlaylistContent = lazy(() => import("../playlistContent/playlistContent"));
const ProfilePage = lazy(() => import("../profile_page/profilePage"));
//const Player = lazy(() => import("../player/player"));

export default function MainPage() {
    const location = useLocation();
    const user = useSelector((state) => state.user.user);

    const [panelDimensions, setPanelDimensions] = useState({ playerHeight: 0, searchHeight: 0 });

    useEffect(() => {
        const handleResize = () => {
            setPanelDimensions({
                playerHeight: document.querySelector('.playerContainer')?.clientHeight || 0,
                searchHeight: document.querySelector('.upper_panel')?.clientHeight || 0,
            });
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize)
            console.log(`Location pathname: ${location.pathname}`);
        };
    }, []);


    const panelHeight = {
        height: `calc(100vh - (${panelDimensions.searchHeight + 16}px + ${panelDimensions.playerHeight + 16}px))`
    };

    function renderPanel() {
        switch (location.pathname) {
            case '/explore':
                return <Explore />;
            case '/playlist':
                return <PlaylistContent />;
            case '/profile':
                return <ProfilePage />;
            default:
                return <MainPanel />;
        }
    }

    return (
        <>
            <div className="allPanels">
                <div className="HelperPanels">
                    <HomePanel />
                    <LibraryPanel user={user} />
                </div>
                <div className="MainPanels">
                    <SearchPanel />
                    <div className="main-backdrop" style={panelHeight}>
                        <div className="cont">
                            <Suspense fallback={<></>}>
                                {renderPanel()}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
            <Player />
        </>
    );
}