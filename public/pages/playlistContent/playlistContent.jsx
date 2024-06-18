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

    const [activeSong, setActiveSong] = useState(null);

    const [editPlaylist, setEditPlaylist] = useState(false);

    const [playlistParametrs, setPlaylistParametrs] = useState({
        playlistTitle: "",
        playlistAuthor: "",
        duration: "--:--",
        authorsPlaylist: false,
        autoCreated: false,
        playlistLock: false,
        playlistLiked: false
    });

    const [newPlaylistTitle, setNewPlaylistTitle] = useState("");

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
                //console.log(`urldata: ${urlData}\nuser: ${Boolean(user)}\n${'login' in user && 'id' in user}`);
            } catch (error) {
                setUrlData(null);
                console.error('Ошибка при получении данных:', error);
            }
            setIsLoading(false);
        }

        fetchData();

        switch (playlistId) {
            case "lK":
                setPlaylistParametrs({
                    ...playlistParametrs,
                    playlistTitle: "Понравившаяся музыка",
                    playlistAuthor: "Создано автоматически",
                    authorsPlaylist: false,
                    autoCreated: true
                });
                break;

            case "hyst":
                setPlaylistParametrs({
                    ...playlistParametrs,
                    playlistTitle: "История прослушивания",
                    playlistAuthor: "Создано автоматически",
                    authorsPlaylist: false,
                    autoCreated: true
                });
                break;

            default:
                setPlaylistParametrs({
                    ...playlistParametrs,
                    playlistTitle: "Какой-то плейлист",
                    playlistAuthor: "Какой то автор",
                    authorsPlaylist: true,
                    autoCreated: false
                });
                break;
        }

    }, [playlistId]);

    if (isLoading) {
        return (
            <></>
        );
    }

    const playSong = (song_id) => {
        setActiveSong(song_id);
    }

    const toggleLike = () => {
        setPlaylistParametrs({
            ...playlistParametrs,
            playlistLiked: !playlistParametrs.playlistLiked
        });
    }

    const toggleLockPlaylist = () => {
        setPlaylistParametrs({
            ...playlistParametrs,
            playlistLock: !playlistParametrs.playlistLock
        });
    }

    const toggleEditPlaylist = () => {
        setEditPlaylist(true);
    }

    const handleNewPlaylistTitle = (e) => {
        setNewPlaylistTitle(e.target.value);
    }

    const toggleSaveTitle = () => {
        setPlaylistParametrs({
            ...playlistParametrs,
            playlistTitle: newPlaylistTitle
        });
    }

    return (
        <>
            {urlData != null && user && ('login' in user && 'id' in user) ?
                <>
                    <div className="user-playlist__all-containers">
                        <div className='user-playlist__info-container'>
                            <div className='user-playlist__image'>
                                {playlistId === "lK" ?
                                    <PlayerIcons icon_name={"playlist-liked-icon"} classname={'playlist-image'} />
                                    :
                                    playlistId === "hyst" ?
                                        <PlayerIcons icon_name={"playlist-history-icon"} classname={'playlist-image'} />
                                        :
                                        <img className='playlist-image' src="https://cdni.iconscout.com/illustration/premium/thumb/404-7304110-5974976.png?f=webp" style={{backgroundColor: "#6CE0AF"}} />
                                }
                            </div>
                            <div className='user-playlist__info__container'>
                                <div className='user-playlist__param'>
                                    {!editPlaylist ?
                                        <h1 className='user-playlist__info'>{playlistParametrs.playlistTitle}</h1>
                                        :
                                        <>
                                            <form onSubmit={toggleSaveTitle}>
                                                <input
                                                    type='text'
                                                    name='playlistTitle'
                                                    placeholder='Название пейлиста...'
                                                    value={newPlaylistTitle}
                                                    onChange={handleNewPlaylistTitle}
                                                    className=''
                                                />
                                                <input type="submit" value="" className="" />
                                            </form>
                                        </>
                                    }
                                    {playlistParametrs.authorsPlaylist && !playlistParametrs.autoCreated ?
                                        <>
                                            <div className='user-playlist__lock-pl'>
                                                {!editPlaylist ?
                                                    <>
                                                        <button className='' onClick={toggleEditPlaylist}>
                                                            <PlayerIcons icon_name={"edit_playlist"} />
                                                        </button>
                                                    </>
                                                    :
                                                    <></>
                                                }
                                                <button className='' onClick={toggleLockPlaylist}>
                                                    {playlistParametrs.playlistLock ? <PlayerIcons icon_name={"lock_playlist"} /> : <PlayerIcons icon_name={"unlock_playlist"} />}
                                                </button>
                                            </div>
                                        </>
                                        :
                                        <></>
                                    }
                                </div>
                                <h3 className='user-playlist__info'>{playlistParametrs.playlistAuthor}</h3>
                                <h3 className='user-playlist__info'>{`Длительность: ${playlistParametrs.duration}`}</h3>
                                {!playlistParametrs.authorsPlaylist && !playlistParametrs.autoCreated ?
                                    <>
                                        <div className='user-playlist__info__add-to-favorite__container'>
                                            <button onClick={toggleLike} className='user-playlist__info__add-to-favorite__button'>
                                                {playlistParametrs.playlistLiked ? <PlayerIcons icon_name={"like_pressed"} /> : <PlayerIcons icon_name={"like_unpressed"} />}
                                            </button>
                                            <h3 className='user-playlist__info__add-to-favorite__text'>Добавить в понравившееся</h3>
                                        </div>
                                    </>
                                    :
                                    <></>
                                }
                            </div>
                        </div>
                        <div className='user-playlist__songs-container' style={urlData.length !== 0 ? { marginLeft: "50px" } : {}}>
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
