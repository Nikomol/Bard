import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";

import './player.css';

export default function Player({ music = undefined }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [repeat, setRepeat] = useState(false);
    const audioPlayer = useRef(null);

    const toggleRepeat = () => {
        setRepeat(!repeat);
    };

    useEffect(() => {
        const handleEnd = () => {
            if (repeat) {
                audioPlayer.current.currentTime = 0;
                audioPlayer.current.play();
            }
        };
    
        // Обновление длительности трека при загрузке метаданных
        const setAudioData = () => {
            setDuration(audioPlayer.current.duration);
        };
    
        // Добавление обработчиков событий
        audioPlayer.current.addEventListener('loadedmetadata', setAudioData);
        audioPlayer.current.addEventListener('ended', handleEnd);
    
        return () => {
            // Удаление обработчиков событий при размонтировании компонента
            audioPlayer.current.removeEventListener('loadedmetadata', setAudioData);
            audioPlayer.current.removeEventListener('ended', handleEnd);
        };
    }, [repeat]); // Зависимость от repeat гарантирует, что обработчик будет обновлен, если состояние repeat изменится
    


    const playPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
        } else {
            audioPlayer.current.pause();
        }
    };

    const onScrub = (value) => {
        setCurrentTime(value);
        audioPlayer.current.currentTime = value;
        if (!isPlaying) {
            audioPlayer.current.play();
            setIsPlaying(true);
        }
    };

    const onScrubEnd = () => {
        // If not playing, pause the audio and reset play state
        if (!isPlaying) {
            audioPlayer.current.pause();
            setIsPlaying(false);
        }
    };

    // Функция для форматирования времени в формате минуты:секунды
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
            <div className="playerContainer">
                <div className='playerComponents'>
                    <audio
                        ref={audioPlayer}
                        src="../../assets/music/V.mp3"
                        preload="metadata"
                        onTimeUpdate={() => setCurrentTime(audioPlayer.current.currentTime)}
                    ></audio>
                    <button onClick={playPause}>{isPlaying ? 'Pause' : 'Play'}</button>
                    <button onClick={toggleRepeat}>
                        {repeat ? 'Выключить повтор' : 'Включить повтор'}
                    </button>
                    <input
                        type="range"
                        value={currentTime}
                        step="1"
                        min="0"
                        max={audioPlayer.current?.duration || `${audioPlayer.current?.duration}`}
                        onChange={(e) => onScrub(e.target.value)}
                        onMouseUp={onScrubEnd}
                        onKeyUp={onScrubEnd}
                    />
                    <div>Время трека: {formatTime(currentTime)} / {formatTime(duration)}</div>
                </div>
            </div>
        </>
    );
}