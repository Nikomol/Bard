import Player from "../player/player";
import { useLocation } from 'react-router-dom';

import './test_page.css';

export default function TestPage(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('song');
    return(
        <>
            <h1>Test Page!!!!</h1>
            <Player music={name} />
        </>
    );
}