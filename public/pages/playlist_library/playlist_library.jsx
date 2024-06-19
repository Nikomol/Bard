import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import './playlist_library.scss';

export default function Explore() {

    const user = useSelector((state) => state.user.user);

    const [genres, setGenres] = useState([]);

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
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
                            <button class="genre">Хип-Хоп</button>
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

                    </div>
                </>
                : <Navigate to={"/login"} />
            }
        </>
    );
}
