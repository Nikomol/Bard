import { useState } from "react";

import './addToPlaylist.scss';

export default function AddToPlaylist() {

    const [playlist, setPlaylist] = useState([
        {
            url: "history_id",
            title: "История прослушивания",
            description: "Создано автоматически"
        },
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
        }
    ]);

    const loadPlaylist = (url_playlist = "") => {
        if (!!url_playlist) {
            NaN;
        }
        else {
            console.log(`URL: ${url_playlist}`);
        }
    }

    return (
        <>
            <div className="add-pl">
                <div className="add-pl pl-title">
                    <h2>Добавить в плейлист</h2>
                </div>
                <div className="add-pl pl-info">
                    {playlist.length !== 0 ?
                        <>
                            {playlist.map((pl, index) => (
                                <button key={index} onClick={loadPlaylist(playlist.url)} className={"add-pl pl-info but-pl"}>
                                    <h2 className="add-pl pl-info pl-title">{pl.title} - {pl.description}</h2>
                                </button>
                            ))}
                        </>
                        : <h2 className="add-pl pl-info no-pl">У вас нет собственных плейлистов</h2>
                    }
                </div>
            </div>
        </>
    );
}