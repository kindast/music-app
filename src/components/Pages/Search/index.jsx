import { useEffect, useState } from "react";
import "./search.scss";
import axios from "axios";
import Header from "../../Header";
import { useSelector, useDispatch } from "react-redux";
import { domain } from "../../../variables";
import { useNavigate } from "react-router-dom";
import {
  setIsPlaying,
  setQueueId,
  setPlaylist,
  setSongs,
  setLikeSong,
  setPlaylistId,
} from "../../../redux/slices/queueSlice";
let timeoutId;

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [typeId, setTypeId] = useState(0);
  const [result, setResult] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { playlistId, queueId, isPlaying } = useSelector(
    (state) => state.queue
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (playlistId === -1) {
      dispatch(setPlaylistId(null));
    }
    handleInput();
  }, [searchValue, typeId]);

  const handleInput = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      if (searchValue !== "") {
        axios
          .get(`${domain}/api/search?type=${typeId}&name=${searchValue}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            if (res.status === 200) {
              setResult(res.data);
            }
          });
      } else {
        setResult(null);
      }
    }, 200);
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
    <div className="search">
      <Header />
      <div className="search__params">
        <div className="search__input">
          <input
            maxLength="100"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder="What do you want to hear?"
            value={searchValue}
            onInput={(event) => setSearchValue(event.target.value)}
          />
          <svg height="24" width="24" viewBox="0 0 24 24">
            <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
          </svg>
        </div>
        <div className="search__types">
          <div
            className={typeId === 0 ? "search__type__active" : "search__type"}
            onClick={() => {
              setTypeId(0);
              setResult(null);
            }}
          >
            Songs
          </div>
          <div
            className={typeId === 1 ? "search__type__active" : "search__type"}
            onClick={() => {
              setTypeId(1);
              setResult(null);
            }}
          >
            Albums
          </div>
          <div
            className={typeId === 2 ? "search__type__active" : "search__type"}
            onClick={() => {
              setTypeId(2);
              setResult(null);
            }}
          >
            Artists
          </div>
        </div>
      </div>
      {typeId === 0 && (
        <div className="playlist__songs">
          {result?.length > 0 && (
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
          )}
          {result?.map((song, index) => {
            return (
              <div className="playlist__song" key={song.id}>
                <div className="song__number">
                  <span
                    className={
                      playlistId != null &&
                      playlistId === -1 &&
                      index === queueId
                        ? "song__active"
                        : "song__number__inactive"
                    }
                  >
                    {index + 1}
                  </span>
                  {playlistId != null &&
                  playlistId === -1 &&
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
                        dispatch(setSongs(result));
                        dispatch(setPlaylistId(-1));
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
                      playlistId === -1 &&
                      index === queueId
                        ? "song__active"
                        : "song__name__inactive"
                    }
                  >
                    {song.name}
                  </span>
                  <span
                    className="artist__link"
                    onClick={() => navigate(`/artist/${song.artists[0]?.id}`)}
                  >
                    {song.artists[0]?.name}
                  </span>
                </div>
                <div className="song__end">
                  {/* {song.isLiked ? (
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
                  )} */}
                  <span className="song__duration">{song.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {typeId === 1 && (
        <div className="search__albums">
          {result?.map((album) => {
            return (
              <div
                className="search__album"
                key={album.id}
                onClick={() => {
                  navigate(`/album/${album.id}`);
                }}
              >
                <img src={album.cover} />
                <div className="search__album__name">
                  <span>{album.name}</span>
                  <span>{album.artist.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {typeId === 2 && (
        <div className="search__artists">
          {result?.map((artist) => {
            return (
              <div
                className="search__artist"
                key={artist.id}
                onClick={() => {
                  navigate(`/artist/${artist.id}`);
                }}
              >
                <img src={artist.avatarUrl} />
                <div className="search__artist__name">
                  <span>{artist.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {result?.length === 0 && (
        <div className="search__notfound">
          <span>No results found for "{searchValue}"</span>
          <span>Check for typos, shorten the request or rephrase it.</span>
        </div>
      )}
    </div>
  );
}

export default Search;
