import React, { useRef, useState } from 'react';
import './styles/app.scss';
//Adding Components
import Player from './components/Player';
import Song from './components/Song';
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';


function App() {

    const audioRef = useRef(null);
    //State
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    //Toggle library 
    const [libraryStatus, setLibraryStatus] = useState(false);
    const timeUpdateHandler = e => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        //calculate percentage of current time
        const roundedCurrent = Math.round(current);
        const roundedDurations = Math.round(duration);
        const animatedPercentage = Math.round((roundedCurrent / roundedDurations) * 100);

        setSongInfo({
            ...songInfo, currentTime: current, duration, animationPercentage: animatedPercentage,
        });
    };
    //skips to the next track when song ends
    const songEndHandler = async () => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        if (isPlaying) audioRef.current.play();
    }
    return (
        <div className='App'>
            <Nav
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
            />
            <Song currentSong={currentSong} />
            <Player
                setSongs={setSongs}
                audioRef={audioRef}
                currentSong={currentSong}
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
                setSongInfo={setSongInfo}
                songInfo={songInfo}
                songs={songs}
                setCurrentSong={setCurrentSong}
            />
            <Library
                libraryStatus={libraryStatus}
                songs={songs}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs}
            />
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndHandler}
            ></audio>
        </div>
    );
}

export default App;
