import { useEffect, useState } from "react";
import "./search.scss";
import axios from "axios";
import Header from "../../Header";
import { useSelector } from "react-redux";
import { domain } from "../../../variables";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [typeId, setTypeId] = useState(0);
  const [result, setResult] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${domain}/api/search?type=${typeId}&name=${searchValue}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
        }
      });
  }, [searchValue, typeId]);

  return (
    <div className="search">
      <Header />
      <div className="search__params">
        <div className="search__input">
          <input
            maxLength="100"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder="What do you want to hear?"
            value={searchValue}
            onInput={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <div className="search__types">
          <div
            className={typeId === 0 ? "search__type__active" : "search__type"}
            onClick={() => setTypeId(0)}
          >
            Songs
          </div>
          <div
            className={typeId === 1 ? "search__type__active" : "search__type"}
            onClick={() => setTypeId(1)}
          >
            Albums
          </div>
          <div
            className={typeId === 2 ? "search__type__active" : "search__type"}
            onClick={() => setTypeId(2)}
          >
            Artists
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
