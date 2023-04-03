import React from "react";
import { Link } from "react-router-dom";
import "./notfound.scss";

function NotFound() {
  return (
    <div className="notfound">
      <h1>Error 404</h1>
      <p>Unfortunately, the requested page was not found.</p>
      <p>
        You can go back to the <Link to="/">home page</Link>.
      </p>
    </div>
  );
}

export default NotFound;
