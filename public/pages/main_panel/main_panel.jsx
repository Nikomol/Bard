import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setTrackUrl } from "../../../src/actions/userActions";

import './main_panel.scss';

const Playlist_div = ({ playlist = [] }) => {

    const dispatch = useDispatch();

    const updateUrl = (newURL) => {
        dispatch(setTrackUrl(newURL));
        console.log(`new url: ${newURL}`);
    };

    const handleButtonClick = (id) => {
        updateUrl(`http://localhost:3000/music/${id}/1.m3u8`);
        console.log(`id_track: ${id}`);
    };

    return (
        <>
            {playlist.map((pl, index) => {
                return (
                    <div key={index} className={"ContainerInfo"}>
                        <button className="ContainerButton" onClick={() => handleButtonClick(pl.id)}>
                            <img src={pl.img} className="ContainerImage" alt={pl.song_name}></img>
                        </button>
                        {/* <p>{pl.song_name}</p>
                        <p>{pl.Author}</p>
                        <p>{pl.album}</p>
                        <p>{pl.year}</p> */}
                        <p className="trackInfo">{pl.song_name} &bull; {pl.album} &bull; {pl.Author} &bull; {pl.year}</p>
                    </div>
                );

            })}
        </>
    );
}

export default function MainPanel() {
    const user = useSelector((state) => state.user.user);

    const [dayMusicData, setDayMusicData] = useState([]);
    const [authorsMusicData, setAuthorsMusicData] = useState([]);
    const [usersMusicData, setUsersMusicData] = useState([]);

    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchUrls = async () => {
            setLoading(true);
            const urls = [
                'http://localhost:3000/musicday',
                'http://localhost:3000/authorsmusic',
                'http://localhost:3000/usersmusic'
            ];

            try {
                const response = await Promise.all(urls.map(url => fetch(url)));
                const dataPromises = response.map(response => {
                    if (!response.ok) {
                        throw new Error(`Ошибка в запросе к ${response.url}`);
                    }
                    return response.json();
                });

                const [responseData1, responseData2, responseData3] = await Promise.all(dataPromises);
                setDayMusicData(responseData1);
                setAuthorsMusicData(responseData2);
                setUsersMusicData(responseData3);
            } catch (error) {
                console.error('Ошибка получении данных:', error);
            }
            setLoading(false);
        }

        fetchUrls();
    }, [])

    return (
        <>
            {user && ('login' in user && 'id' in user) ?
                <>
                    <div className="allContainers">
                        {loading ?
                            <></> :
                            <>
                                <div className="MusicDayContainer">
                                    <h1 className="ContainerTitle">Музыка дня</h1>
                                    <div className="Containers">
                                        <Playlist_div playlist={dayMusicData} />
                                    </div>
                                </div>
                                <div className="NewMusicFromAuthors">
                                    <h1 className="ContainerTitle">Новое от ваших авторов</h1>
                                    <div className="Containers">
                                        <Playlist_div playlist={authorsMusicData} />
                                    </div>
                                </div>
                                <div className="UsersPlaylists">
                                    <h1 className="ContainerTitle">Плейлисты пользователей</h1>
                                    <div className="Containers">
                                        <Playlist_div playlist={usersMusicData} />
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </>
                : <Navigate to={"/login"} />
            }
        </>
    );
}