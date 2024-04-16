import { useState } from "react";

import './addToPlaylist.scss';

export default function AddToPlaylist({ showAdd = false }) {

    const [playlist, setPlaylist] = useState([]);

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
            <div className={`add-pl ${showAdd ? "showed" : "hidden"}`}>
                <div className="pl-title">
                    <h2>Добавить в плейлист</h2>
                </div>
                <div className="pl-info">
                    {playlist.length !== 0 ?
                        <>
                            {playlist.map((pl, index) => (
                                <button key={index} onClick={loadPlaylist(playlist.url)} className={"but-pl"}>
                                    <h2 className="pl-text">{pl.title} - {pl.description}</h2>
                                </button>
                            ))}
                        </>
                        : <h2 className="no-pl">У вас нет собственных плейлистов</h2>
                    }
                </div>
            </div>
        </>
    );
}