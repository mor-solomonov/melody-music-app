import React, { useRef, useState } from 'react';
import './styles/app.scss';
//Adding Components
import Player from './components/Player';
import Song from './components/Song';
import data from './util';
import Library from './components/Library';


function App() {

    const audioRef = useRef(null);
    //State
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    });
    const timeUpdateHandler = e => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({ ...songInfo, currentTime: current, duration });
    };
    return (
        <div className='App'>
            <Song currentSong={currentSong} />
            <Player
                audioRef={audioRef}
                currentSong={currentSong}
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
                setSongInfo={setSongInfo}
                songInfo={songInfo}
            />
            <Library
                songs={songs}
                setCurrentSong={setCurrentSong}
                songs={songs}
                audioRef={audioRef}
                isPlaying={isPlaying}
            />
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
            ></audio>
        </div>
    );
}

export default App;
