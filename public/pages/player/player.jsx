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

    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(liked);
    const [played, setPlayed] = useState(0.0);
    const [volume, setVolume] = useState(1.0); //Означает, что начальный уровень громкости будет равен 50%
    const [loopState, setLoopState] = useState(loopStates.NO_LOOP);
    const [duration, setDuration] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [volumeDis, setVolumeDis] = useState(true);
    const [showedText, setShowedText] = useState(false);
    const [isMixed, setIsMixed] = useState(false);
    const [pressedEqualizer, setPressedEqualizer] = useState(false);
    const [hasSeeked, setHasSeeked] = useState(false);

    const [currentSong, setCurrentSong] = useState(url);
    const [previousSongs, setPreviousSong] = useState([]);
    const [nextSongs, setNextSongs] = useState([]);

    const playerRef = useRef(null);

    const onSeek = () => {
        setHasSeeked(true);
    };

    const toggleShowText = () => {
        setShowedText(!showedText);
    }

    const toggleEqualizer = () => {
        setPressedEqualizer(!pressedEqualizer);
    }

    const toggleMix = () => {
        setIsMixed(!isMixed);
    }

    const togglePlayPause = () => {
        if (url !== "") {
            setIsPlaying(!isPlaying);
        }
    }

    const onProgress = (progress) => {
        if (!seeking) {
            console.log(`play: ${progress.played * duration}`);
            setPlayed(progress.played * duration);
            setHasSeeked(false); // Сбросить состояние после обновления
        }
    }

    const seekTo = (value) => {
        playerRef.current.seekTo(value);
    };

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
        console.log(`Changed: ${parseFloat(e.target.value)}`)
        setPlayed(parseFloat(e.target.value));
    };

    const onSeekMouseUp = (e) => {
        setSeeking(false);
        const newPlayedFraction = parseFloat(e.target.value) / duration;
        seekTo(newPlayedFraction); // Передаем долю от длительности
        setPlayed(newPlayedFraction * duration); // Обновляем played до нового времени в секундах
        console.log(`onSeekMouseUp: ${e.target.value}\n${parseFloat(e.target.value) / duration}`);
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

    const togglePrevTrack = () => {
        if (previousSongs.length !== 0) {
            setCurrentSong(previousSongs[previousSongs.length - 1]);
            setPreviousSong(previousSongs.splice(previousSongs.length - 1, 1));
        }
    }

    const toggleNextTrack = () => {
        if (nextSongs.length !== 0) {
            setPreviousSong({ ...previousSongs, currentSong });
            setCurrentSong(nextSongs[0]);
            setNextSongs(nextSongs.slice(0));
        }
    }

    const toggleAddToPlaylist = () => {

    }

    const toggleShowVolume = () => {
        setVolumeDis(!volumeDis);
    }

    // const Player = () => {
    //     return (
    //         <ReactPlayer
    //             url={url}
    //             playing={isPlaying}
    //             controls={true}
    //             width='0'
    //             height='0'
    //             onProgress={onProgress}
    //             volume={volume}
    //             onDuration={onDuration}
    //             ref={playerRef}
    //         />
    //     );
    // }

    useEffect(() => {
        //url !== "" ? setIsPlaying(true) : setIsPlaying(false);
        console.log(`Music status: ${isPlaying ? "Playing" : "Pause"}.\nLoop button status: ${loopState}.`);
    }, [isPlaying, loopState])

    return (
        <>
            <div className="playerContainer">
                <div className="componentPosition left">
                </div>
                <div className='componentPosition middle'>
                    <ReactPlayer
                        url={url}
                        playing={isPlaying}
                        controls={true}
                        width='0'
                        height='0'
                        onProgress={onProgress}
                        volume={volume}
                        onDuration={onDuration}
                        ref={playerRef}
                        onSeek={onSeek}
                    />
                    <div className="playerTime info">
                        <button onClick={toggleAddToPlaylist} className={'playerButton add-to-playlist'}>
                            <PlayerIcons icon_name={"add-to-playlist"} />
                        </button>
                        <button onClick={togglePrevTrack} className={'playerButton play-pause'} style={{ marginLeft: '5px' }}>
                            <PlayerIcons icon_name={"prev"} />
                        </button>
                        <button onClick={togglePlayPause} className={'playerButton play-pause'} style={{ marginInline: '5px' }}>
                            {isPlaying ? <PlayerIcons icon_name={"pause"} /> : <PlayerIcons icon_name={"play"} />}
                        </button>
                        <button onClick={toggleNextTrack} className={'playerButton play-pause'} style={{ marginRight: '5px' }}>
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
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step='any'
                        value={volume}
                        onChange={onVolumeChange}
                        className={`volumeRange ${volumeDis ? 'disable' : 'enable'}`}
                        disabled={volumeDis}
                    />
                    <button onClick={toggleShowVolume} className={"playerButton volume"}>
                        <PlayerIcons icon_name={"volume"} />
                    </button>
                    <button onClick={toggleShowText} className={"playerButton text"}>
                        {showedText ? <PlayerIcons icon_name={"text_pressed"} /> : <PlayerIcons icon_name={"text_unpressed"} />}
                    </button>
                    <button onClick={toggleMix} className={"playerButton volume"}>
                        <PlayerIcons icon_name={"mix"} />
                    </button>
                    <button onClick={toggleLoop} className={"playerButton loop"}>
                        {loopState === loopStates.NO_LOOP ? <PlayerIcons icon_name={"reply_unpressed"} /> : loopState === loopStates.PLAYLIST_LOOP ? <PlayerIcons icon_name={"reply_pressed"} /> : <PlayerIcons icon_name={"reply_pressed_loop"} />}
                    </button>
                    <button onClick={toggleEqualizer} className={"playerButton text"}>
                        <PlayerIcons icon_name={"equalizer"} />
                    </button>
                </div>
            </div>
        </>
    );
}