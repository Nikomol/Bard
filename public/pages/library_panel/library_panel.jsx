import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import CreatePlaylist from '../create_playlist/create_playlist';

import './library_panel.scss';

export default function LibraryPanel() {

    const [playerHeight, setPlayerHeight] = useState(0);
    const [titleHeight, setTitleHeight] = useState(0);

    const user = useSelector((state) => state.user.user);

    //const user = useSelector((state) => state.user.user);

    //логика отправки get/post запроса
    //..............................//

    useEffect(() => {
        const handleResize = () => {
            const player = document.querySelector('.playerContainer');
            setPlayerHeight(player.clientHeight);
            const title = document.querySelector('.backdrop');
            setTitleHeight(title.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const panelHeight = {
        height: `calc(100vh - (${titleHeight + 20}px + ${playerHeight + 10}px))`
    };

    return (
        <>
            {user && ('login' in user && 'id' in user) ? 
                <div className={"lib backdrop"} style={panelHeight}>
                    <div className={"lib content"}>
                        <div className={"lib content"}>
                            <h2 className={'library-text'}>Моя библиотека</h2>
                        </div>
                        <div className={"playlist backdrop"}>
                            <CreatePlaylist />
                        </div>
                    </div>
                </div>
            :
                <Navigate to="/login" replace={true} />
            }
        </>
    );


}