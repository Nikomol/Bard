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
const SearchPage = lazy(() => import("../search_page/search_page"));
const SettingPagePanel = lazy(() => import('../settingPage_panel/settingPage_panel'));
const SettingPageMain = lazy(() => import('../settingPage_main/settingPage_main'));

import './song_page.scss';

export default function MainPage() {
    const location = useLocation();
    const user = useSelector((state) => state.user.user);

    const [panelDimensions, setPanelDimensions] = useState({ playerHeight: 0, searchHeight: 0 });

    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

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
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Сбросить прогресс и состояние загрузки при смене пути
        setProgress(0);
        setIsLoaded(false);

        let interval = setInterval(() => {
            setProgress(oldProgress => {
                const randomIncrement = Math.floor(Math.random() * (6)) + 4; // 4 до 10
                const newProgress = oldProgress >= 100 ? 100 : oldProgress + randomIncrement;
                return newProgress;
            });
        }, Math.floor(Math.random() * (3000)) + 1000); // 1000 до 4000

        return () => clearInterval(interval);
    }, [location.pathname]); // Добавьте location.pathname в массив зависимостей

    // Оставьте остальную часть кода без изменений


    useEffect(() => {
        if (progress >= 100 && !isLoaded) {
            setIsLoaded(true);
            setProgress(0); // Сброс прогресса после загрузки
        }
    }, [progress, isLoaded]);

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
                return <ProfilePage isUserProfile={true} />;
            case '/user':
                return <ProfilePage isUserProfile={false} />;
            case '/search':
                return <SearchPage />
            default:
                return <MainPanel />;
        }
    }

    return (
        <>
            <div className="allPanels">
                <div className="HelperPanels">
                    {location.pathname !== "/settings" ?
                        <>
                            <HomePanel />
                            <LibraryPanel user={user} />
                        </>
                        :
                        <>
                            <SettingPagePanel />
                        </>
                    }
                </div>
                <div className="MainPanels">
                    {location.pathname !== "/settings" ?
                        <>
                            <SearchPanel />
                            <div className="main-backdrop" style={panelHeight}>
                                <div className="cont">
                                    <Suspense fallback={<ProgressBar progress={progress} />}>
                                        {renderPanel()}
                                    </Suspense>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <SettingPageMain />
                        </>
                    }
                </div>
            </div>
            <Player />
        </>
    );
}
