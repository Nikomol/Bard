import { useState, useEffect, useContext } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FocusContext } from '../../../src/context/FocusContext';

import PlayerIcons from '../player_icons/player_icons';

import './playlistContent.scss';

export default function PlaylistContent() {
    let [searchParams, setSearchParams] = useSearchParams();

    const playlistId = searchParams.get('pl'); // Получаем 'playlistId' из строки запроса
    const [urlData, setUrlData] = useState([]);

    const [plTitle, setPlTitle] = useState("Какой-то плейлист");
    const [plDescription, setPlDescription] = useState("Какое то описание");
    const [activeSong, setActiveSong] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    const [playlistAuthor, setPlaylistAuthor] = useState(true);

    const [isLoading, setIsLoading] = useState(true);

    const { setFocus } = useContext(FocusContext);

    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/playlist?pl=${playlistId}`);

                if (!response.ok) {
                    setUrlData(null);
                    throw new Error('Что то пошло не так....');
                }
                const result = await response.json();
                setUrlData(result);
            } catch (error) {
                setUrlData(null);
                console.error('Ошибка при получении данных:', error);
            }
            setIsLoading(false);
        }

        fetchData();

        switch (playlistId) {
            case "lK":
                setPlTitle("Понравившаяся музыка");
                setPlDescription("Создано автоматически");
                setPlaylistAuthor(false);
                break;

            case "hyst":
                setPlTitle("История прослушивания");
                setPlDescription("Создано автоматически");
                setPlaylistAuthor(false);
                break;

            default:
                setPlTitle("Какой-то плейлист");
                setPlDescription("Какое то описание");
                setPlaylistAuthor(true);
                break;
        }

    }, [playlistId]);

    if (isLoading) {
        return (
            <></>
        );
    }

    /*{
        "song_name":"After Dark",
        "Author":"Mr.Kitty",
        "img":"https://i.scdn.co/image/ab67616d00001e0285e3ceaa88ceb59eb9866b81",
        "album":"Time",
        "year":"2014",
        "id":"0000000001"
    }*/

    const playSong = (song_id) => {
        setActiveSong(song_id);
    }

    const toggleLike = () => {
        setIsLiked(!isLiked);
    }

    return (
        <>
            {urlData != null && user && ('login' in user && 'id' in user) ?
                <>
                    <div className="user-playlist__all-containers">
                        <div className='user-playlist__info-container'>
                            <div className='user-playlist__image'>
                                <img className='playlist-image' src="https://cdni.iconscout.com/illustration/premium/thumb/404-7304110-5974976.png?f=webp"></img>
                            </div>
                            <div className='user-playlist__info__container'>
                                <h1 className='user-playlist__info'>{plTitle}</h1>
                                <h3 className='user-playlist__info'>{plDescription}</h3>
                                <h3 className='user-playlist__info'>{`Длительность: 00:00`}</h3>
                                {playlistAuthor ?
                                    <>
                                        <div className='user-playlist__info__add-to-favorite__container'>
                                            <button onClick={toggleLike} className='user-playlist__info__add-to-favorite__button'>
                                                {isLiked ? <PlayerIcons icon_name={"like_pressed"} /> : <PlayerIcons icon_name={"like_unpressed"} />}
                                            </button>
                                            <h3 className='user-playlist__info__add-to-favorite__text'>Добавить в понравившееся</h3>
                                        </div>
                                    </>
                                    :
                                    <></>
                                }
                            </div>
                        </div>
                        <div className='user-playlist__songs-container' style={urlData.length !== 0 ? {marginLeft: "50px"} : {}}>
                            {urlData.length !== 0 ?
                                urlData.map((song, index) => {
                                    const isActive = song.id === activeSong;
                                    const buttonClass = isActive ? 'active' : '';
                                    return (
                                        <button key={index} className={`user-playlist-button__container ${buttonClass}`} onClick={() => playSong(song.id)}>
                                            <img className='user-playlist-button__song-icon' src={song.img}></img>
                                            <div className='user-playlist-button__incontainer'>
                                                <h3 className='user-playlist-button alltext song-title_pl'>{song.song_name}</h3>
                                            </div>
                                            <div className='user-playlist-button__incontainer'>
                                                <h3 className='user-playlist-button alltext song-author_pl'>{song.Author}</h3>
                                            </div>
                                            <div className='user-playlist-button__incontainer'>
                                                <h3 className='user-playlist-button alltext song-time_pl'>{`00:00`}</h3>
                                            </div>
                                        </button>
                                    );
                                })
                                :
                                <div className='user-playlist-button__undefined__container'>
                                    <div className="user-playlist-button__undefined__container-content">
                                        <h3 className='user-playlist-button__undefined__text'>{`Плейлист пуст :(`}</h3>
                                        <button className='user-playlist-button__undefined__button' onClick={setFocus}>Добавить трек</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </> :
                <Navigate to={"/404"} replace={true} />
            }
        </>
    );
}
