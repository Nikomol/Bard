import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import PlayerIcons from "../player_icons/player_icons";

import './player.scss';

const loopStates = {
    NO_LOOP: 'No Loop',
    PLAYLIST_LOOP: 'Playlist Loop',
    TRACK_LOOP: 'Track Loop'
};

export default function Player({ url = "", liked = false }) {

    const [isPlaying, setIsPlaying] = useState(true);
    const [isLiked, setIsLiked] = useState(liked);
    const [played, setPlayed] = useState(0);
    const [volume, setVolume] = useState(1.0); //Означает, что начальный уровень громкости будет равен 50%
    const [loopState, setLoopState] = useState(loopStates.NO_LOOP);
    const [duration, setDuration] = useState(0);
    const [seeking, setSeeking] = useState(false);

    const [currentSong, setCurrentSong] = useState(url);
    const [previousSongs, setPreviousSong] = useState([]);
    const [nextSongs, setNextSongs] = useState([]);
    
    const playerRef = useRef(null);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    }

    const onProgress = (progress) => {
        setPlayed(progress.played);
    }

    const seekTo = (value) => {
        playerRef.current.seekTo(parseFloat(value));
    }

    const onVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    const toggleLoop = () => {
        switch (loopState) {
            case loopStates.NO_LOOP:
                setLoopState(loopStates.PLAYLIST_LOOP);
                break;
            case loopStates.PLAYLIST_LOOP:
                setLoopState(loopStates.TRACK_LOOP);
                break;
            case loopStates.TRACK_LOOP:
                setLoopState(loopStates.NO_LOOP);
                break;
            default:
                setLoopState(loopStates.NO_LOOP);
                break;
        }
    };

    const onDuration = (duration) => {
        setDuration(duration);
    };

    const onSeekMouseDown = () => {
        setSeeking(true); // Пользователь начал перемотку
    };

    const onSeekChange = (e) => {
        setPlayed(parseFloat(e.target.value));
    };

    const onSeekMouseUp = (e) => {
        onSeekMouseDown();
        seekTo(e.target.value);
    };

    const formatTime = (seconds) => {
        const rounded = Math.round(seconds);
        const minutes = Math.floor(rounded / 60);
        const remainingSeconds = rounded % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
    }

    const togglePrevTrack = () =>{
        if(previousSongs.length !== 0){
            setCurrentSong(previousSongs[previousSongs.length - 1]);
            setPreviousSong(previousSongs.splice(previousSongs.length - 1, 1));
        }
    }

    const toggleNextTrack = () =>{
        if(nextSongs.length !== 0){
            setPreviousSong({...previousSongs, currentSong});
            setCurrentSong(nextSongs[0]);
            setNextSongs(nextSongs.slice(0));
        }
    }

    const addToPlaylist = () =>{

    }

    const Player = () => {
        return (
            <ReactPlayer
                url={url}
                playing={isPlaying}
                controls={true}
                width='auto'
                height='auto'
                onProgress={onProgress}
                volume={volume}
                onDuration={onDuration}
                ref={playerRef}
            />
        );
    }

    useEffect(() => {
        console.log(`Music status: ${isPlaying ? "Playing" : "Pause"}.\nLoop button status: ${loopState}`);
    }, [isPlaying, loopState])

    return (
        <>
            <div className="playerContainer">
                <div className="componentPosition left">
                </div>
                <div className='componentPosition middle'>
                    <Player url={url} />
                    <div className="playerTime info">
                        <button onClick={addToPlaylist} className={'playerButton add-to-playlist'}>
                            <PlayerIcons icon_name={"add-to-playlist"} />
                        </button>
                        <button onClick={togglePrevTrack} className={'playerButton play-pause'} style={{marginLeft: '5px'}}>
                            <PlayerIcons icon_name={"prev"} />
                        </button>
                        <button onClick={togglePlayPause} className={'playerButton play-pause'} style={{marginInline: '5px'}}>
                            {isPlaying ? <PlayerIcons icon_name={"pause"} /> : <PlayerIcons icon_name={"play"} />}
                        </button>
                        <button onClick={toggleNextTrack} className={'playerButton play-pause'} style={{marginRight: '5px'}}>
                            <PlayerIcons icon_name={"next"} />
                        </button>
                        <button onClick={toggleLike} className={'playerButton like'}>
                            {isLiked ? <PlayerIcons icon_name={"like_pressed"} /> : <PlayerIcons icon_name={"like_unpressed"} />}
                        </button>
                        <a className="time left">{formatTime(played)}</a>
                        <a className="time right">{formatTime(duration)}</a>
                    </div>
                    <div className="playerTime line">
                        <input
                            type="range"
                            min={0}
                            max={duration}
                            step='any'
                            value={played}
                            onChange={onSeekChange}
                            onMouseDown={onSeekMouseDown}
                            onMouseUp={onSeekMouseUp}
                            className="playerRange"
                        />
                    </div>
                </div>
                <div className="componentPosition right">
                    <button onClick={toggleLoop} className={"playerButton loop"}>
                        {loopState === loopStates.NO_LOOP ? <PlayerIcons icon_name={"reply_unpressed"} /> : loopState === loopStates.PLAYLIST_LOOP ? <PlayerIcons icon_name={"reply_pressed"} /> : <PlayerIcons icon_name={"reply_pressed_loop"} />}
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step='any'
                        value={volume}
                        onChange={onVolumeChange}
                        className="volumeRange"
                    />
                </div>
            </div>
        </>
    );
}