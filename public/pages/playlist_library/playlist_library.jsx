import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import './playlist_library.scss';

export default function Explore() {

    const user = useSelector((state) => state.user.user);

    const [genres, setGenres] = useState([
        {
            id: "000000000011",
            title: "Поп"
        },
        {
            id: "000000000012",
            title: "Рок"
        },
        {
            id: "000000000013",
            title: "Джаз"
        },
        {
            id: "000000000014",
            title: "Блюз"
        },
        {
            id: "000000000015",
            title: "Хип-хоп"
        },
        {
            id: "000000000016",
            title: "Рэп"
        },
        {
            id: "000000000017",
            title: "Классическая музыка"
        },
        {
            id: "000000000018",
            title: "Электронная музыка (EDM)"
        },
        {
            id: "000000000019",
            title: "Регги"
        },
        {
            id: "000000000020",
            title: "Кантри"
        },
        {
            id: "000000000021",
            title: "Фолк"
        },
        {
            id: "000000000022",
            title: "Ритм-н-блюз (R&B)"
        },
        {
            id: "000000000023",
            title: "Латиноамериканская музыка"
        },
        {
            id: "000000000024",
            title: "Метал"
        },
        {
            id: "000000000025",
            title: "Инди"
        },
    ]);

    return (
        <>
            {user && ('login' in user && 'id' in user) ?
                <>
                    <div className="allContainers">
                        <h1 className="ContainerTitle">Жанры</h1>
                        <div className="genresContainer">
                            {genres.map((genre, index) => {
                                return (
                                    <button key={index} className="cont-genre">
                                        <h1 className="titleGenre">{genre.title}</h1>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </>
                : <Navigate to={"/login"} />
            }
        </>
    );
}
