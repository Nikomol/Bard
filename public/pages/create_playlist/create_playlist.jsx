import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePlaylist() {

    const navigate = useNavigate();

    //const [dis, setDis] = useState(false);

    const [playlist, setPlaylist] = useState([
        {
            url: "lK",
            title: "Понравившаяся музыка",
            description: "Создано автоматически"
        },
        {
            url: "hyst",
            title: "История прослушивания",
            description: "Создано автоматически"
        },
        {
            url: "0000001",
            title: "Тестовый плейлист",
            description: "Рабочий плейлист"
        },
        {
            url: "url_0",
            title: "song_title_4",
            description: "song_description_3"
        }
        ,
        {
            url: "url_0",
            title: "song_title_4",
            description: "song_description_3"
        }
        ,
        {
            url: "url_0",
            title: "song_title_4",
            description: "song_description_3"
        }
        ,
        {
            url: "url_0",
            title: "song_title_4",
            description: "song_description_3"
        }
        ,
        {
            url: "url_0",
            title: "song_title_4",
            description: "song_description_3"
        }
        ,
        {
            url: "url_0",
            title: "song_title_4",
            description: "song_description_3"
        },
        {
            url: "url_0",
            title: "song_title_4",
            description: "song_description_3"
        }
        ,
        {
            url: "url_0",
            title: "song_title_4",
            description: "song_description_3"
        }
    ]);

    const loadPlaylist = (url_playlist = 0) => {
        if(url_playlist !== 0){


            navigate(`/playlist?pl=${url_playlist}`);

            console.log(`URL: ${url_playlist}`);
        }
        else{
            console.log(`URL: not found!!`);
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
                <button key={index} onClick={() => loadPlaylist(song.url)} className={"playlist button"} >
                    <h1>{song.title}</h1>
                    <h2>{song.description}</h2>
                </button>
            ))}
        </>
    );

}