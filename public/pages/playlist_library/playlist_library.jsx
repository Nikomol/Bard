import { useState, useEffect } from "react";

export default function CreatePLaylist() {
    const [playlist, setPlaylist] = useState([]);
    const [check, setCheck] = useState([]);

    //логика отправки get/post запроса
    ///.......///

    const createDiv = (playlistTitle, playlistAuthor, playlistUrl) => {
        return (
            <>
                <button className="librarby playlist">
                    <h1 className="library playlist title">
                        {playlistTitle}
                    </h1>
                    <h2 className="library playlist author">
                        {playlistAuthor}
                    </h2>
                </button>
            </>
        );
    }

    const checkPlaylist = () => {
        console.log("Playlist: create");
        for(let i = 0; i < 10; i++){
            setCheck(
                ...check,
                createDiv("some title", "some author", "some Url")
            );
        }
        console.log(`Playslist: ${check}`);

        return(<div></div>);
    }

    return(
        <>
            {checkPlaylist}
        </>
    );

}