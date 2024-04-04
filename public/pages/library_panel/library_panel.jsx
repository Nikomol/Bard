import { useState, useEffect } from 'react';

import CreatePLaylist from '../playlist_library/playlist_library';

import './library_panel.scss';

export default function LibraryPanel() {

    const [playerHeight, setPlayerHeight] = useState(0);
    const [titleHeight, setTitleHeight] = useState(0);

    useEffect(() => {
        const handleResize = () =>{
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
        height: `calc(100vh - (${titleHeight}px + ${playerHeight}px))`
    };

    return (
        <>
            <div className={"lib backdrop"} style={panelHeight}>
                <div className={"lib content"}>
                    <div className={"content title"}>
                        <h2 className={'library-text title'}>Моя библиотека</h2>
                    </div>
                    <div className={"content main"}>
                        <h1>Text</h1>
                        <CreatePLaylist />
                    </div>
                </div>
            </div>
        </>
    );

}

/*window.addEventListener('resize', function() {
    var playerHeight = document.querySelector('.playerContainer').offsetHeight;
    var yourDiv = document.querySelector('.yourDivComponent');
    yourDiv.style.height = 'calc(100vh - ' + playerHeight + 'px)';
});
*/