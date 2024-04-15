import Player from "../player/player";
import { useState, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import HomePanel from "../home_panel/home_panel";
import LibraryPanel from "../library_panel/library_panel";
import SearchPanel from "../search_panel/search_panel";
import { useSelector } from "react-redux";

import './song_page.css';

export default function MainPage() {
    const location = useLocation();
    const user = useSelector((state) => state.user.user);

    return (
        <>
            <div className="allPanels">
                <div className="HelperPanels">
                    <HomePanel />
                    <LibraryPanel user={user} />
                </div>
                <div className="MainPanels">
                    <SearchPanel />
                </div>
            </div>
            <Player url={"http://localhost:3000/music/1.m3u8"} />
        </>
    );
}