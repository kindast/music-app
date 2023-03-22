import React from "react";
import { Link } from "react-router-dom";
import "./notfound.scss";

function NotFound() {
  return (
    <div className="notfound">
      Not Found
      <Link to="/">
        <br />
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
