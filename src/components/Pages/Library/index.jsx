import React, { useEffect } from "react";
import "./library.scss";
import Header from "../../Header";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Library() {
  const [liked, setLiked] = React.useState({ albums: [] });
  const { token } = useSelector((state) => state.auth);
  const playlist = useSelector((state) => state.queue.playlist);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:44332/api/liked-albums", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          const albumsObj = res.data;
          setLiked(albumsObj);
        } else {
          navigate("/*");
        }
      })
      .catch((err) => {
        navigate("/*");
      });
  }, [token]);

  return (
    <div className="library">
      <Header />
      <div className="library__header">Albums</div>
      <div className="library__cards">
        {liked.albums.map((album) => {
          return (
            <div
              className="library__card"
              key={album.id}
              onClick={() => {
                navigate(`/album/${album.id}`);
              }}
            >
              <img src={album.cover} />
              <div className="library__card__name">
                <span
                  style={
                    playlist != null && playlist.id === album.id
                      ? { color: "#1ed760" }
                      : undefined
                  }
                >
                  {album.name}
                </span>
                <span>{album.artist.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Library;
