import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setIsPlaying,
  setQueueId,
  setPlaylist,
  setPlaylistId,
  setSongs,
  setLikeSong,
  removeSong,
} from "../../../redux/slices/queueSlice";
import Header from "../../Header";
import "./playlist-page.scss";

const likedPlaylist = {
  id: 0,
  name: "Liked Songs",
  artist: "You",
  cover: "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png",
};

function LikedSongsPage() {
  const navigate = useNavigate();
  const { playlist, playlistId, queueId, isPlaying } = useSelector(
    (state) => state.queue
  );
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://localhost:44332/api/liked-songs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          const songs = res.data.songs;
          dispatch(setPlaylist({ ...likedPlaylist, songs }));
        } else {
          navigate("/*");
        }
      });
  }, []);

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
    <div className="playlist">
      <Header />
      <div className="playlist__header">
        <img src={playlist?.cover} alt={playlist?.name} />
        <div className="playlist__info">
          <span>Playlist</span>
          <span className="info__name">{playlist?.name}</span>
          <span>{playlist?.artist}</span>
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
        {playlist?.songs?.map((song, index) => {
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
                      dispatch(setPlaylistId(playlist?.id));
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
                <span
                  className="artist__link"
                  onClick={() => navigate(`/artist/${song.artist.id}`)}
                >
                  {song.artist.name}
                </span>
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

export default LikedSongsPage;
