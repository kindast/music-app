import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import "./header.scss";
import {
  addRoute,
  nextRoute,
  previousRoute,
} from "../../redux/slices/historySlice";
import { domain } from "../../variables";

function Header() {
  const { token, user } = useSelector((state) => state.auth);
  const { routes, routeId } = useSelector((state) => state.history);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef();

  useEffect(() => {
    dispatch(addRoute(location.pathname));
    if (user === null) {
      axios
        .get(`${domain}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 401) {
            dispatch(setToken(null));
          } else {
            dispatch(setUser(res.data));
          }
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK") {
            dispatch(setToken(null));
            navigate("/");
          }
        });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logOut = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    setIsOpen(false);
    navigate("/");
  };

  return (
    <div className="header">
      {/* <div className="header__history-buttons">
        <div
          className={
            "header__history-button " +
            (routes.length > 1 && routeId > 0
              ? "header__history-active"
              : "header__history-inactive")
          }
          onClick={() => {
            dispatch(previousRoute(navigate));
            navigate(routes[routeId]);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
            <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path>
          </svg>
        </div>
        <div
          className={
            "header__history-button " +
            (routes.length > 1 && routeId < routes.length - 1
              ? "header__history-active"
              : "header__history-inactive")
          }
          onClick={() => {
            dispatch(nextRoute());
            navigate(routes[routeId]);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
            <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path>
          </svg>
        </div>
      </div> */}
      <div className="header__space"></div>
      <div className="header__profile" ref={profileRef}>
        <div
          className="header__user"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {user?.username}
          {isOpen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="M14 10 8 4l-6 6h12z"></path>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="m14 6-6 6-6-6h12z"></path>
            </svg>
          )}
        </div>
        {isOpen && (
          <div className="header__popup">
            <div>Profile</div>
            <div onClick={logOut}>Log out</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
