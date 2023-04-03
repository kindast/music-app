import axios from "axios";
import React, { useState } from "react";
import "./registration.scss";
import { useDispatch, useSelector } from "react-redux";
import { setToken, saveToken } from "../../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { domain } from "../../../variables";

function Authorization() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (email) => {
    setEmailError("");
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    !pattern.test(email) &&
      setEmailError(
        "Email address is invalid. Make sure it is in this format: example@email.com."
      );
    email === "" && setEmailError("Enter email.");
  };

  const validateUsername = (username) => {
    setUsernameError("");
    username.length < 4 && setUsernameError("Username is too short.");
    username === "" && setUsernameError("Enter username.");
  };

  const validatePassword = (password) => {
    setPasswordError("");
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    password.length < 8 && setPasswordError("Password is too short.");
    !regex.test(password) &&
      setPasswordError(
        "The password must be at least 8 characters long, including at least one uppercase letter, one lowercase letter, and one number."
      );
    password === "" && setPasswordError("Enter password.");
  };

  const validateConfirmPassword = (confirmPassword) => {
    setConfirmPasswordError("");
    confirmPassword !== password &&
      setConfirmPasswordError("Password mismatch.");
    confirmPassword === "" && setConfirmPasswordError("Enter password again.");
  };

  const validateForm = () => {
    validateEmail(email);
    validateUsername(username);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);
    if (emailError || usernameError || passwordError || confirmPasswordError)
      return false;
    else return true;
  };

  const registration = () => {
    if (validateForm()) {
      axios
        .post(
          `${domain}/api/register?username=${username}&password=${password}&email=${email}`
        )
        .then((res) => {
          navigate("/");
        });
    }
  };

  const handleEmailChange = (event) => {
    validateEmail(event.target.value);
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    validateUsername(event.target.value);
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    validatePassword(event.target.value);
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    validateConfirmPassword(event.target.value);
    setConfirmPassword(event.target.value);
  };

  return (
    <div className="registration">
      <div className="registration__form">
        <span className="registration__name">MusicBox</span>
        <h1>Register and listen for free</h1>
        <label>Email</label>
        <input
          className={emailError ? "form__error-input" : undefined}
          value={email}
          onChange={handleEmailChange}
          type="text"
          placeholder="Enter email"
        />
        {emailError && (
          <div className="form__error">
            <svg height="16" width="16" viewBox="0 0 16 16">
              <path d="M0 8a8 8 0 1116 0A8 8 0 010 8zm7.25-5v7h1.5V3h-1.5zm0 8.526v1.5h1.5v-1.5h-1.5z"></path>
            </svg>
            <span>{emailError}</span>
          </div>
        )}
        <label>Username</label>
        <input
          className={usernameError ? "form__error-input" : undefined}
          value={username}
          onChange={handleUsernameChange}
          type="text"
          placeholder="Enter username"
        />
        {usernameError && (
          <div className="form__error">
            <svg height="16" width="16" viewBox="0 0 16 16">
              <path d="M0 8a8 8 0 1116 0A8 8 0 010 8zm7.25-5v7h1.5V3h-1.5zm0 8.526v1.5h1.5v-1.5h-1.5z"></path>
            </svg>
            <span>{usernameError}</span>
          </div>
        )}
        <label>Password</label>
        <input
          className={passwordError ? "form__error-input" : undefined}
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder="Enter password"
        />
        {passwordError && (
          <div className="form__error">
            <svg height="16" width="16" viewBox="0 0 16 16">
              <path d="M0 8a8 8 0 1116 0A8 8 0 010 8zm7.25-5v7h1.5V3h-1.5zm0 8.526v1.5h1.5v-1.5h-1.5z"></path>
            </svg>
            <span>{passwordError}</span>
          </div>
        )}
        <label>Confirm password</label>
        <input
          className={confirmPasswordError ? "form__error-input" : undefined}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          type="password"
          placeholder="Enter password again"
        />
        {confirmPasswordError && (
          <div className="form__error">
            <svg height="16" width="16" viewBox="0 0 16 16">
              <path d="M0 8a8 8 0 1116 0A8 8 0 010 8zm7.25-5v7h1.5V3h-1.5zm0 8.526v1.5h1.5v-1.5h-1.5z"></path>
            </svg>
            <span>{confirmPasswordError}</span>
          </div>
        )}
        <button onClick={registration}>REGISTER</button>
        <div className="registration__bottom">
          <label>Already have an account?</label>
          <Link to="/">Login</Link>.
        </div>
      </div>
    </div>
  );
}

export default Authorization;
