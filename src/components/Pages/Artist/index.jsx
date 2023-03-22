import { useEffect } from "react";
import Header from "../../Header";
import "./artist.scss";

function Artist() {
  return (
    <div className="artist">
      <div className="artist__header">
        <Header />
        <div className="artist__name">Skillet</div>
      </div>
      <div className="artist__content"></div>
    </div>
  );
}

export default Artist;
