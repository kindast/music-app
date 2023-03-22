import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import axios from "axios";
import "./artist.scss";

function Artist() {
  const [artist, setArtist] = useState(null);
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { playlistId } = useSelector((state) => state.queue);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://localhost:44332/api/artist?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setArtist(res.data);
        } else {
          navigate("/*");
        }
      })
      .catch((err) => {
        navigate("/*");
      });
  }, [token]);

  return (
    <div className="artist">
      <div
        className="artist__header"
        style={{
          backgroundImage: `${
            artist?.avatar != null ? `url(${artist?.avatar})` : "none"
          }`,
        }}
      >
        <Header />
        <div className="artist__name">{artist?.name}</div>
      </div>
      <div className="artist__content">
        <div className="artist__albums">
          <div className="albums__header">Discography</div>
          <div className="albums__cards">
            {artist?.albums.map((album) => {
              return (
                <div
                  className="album__card"
                  key={album.id}
                  onClick={() => {
                    navigate(`/album/${album.id}`);
                  }}
                >
                  <img src={album.cover} />
                  <div className="album__card__name">
                    <span
                      style={
                        playlistId != null && album.id === playlistId
                          ? { color: "#1ed760" }
                          : undefined
                      }
                    >
                      {album.name}
                    </span>
                    <span>{album.year} • Album</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
