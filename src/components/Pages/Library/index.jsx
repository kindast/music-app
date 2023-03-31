import React, { useEffect } from "react";
import "./library.scss";
import Header from "../../Header";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { domain } from "../../../variables";

function Library() {
  const [likedAlbums, setLikedAlbums] = React.useState();
  const { token } = useSelector((state) => state.auth);
  const { playlist, playlistId } = useSelector((state) => state.queue);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${domain}/api/liked-albums`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setLikedAlbums(res.data);
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
        {likedAlbums?.map((album) => {
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
                    playlistId != null && playlistId === album.id
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
