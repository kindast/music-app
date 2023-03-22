import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  setIsPlaying,
  setQueueId,
  setPlaylist,
  setSongs,
  setLikeSong,
  setPlaylistId,
} from "../../../redux/slices/queueSlice";
import Header from "../../Header";
import "./playlist-page.scss";

function PlaylistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const { playlist, playlistId, queueId, isPlaying } = useSelector(
    (state) => state.queue
  );
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setPlaylist(null));
    };
  }, []);

  useEffect(() => {
    axios
      .get(`https://localhost:44332/api/album?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setPlaylist(res.data));
          setIsLiked(res.data.isLiked);
        } else {
          navigate("/*");
        }
      })
      .catch((err) => {
        navigate("/*");
      });
  }, [token]);

  const likeAlbum = () => {
    axios
      .get(`https://localhost:44332/api/like-album?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLiked(!isLiked);
        }
      });
  };

  const likeSong = (song) => {
    axios
      .get(`https://localhost:44332/api/like-song?id=${song.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setLikeSong(song.id));
        }
      });
  };

  return (
    <div
      className="playlist"
      style={{
        background: `linear-gradient(to bottom, #${
          playlist?.color != "" ? playlist?.color : "b8b8b8"
        }, 30%, black)`,
      }}
    >
      <Header />
      <div className="playlist__header">
        <img src={playlist?.cover} alt={playlist?.name} />
        <div className="playlist__info">
          <span>Album</span>
          <span className="info__name">{playlist?.name}</span>
          <span>
            {playlist?.artist} • {playlist?.year}
          </span>
        </div>
      </div>
      <div className="playlist__controls">
        {playlistId != null && playlist.id === playlistId && isPlaying ? (
          <div
            className="playlist__play-btn"
            onClick={() => {
              dispatch(setIsPlaying(false));
            }}
          >
            <svg height="28" width="28" viewBox="0 0 24 24">
              <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
            </svg>
          </div>
        ) : (
          <div
            className="playlist__play-btn"
            onClick={() => {
              dispatch(setSongs(playlist?.songs));
              dispatch(setPlaylistId(playlist?.id));
              dispatch(setQueueId(0));
              dispatch(setIsPlaying(true));
            }}
          >
            <svg height="28" width="28" viewBox="0 0 24 24">
              <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
            </svg>
          </div>
        )}
        <div className="playlist__like-btn" onClick={likeAlbum}>
          {isLiked ? (
            <svg height="32" width="32" viewBox="0 0 24 24">
              <path
                fill="#1ed760"
                d="M8.667 1.912a6.257 6.257 0 0 0-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 0 0 3.09 0l7.956-9.482a6.188 6.188 0 0 0 1.382-5.234l-.49.097.49-.099a6.303 6.303 0 0 0-5.162-4.98h-.002a6.24 6.24 0 0 0-5.295 1.65.623.623 0 0 1-.848 0 6.257 6.257 0 0 0-2.91-1.568z"
              ></path>
            </svg>
          ) : (
            <svg height="32" width="32" viewBox="0 0 24 24">
              <path
                fill="#b3b3b3"
                d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z"
              ></path>
            </svg>
          )}
        </div>
      </div>
      <div className="playlist__songs">
        <div className="playlist__songs-header">
          <span>#</span>
          <span>TITLE</span>
          <span>
            <svg height="16" width="16" viewBox="0 0 16 16">
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
              <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
            </svg>
          </span>
        </div>
        {playlist?.songs.map((song, index) => {
          return (
            <div className="playlist__song" key={song.id}>
              <div className="song__number">
                <span
                  className={
                    playlistId != null &&
                    playlist.id === playlistId &&
                    index === queueId
                      ? "song__active"
                      : "song__number__inactive"
                  }
                >
                  {index + 1}
                </span>
                {playlistId != null &&
                playlist.id === playlistId &&
                index === queueId &&
                isPlaying ? (
                  <svg
                    height="14"
                    width="14"
                    viewBox="0 0 16 16"
                    onClick={() => {
                      dispatch(setIsPlaying(false));
                    }}
                  >
                    <path
                      d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"
                      fill="white"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    onClick={() => {
                      dispatch(setSongs(playlist?.songs));
                      dispatch(setPlaylistId(playlist.id));
                      dispatch(setQueueId(index));
                      dispatch(setIsPlaying(true));
                    }}
                    height="14"
                    width="14"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
                      fill="white"
                    ></path>
                  </svg>
                )}
              </div>
              <div className="song__name">
                <span
                  className={
                    playlistId != null &&
                    playlist.id === playlistId &&
                    index === queueId
                      ? "song__active"
                      : "song__name__inactive"
                  }
                >
                  {song.name}
                </span>
                <span>{song.artist.name}</span>
              </div>
              <div className="song__end">
                {song.isLiked ? (
                  <svg
                    height="16"
                    width="16"
                    viewBox="0 0 16 16"
                    fill="#1ed760"
                    onClick={() => likeSong(song, index)}
                  >
                    <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path>
                  </svg>
                ) : (
                  <svg
                    height="16"
                    width="16"
                    viewBox="0 0 16 16"
                    fill="#b3b3b3"
                    onClick={() => likeSong(song, index)}
                  >
                    <path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path>
                  </svg>
                )}
                <span className="song__duration">{song.duration}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlaylistPage;
