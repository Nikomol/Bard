import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import './main_panel.scss';

const Playlist_div = ({ playlist = [] }) => {
    return (
        <>
            {playlist.map((pl, index) => {
                return (
                    <div key={index} className={"ContainerInfo"}>
                        <button className="ContainerButton">
                            <img src={pl.img} className="ContainerImage"></img>
                        </button>
                        <p>{pl.song_name}</p>
                        <p>{pl.Author}</p>
                        <p>{pl.album}</p>
                        <p>{pl.year}</p>
                    </div>
                );

            })}
        </>
    );
}

export default function MainPanel() {
    const user = useSelector((state) => state.user.user);

    const [playlist, setPlaylist] = useState([
        {
            song_name: "Bury the Light",
            Author: "Casey Edwards",
            img: "https://64.media.tumblr.com/3773a09b8e680503aca3841091872fbd/36d903bf7ea25f6e-09/s1280x1920/6b3111e5152bb77448f50287ace3b1818422cdfb.jpg",
            album: "Devil May Cry 5 Special Edition",
            year: "2021"
        },
        {
            song_name: "It was a Good Day",
            Author: "Ice Cube",
            img: "https://upload.wikimedia.org/wikipedia/en/8/8e/Ice_Cube_-_The_Predator_-_Album_Cover.jpg",
            album: "The Predator",
            year: "1992"
        },
        {
            song_name: "Sonne",
            Author: "Rammstein",
            img: "https://i1.sndcdn.com/artworks-1atJvx3IrEf5ehgd-zXsQ4g-t500x500.jpg",
            album: "Mutter",
            year: "2001"
        },
        {
            song_name: "Blood and Wine",
            Author: "Marcin Przybyłowicz",
            img: "https://lh3.googleusercontent.com/oUev0X6vTZOlrlQr84jOvHnGFcyU1fgYqml3fYeCqkJLWj29cWnKdrsZCx3s7aRp5Lj-hOlIrsnQuMds=w544-h544-l90-rj",
            album: "The Witcher 3: Wild Hunt - Blood and Wine",
            year: "2016"
        },
        {
            song_name: "The Way of the Ghost",
            Author: "Ilan Eshkeri",
            img: "https://lh3.googleusercontent.com/4rOTV-H2A2S-U0Oqsg9EsMWV9hSlzFGE6-oylUDlnLdZCu-mTJovd5ZxB4esCDGCe3ZBP8hyJ_Mhok_h=w544-h544-l90-rj",
            album: "Ghost of Tsushima (Music from the Video Game)",
            year: "2020"
        },
        {
            song_name: "Into the Spider-Verse",
            Author: "Daniel Pemberton",
            img: "https://lh3.googleusercontent.com/VBmSoMba9ft0wVFKa-XEcvw9m190nOgTJCl9loeN8BnDjt9_LYRo3yiOR-WjkZHvo42-voseMSHa-OOJ=w544-h544-l90-rj",
            album: "Spider-Man: Into the Spider-Verse (Original Score)",
            year: "2018"
        },
        {
            song_name: "BB's Theme",
            Author: "Ludvig Forssell",
            img: "https://lh3.googleusercontent.com/XIOuhXTrvQuthFHoCPO8Smx_99QyTN05lb486AWo1kSFNj9Wd87Mz_7g-Zc4z-1no1p6JUGB2GZDwquT=w544-h544-l90-rj",
            album: "Death Stranding (Original Score)",
            year: "2019"
        },
        {
            song_name: "Money Trees",
            Author: "Kendrick Lamar",
            img: "https://lh3.googleusercontent.com/Fz9_8koA1VbRz51kyUaOHIVDQu7LCx2W0lDjytEXz4KPGL3VIV5LS2F0uISIHHCvqQpbgHl3oCWIG6I=w544-h544-l90-rj",
            album: "good kid, m.A.A.d. city",
            year: "2012"
        }
    ]);

    return (
        <>
            {user && ('login' in user && 'id' in user) ?
                <>
                    <div className="allContainers">
                        <div className="MusicDayContainer">
                            <h1 className="ContainerTitle">Музыка дня</h1>
                            <div className="Containers">
                                <Playlist_div playlist={playlist} />
                            </div>
                        </div>
                    </div>
                </>
                : <Navigate to={"/login"} />
            }
        </>
    );
}