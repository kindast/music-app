import axios from "axios";
import React from "react";
import "./registration.scss";
import { useDispatch, useSelector } from "react-redux";
import { setToken, saveToken } from "../../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { domain } from "../../../variables";

function Authorization() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const emailRef = React.useRef();
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();

  const Registration = () => {
    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password === confirmPassword) {
      axios
        .post(
          `${domain}/api/register?username=${username}&password=${password}&email=${email}`
        )
        .then((res) => {
          console.log(res.data);
          navigate("/");
        });
    }
  };

  return (
    <div className="registration">
      <div className="registration__form">
        <span>MusicBox</span>
        <h1>Register and listen for free</h1>
        <label>Email</label>
        <input ref={emailRef} type="text" placeholder="Enter email" />
        <label>Username</label>
        <input ref={usernameRef} type="text" placeholder="Enter username" />
        <label>Password</label>
        <input ref={passwordRef} type="password" placeholder="Enter password" />
        <label>Confirm password</label>
        <input
          ref={confirmPasswordRef}
          type="password"
          placeholder="Enter password again"
        />
        <button onClick={Registration}>REGISTER</button>
        <div className="registration__bottom">
          <label>Already have an account?</label>
          <Link to="/">Login</Link>.
        </div>
      </div>
    </div>
  );
}

export default Authorization;
