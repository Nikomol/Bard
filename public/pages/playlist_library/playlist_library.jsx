import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import './playlist_library.scss';

export default function Explore() {
    const navigate = useNavigate(); 
    const user = useSelector((state) => state.user.user);

    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch('http://172.24.80.146:8080/music/genres');

                if (!response.ok) {
                    setGenres([]);
                    throw new Error("Ответ от сервера был не ok!");
                }

                const result = await response.json();
                setGenres(result);
            }
            catch (error) {
                setGenres([]);
                console.error("Ошибка получения данных!");
            }

            setIsLoading(false);
        }

        fetchData();
    }, [])

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
    };

    const handleViewAllClick = () => {
        if (selectedGenre) {
            navigate(`/playlist?pl=${selectedGenre}`);
        }
    };
    


    // if (isLoading) {
    //     return (
    //         <></>
    //     );
    //}

    return (
        <>
            {user && ('login' in user && 'id' in user) ?
                <>
                    <div class="container">
                        <h1>Жанры</h1>
                        <div class="genres">
                        <button className={`genre ${selectedGenre === 'kpop' ? 'active' : ''}`} onClick={() => handleGenreClick('kpop')}>К-Поп</button>
                        <button className={`genre ${selectedGenre === 'metal' ? 'active' : ''}`} onClick={() => handleGenreClick('metal')}>Метал</button>
                        <button className={`genre ${selectedGenre === 'rok' ? 'active' : ''}`} onClick={() => handleGenreClick('rok')}>Рок</button>
                        <button className={`genre ${selectedGenre === 'phonk' ? 'active' : ''}`} onClick={() => handleGenreClick('phonk')}>Фонк</button>
                        <button className={`genre ${selectedGenre === 'memphis' ? 'active' : ''}`} onClick={() => handleGenreClick('memphis')}>Мемфис</button>
                        <button className={`genre ${selectedGenre === 'hip-hop' ? 'active' : ''}`} onClick={() => handleGenreClick('hip-hop')}>Хип-Хоп</button>
                        <button className={`genre ${selectedGenre === 'classical' ? 'active' : ''}`} onClick={() => handleGenreClick('classical')}>Классика</button>
                        <button className={`genre ${selectedGenre === 'hyperpop' ? 'active' : ''}`} onClick={() => handleGenreClick('hyperpop')}>Гиперпоп</button>
                        <button className={`genre ${selectedGenre === 'electronic' ? 'active' : ''}`} onClick={() => handleGenreClick('electronic')}>Электроника</button>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <h2>Топ треков</h2>
                                <ol>
                                    <li>
                                        <button class="track-button">
                                            <p>Killer Miller (Kill Again)<br></br><span>Freddie Dredd</span></p>
                                            <span class="duration">2:00</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="track-button">
                                            <p>Killer Miller (Kill Again)<br></br><span>Freddie Dredd</span></p>
                                            <span class="duration">2:00</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="track-button">
                                            <p>Killer Miller (Kill Again)<br></br><span>Freddie Dredd</span></p>
                                            <span class="duration">2:00</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="track-button">
                                            <p>Killer Miller (Kill Again)<br></br><span>Freddie Dredd</span></p>
                                            <span class="duration">2:00</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="track-button">
                                            <p>Killer Miller (Kill Again)<br></br><span>Freddie Dredd</span></p>
                                            <span class="duration">2:00</span>
                                        </button>
                                    </li>
                                </ol>
                            </div>
                            <div class="column">
                                <h2>Новинки</h2>
                                <div class="new-track">
                                    <button class="track-button">
                                        <p>Killer Miller (Kill Again)<br></br><span>Freddie Dredd</span></p>
                                        <span class="duration">2:00</span>
                                    </button>
                                </div>
                                <div class="new-track">
                                    <button class="track-button">
                                        <p>Killer Miller (Kill Again)<br></br><span>Freddie Dredd</span></p>
                                        <span class="duration">2:00</span>
                                    </button>
                                </div>
                                <div class="new-track">
                                    <button class="track-button">
                                        <p>Killer Miller (Kill Again)<br></br><span>Freddie Dredd</span></p>
                                        <span class="duration">2:00</span>
                                    </button>
                                </div>
                                <div class="new-track">
                                    <button class="track-button">
                                        <p>Killer Miller (Kill Again)<br></br><span>Freddie Dredd</span></p>
                                        <span class="duration">2:00</span>
                                    </button>
                                </div>
                                <div class="new-track">
                                    <button class="track-button">
                                        <p>Killer Miller (Kill Again)<br></br><span>Freddie Dredd</span></p>
                                        <span class="duration">2:00</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <a className="view-all" onClick={handleViewAllClick}>Посмотреть все</a>
                    </div>
                </>
                : <Navigate to={"/login"} />
            }
        </>
    );
}
