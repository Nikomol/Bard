import Player from "../player/player";
import { useLocation } from 'react-router-dom';
import HomePanel from "../home_panel/home_panel";
import LibraryPanel from "../library_panel/library_panel";
import SearchPanel from "../search_panel/search_panel";

import './song_page.css';

export default function MainPage() {
    return (
        <>
            <HomePanel />
            <LibraryPanel />
            <SearchPanel />
            <Player url={"http://localhost:3000/music/1.m3u8"}/>
        </>
    );
}