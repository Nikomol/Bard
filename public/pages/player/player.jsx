import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";

import './player.scss';

const loopStates = {
    NO_LOOP: 'No Loop',
    PLAYLIST_LOOP: 'Playlist Loop',
    TRACK_LOOP: 'Track Loop'
};

export default function Player({ url = "" }) {

    const [isPlaying, setIsPlaying] = useState(true);
    const [played, setPlayed] = useState(0);
    const [volume, setVolume] = useState(1.0); //Означает, что начальный уровень громкости будет равен 50%
    const [loopState, setLoopState] = useState(loopStates.NO_LOOP);
    const [duration, setDuration] = useState(0);
    const [seeking, setSeeking] = useState(false);
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

    return (
        <>
            <div className="playerContainer">
                <div className='playerComponents'>
                    <ReactPlayer
                        url={url}
                        playing={isPlaying}
                        controls={true}
                        width='100%'
                        height='100%'
                        onProgress={onProgress}
                        volume={volume}
                        onDuration={onDuration}
                        ref={playerRef}
                    />
                    <div className="playerTimeLine">
                        <input
                            type="range"
                            min={0}
                            max={duration}
                            step='any'
                            value={played}
                            onChange={onSeekChange}
                            onMouseDown={onSeekMouseDown}
                            onMouseUp={onSeekMouseUp}
                        />
                        <div className="playerTimeInfo">
                            {formatTime(played)} / {formatTime(duration)}
                        </div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step='any'
                        value={volume}
                        onChange={onVolumeChange}
                    />
                    <button onClick={togglePlayPause} className={`playerPlayStopButton ${isPlaying ? 'pause' : 'play'}`}></button>
                    <button
                        onClick={toggleLoop}
                        className={`playerSpecialButton loop ${loopState === loopStates.NO_LOOP ? 'unpressed' : loopState === loopStates.PLAYLIST_LOOP ? 'pressed' : 'pressed-loop'}`}>
                    </button>
                </div>
            </div>
        </>
    );
}