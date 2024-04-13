import Player from "../player/player";
import { useLocation } from 'react-router-dom';
import HomePanel from "../home_panel/home_panel";
import LibraryPanel from "../library_panel/library_panel";
import SearchPanel from "../search_panel/search_panel";
import { useSelector } from "react-redux";

import './song_page.css';

export default function MainPage() {

    const user = useSelector((state) => state.user.user);

    return (
        <>
            <SearchPanel />
            <div className="MainPanels">
                <HomePanel />
                <LibraryPanel user={user} />
            </div>
            <Player url={"http://localhost:3000/music/1.m3u8"} />
        </>
    );
}