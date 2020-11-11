import React, { useState } from 'react';
import './styles/app.scss';
//Adding Components
import Player from './components/Player';
import Song from './components/Song';
import data from './util';
import Library from './components/Library';


function App() {
    //State
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className='App'>
            <Song currentSong={currentSong} />
            <Player
                currentSong={currentSong}
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
            />
            <Library songs={songs} />
        </div>
    );
}

export default App;
