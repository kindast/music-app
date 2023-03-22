import axios from "axios";
import React from "react";
import "./authorization.scss";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Authorization() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();

  const Login = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post(
        `https://localhost:44332/api/auth?username=${username}&password=${password}`
      )
      .then((res) => {
        dispatch(setToken(res.data.access_token));
      });
  };

  return (
    <div className="login">
      <div className="login__form">
        <span>MusicBox</span>
        <label>Email or username</label>
        <input ref={usernameRef} type="text" placeholder="Email or username" />
        <label>Password</label>
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button onClick={Login}>LOGIN</button>
      </div>
      <div className="login__bottom">
        <label>Don't have an account?</label>
        <button onClick={() => navigate("/registration")}>
          REGISTRATION IN MUSICBOX
        </button>
      </div>
    </div>
  );
}

export default Authorization;
