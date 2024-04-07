import { useEffect, useState } from 'react';

export default function CreatePlaylist() {

    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        fetch('') //
            .then(response => response.json())
            .then(data => {
                setPlaylist(data.title_playlist);
            })
            .catch(error => console.error('Playlist loading error', error));
    }, []);

    return (
        <>
            <div>
                {playlist.map((playlist, index) => (
                    <button key={index} onClick={() => console.log(playlist.url)} className='library playlist'>
                        {playlist.description}
                    </button>
                ))}
            </div>
        </>
    );
}