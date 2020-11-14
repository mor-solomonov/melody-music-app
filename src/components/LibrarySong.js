import React from 'react';
import { playAudio } from '../util';

const LibrarySong = ({ song, songs, setCurrentSong, audioRef, isPlaying, id, setSongs }) => {

    const songSelectHandler = () => {
        setCurrentSong(song);
        //Add Active state
        const newSongs = songs.map((song) => {
            if (song.id === id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs)

        //check if the song is playing
        //if the clicked item is still undefined wait until it loads .then play
        //without this condition the audioref will not play
        //playAudio is the same function - exported from util
        playAudio(isPlaying, audioRef);

        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then((audio) =>
                    audioRef.current.play())
            }
        }
    }
    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;