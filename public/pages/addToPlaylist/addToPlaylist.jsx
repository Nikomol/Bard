import { useState, useEffect } from "react";

import './addToPlaylist.scss';

export default function AddToPlaylist({ showAdd = false, wref}) {
    const [playlist, setPlaylist] = useState([
        {
            url: "url_2",
            title: "song_title_2",
            description: "song_description_2"
        },
        {
            url: "url_3",
            title: "song_title_4",
            description: "song_description_3"
        },
        {
            url: "url_4",
            title: "soooooooooooooooooooooo looooooooooooooooooooooooooooooooooooong", //64 символа
            description: "soooooooooooooooooooooo looooooooooooooooooooooooooooooooooooong" //64 символа
        },
        {
            url: "url_5",
            title: "THE BIGEST TEEEEEEEEEEEEEEEEEEEEEEEEEEEEXT", //64 символа
            description: "SO BIGEEEEEEEEEEEEEEEEEEEEEEESTrrrrrrrrrrrrrrrrrrr" //64 символа
        },
        {
            url: "url_6",
            title: "THE BIGEST TEEEEEEEEEEEEEEEEEEEEEEEEEEEEXT", //64 символа
            description: "SO BIGEEEEEEEEEEEEEEEEEEEEEEESTrrrrrrrrrrrrrrrrrrr" //64 символа
        },
        {
            url: "url_7",
            title: "THE BIGEST TEEEEEEEEEEEEEEEEEEEEEEEEEEEEXT", //64 символа
            description: "SO BIGEEEEEEEEEEEEEEEEEEEEEEESTrrrrrrrrrrrrrrrrrrr" //64 символа
        },
        {
            url: "url_5",
            title: "THE BIGEST TEEEEEEEEEEEEEEEEEEEEEEEEEEEEXT", //64 символа
            description: "SO BIGEEEEEEEEEEEEEEEEEEEEEEESTrrrrrrrrrrrrrrrrrrr" //64 символа
        }
    ]);

    const [playerHeight, setPlayerHeight] = useState('');

    const loadPlaylist = (url_playlist = "") => {
        if (!!url_playlist) {
            NaN;
        }
        else {
            console.log(`URL: ${url_playlist}`);
        }
    }

    useEffect(() => {
        const handleResize = () => {
            const player = document.querySelector('.playerContainer');
            setPlayerHeight(player.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const panelPlStyle = {
        bottom: `calc(${playerHeight + 16}px)`,
        left: `33%`
    };

    return (
        <>
            <div className={`add-pl ${showAdd ? "showed" : "hidden"}`} style={panelPlStyle} ref={wref}>
                <div className="pl pl-title">
                    <h2>Добавить в плейлист</h2>
                </div>
                <div className="pl-info">
                    {playlist.length !== 0 ?
                        <>
                            {playlist.map((pl, index) => (
                                <button key={index} onClick={() => loadPlaylist(pl.url)} className={"but-pl"}>
                                    <h2 className="pl-text">{pl.title} - {pl.description}</h2>
                                </button>
                            ))}
                        </>
                        : <h2 className="no-pl">У вас нет собственных плейлистов</h2>
                    }
                </div>
                <div className="pl pl-create-pl">
                    
                </div>
            </div>
        </>
    );
}