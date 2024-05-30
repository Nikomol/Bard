import { useEffect, useState } from 'react';

export default function CreatePlaylist() {

    const [playlist, setPlaylist] = useState([
        {
            url: "liked_id",
            title: "Понравившаяся музыка",
            description: "Создано автоматически"
        },
        {
            url: "history_id",
            title: "История прослушивания",
            description: "Создано автоматически"
        },
        {
            url: "url_1",
            title: "song_title_2",
            description: "song_description_2"
        },
        {
            url: "url_2",
            title: "song_title_4",
            description: "song_description_3"
        }
        ,
        {
            url: "url_3",
            title: "song_title_4",
            description: "song_description_3"
        }
        ,
        {
            url: "url_4",
            title: "song_title_4",
            description: "song_description_3"
        }
        ,
        {
            url: "url_5",
            title: "song_title_4",
            description: "song_description_3"
        }
        ,
        {
            url: "url_3",
            title: "song_title_4",
            description: "song_description_3"
        }
        ,
        {
            url: "url_3",
            title: "song_title_4",
            description: "song_description_3"
        },
        {
            url: "url_3",
            title: "song_title_4",
            description: "song_description_3"
        }
        ,
        {
            url: "url_3",
            title: "song_title_4",
            description: "song_description_3"
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

    // useEffect(() => {
    //     fetch('') //
    //         .then(response => response.json())
    //         .then(data => {
    //             setPlaylist(data.title_playlist);
    //         })
    //         .catch(error => console.error('Playlist loading error', error));
    // }, []);

    return (
        <>
            {playlist.map((song, index) => (
                <button key={index} onClick={loadPlaylist(playlist.url)} className={"playlist button"}>
                    <h1>{song.title}</h1>
                    <h2>{song.description}</h2>
                </button>
            ))}
        </>
    );

}