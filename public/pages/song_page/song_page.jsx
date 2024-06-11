import { useState, useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import HomePanel from "../home_panel/home_panel";
import LibraryPanel from "../library_panel/library_panel";
import SearchPanel from "../search_panel/search_panel";
import Player from "../player/player";
import ProgressBar from '../load_page/load_page';

const MainPanel = lazy(() => import('../main_panel/main_panel'));
const Explore = lazy(() => import('../playlist_library/playlist_library'));
const PlaylistContent = lazy(() => import("../playlistContent/playlistContent"));
const ProfilePage = lazy(() => import("../profile_page/profilePage"));

import './song_page.scss';

export default function MainPage() {
    const location = useLocation();
    const user = useSelector((state) => state.user.user);

    const [panelDimensions, setPanelDimensions] = useState({ playerHeight: 0, searchHeight: 0 });

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(oldProgress => {
                const newProgress = oldProgress >= 100 ? 100 : oldProgress + 10;
                if(newProgress === 100) clearInterval(interval);
                return newProgress;
            })
        }, 1000);


        const handleResize = () => {
            setPanelDimensions({
                playerHeight: document.querySelector('.playerContainer')?.clientHeight || 0,
                searchHeight: document.querySelector('.upper_panel')?.clientHeight || 0,
            });
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(interval);
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
                            <Suspense fallback={<ProgressBar progress={progress} />}>
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