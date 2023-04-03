import "./scss/app.scss";
import Player from "./components/Player";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import PlaylistPage from "./components/Pages/PlaylistPage";
import LikedSongsPage from "./components/Pages/LikedSongsPage";
import Home from "./components/Pages/Home";
import Search from "./components/Pages/Search";
import Library from "./components/Pages/Library";
import NotFound from "./components/Pages/NotFound";
import Authorization from "./components/Pages/Authorization";
import Registration from "./components/Pages/Registration";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadToken, setToken } from "./redux/slices/authSlice";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Artist from "./components/Pages/Artist";
import { domain } from "./variables";

function App() {
  const { token } = useSelector((state) => state.auth);
  const { songs } = useSelector((state) => state.queue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadToken());
    axios
      .get(`${domain}/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (token !== null && res.status === 401) {
          dispatch(setToken(null));
        }
      });
  }, [token]);

  return token ? (
    <div className="wrapper">
      <div className="main">
        <SideBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/songs" element={<LikedSongsPage />} />
            <Route path="/album/:id" element={<PlaylistPage />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      {songs && <Player />}
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<Authorization />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Authorization />} />
    </Routes>
  );
}

export default App;
