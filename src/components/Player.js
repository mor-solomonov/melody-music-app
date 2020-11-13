import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause
} from '@fortawesome/free-solid-svg-icons';

const Player = ({ audioRef, setCurrentSong, currentSong, isPlaying, setIsPlaying, setSongInfo, songInfo, songs }) => {
  //Ref

  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = time => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value })
  };

  const skipTrackHandler = (direction) => {
    //find the index of the current song
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      //if the same index number> modulus 0 > go back to index 0
      setCurrentSong(songs[(currentIndex + 1) % songs.length])
    }
    if (direction === "skip-back") {
      //applies for 0 index > since there is no -1 index
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length])
    }
  }

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          onChange={dragHandler}
          value={songInfo.currentTime}
          type='range' />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className='skip-back'
          size='2x'
          icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className='skip-forward'
          size='2x'
          icon={faAngleRight}
        />
      </div>

    </div>
  );
};

export default Player;
