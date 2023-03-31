import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setQueueId,
  setIsPlaying,
  setLikeSong,
} from "../../redux/slices/queueSlice";
import axios from "axios";
import "./player.scss";
import { domain } from "../../variables";

function Player() {
  const { songs, queueId, isPlaying } = useSelector((state) => state.queue);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const volumeValue = window.localStorage.getItem("volume");
    setVolume(volumeValue ? volumeValue : 100);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    window.localStorage.setItem("volume", volume);
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio.src !== songs[queueId].source) {
      audio.src = songs[queueId].source;
      setProgress(0);
      setMaxProgress(audio.duration);
      document.title = `${songs[queueId].name} • ${songs[queueId].artists[0]?.name}`;
      if (isPlaying) {
        audio.play();
      }
    }
  }, [queueId, songs]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!isPlaying) {
      audio.pause();
      document.title = "MusicBox";
    } else {
      audio.play();
      document.title = `${songs[queueId].name} • ${songs[queueId].artists[0]?.name}`;
    }
  }, [isPlaying]);

  const onEnded = () => {
    if (queueId === songs.length - 1) {
      dispatch(setIsPlaying(false));
    } else {
      dispatch(setQueueId(queueId + 1));
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    dispatch(setIsPlaying(!isPlaying));
  };

  const previousSong = () => {
    if (progress > 5) {
      const audio = audioRef.current;
      setProgress(0);
      audio.currentTime = 0;
      return;
    }
    if (queueId === 0) {
      const audio = audioRef.current;
      setProgress(0);
      audio.currentTime = 0;
      return;
    }
    dispatch(setQueueId(queueId - 1));
  };

  const nextSong = () => {
    if (queueId === songs.length - 1) {
      return;
    }
    dispatch(setQueueId(queueId + 1));
  };

  const updateTime = () => {
    const audio = audioRef.current;
    setProgress(audio.currentTime);
    setMaxProgress(audio.duration);
  };

  const changeProgress = (event) => {
    const audio = audioRef.current;
    setProgress(event.target.value);
    audio.currentTime = event.target.value;
  };

  const changeVolume = (event) => {
    setVolume(event.target.value);
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const likeSong = (song) => {
    axios
      .get(`${domain}/api/like-song?id=${song.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setLikeSong(song.id));
        }
      });
  };

  return (
    <div className="player">
      <audio
        ref={audioRef}
        onCanPlay={updateTime}
        onTimeUpdate={updateTime}
        onEnded={onEnded}
      >
        <source src={songs[queueId].source} type="audio/mp3" />
      </audio>
      <div className="player__song-info">
        <img src={songs[queueId].album.cover} alt="cover" />
        <div className="player__song-info__song-name">
          <span
            onClick={() => {
              navigate(`/album/${songs[queueId].album.id}`);
            }}
          >
            {songs[queueId].name}
          </span>
          <br />
          <span
            onClick={() => {
              navigate(`/artist/${songs[queueId].artists[0]?.id}`);
            }}
          >
            {songs[queueId].artists[0]?.name}
          </span>
        </div>
        {songs[queueId].isLiked ? (
          <svg
            height="16"
            width="16"
            viewBox="0 0 16 16"
            fill="#1ed760"
            onClick={() => {
              likeSong(songs[queueId]);
            }}
          >
            <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path>
          </svg>
        ) : (
          <svg
            height="16"
            width="16"
            viewBox="0 0 16 16"
            fill="#b3b3b3"
            onClick={() => {
              likeSong(songs[queueId]);
            }}
          >
            <path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path>
          </svg>
        )}
      </div>
      <div className="player__controls">
        <div className="player__buttons">
          <div className="player__skip-btn" onClick={previousSong}>
            <svg height="16" width="16" viewBox="0 0 16 16">
              <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
            </svg>
          </div>
          <div className="player__play-btn" onClick={togglePlay}>
            {isPlaying ? (
              <svg height="16" width="16" viewBox="0 0 16 16">
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
              </svg>
            ) : (
              <svg height="16" width="16" viewBox="0 0 16 16">
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
              </svg>
            )}
          </div>
          <div className="player__skip-btn" onClick={nextSong}>
            <svg height="16" width="16" viewBox="0 0 16 16">
              <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
            </svg>
          </div>
        </div>
        <div className="player__seekbar">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            id="progress"
            max={maxProgress}
            value={progress}
            onChange={changeProgress}
          />
          <span>{formatTime(maxProgress)}</span>
        </div>
      </div>
      <div className="player__volume">
        {volume === 0 ? (
          <svg height="16" width="16" viewBox="0 0 16 16">
            <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
            <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
          </svg>
        ) : (
          <svg height="16" width="16" viewBox="0 0 16 16">
            <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
            <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
          </svg>
        )}

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={changeVolume}
        />
      </div>
    </div>
  );
}

export default Player;
