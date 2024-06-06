import Player from "../player/player";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomePanel from "../home_panel/home_panel";
import LibraryPanel from "../library_panel/library_panel";
import SearchPanel from "../search_panel/search_panel";
import { useSelector } from "react-redux";
import MainPanel from '../main_panel/main_panel.jsx';
import Explore from '../playlist_library/playlist_library.jsx';
import PlaylistContent from "../playlistContent/playlistContent.jsx";
import ProfilePage from "../profile_page/profilePage.jsx";

import './song_page.css';

export default function MainPage() {
    const location = useLocation();
    const user = useSelector((state) => state.user.user);

    const [playerHeight, setPlayerHeight] = useState(0);
    const [searchHeight, setSearchHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const player = document.querySelector('.playerContainer');
            setPlayerHeight(player.clientHeight);
            const search = document.querySelector('.upper_panel');
            setSearchHeight(search.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize)
            console.log(`Location pathname: ${location.pathname}`);
        };
    }, []);


    const panelHeight = {
        height: `calc(100vh - (${searchHeight + 16}px + ${playerHeight + 16}px))`
    };

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
                            {
                                location.pathname === '/explore' ? <Explore /> : 
                                location.pathname === '/' ? <MainPanel /> : 
                                location.pathname === '/playlist' ? <PlaylistContent /> :
                                location.pathname === '/profile' ? <ProfilePage /> : <MainPanel />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Player />
        </>
    );
}