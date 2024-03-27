import Player from "../player/player";
import { useLocation } from 'react-router-dom';
import HomePanel from "../home_panel/home_panel";

import './test_page.css';

export default function TestPage() {
    return (
        <>
            <HomePanel />
            <Player />
        </>
    );
}