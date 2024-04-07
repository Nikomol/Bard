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

        console.log(`player height: ${playerHeight}\ntitle height: ${titleHeight}`);
    
        return () => window.removeEventListener('resize', handleResize);
    }, [playerHeight, titleHeight]);
    

    const panelHeight = {
        height: `calc(100vh - (${titleHeight + 20}px + ${playerHeight + 10}px))`
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

// const [playlist, setPlaylist] = useState([]);
//     const [check, setCheck] = useState([]);

//     //логика отправки get/post запроса
//     ///.......///

//     const createDiv = (playlistTitle, playlistAuthor, playlistUrl) => {
//         return (
//             <>
//                 <button className="librarby playlist">
//                     <h1 className="library playlist title">
//                         {playlistTitle}
//                     </h1>
//                     <h2 className="library playlist author">
//                         {playlistAuthor}
//                     </h2>
//                 </button>
//             </>
//         );
//     }

//     const checkPlaylist = () => {
//         console.log("Playlist: create");
//         for(let i = 0; i < 10; i++){
//             setCheck(
//                 ...check,
//                 createDiv("some title", "some author", "some Url")
//             );
//         }
//         console.log(`Playslist: ${check}`);

//         return(<div></div>);
//     }

//     return(
//         <>
//             {checkPlaylist}
//         </>
//     );