import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import Chat from "@mui/icons-material/Chat";
import Notifications from "@mui/icons-material/Notifications";

export default function Topbar({ username }) {
  const [user, setUser] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [imagens] = useState("/images/person/");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users?username=${username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("ok");
        }
        return res.json();
      })
      .then((result) => {
        setUser(result);
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  }, [username]);

  const handleSearch = async (e) => {
    setSearchText(e.target.value);
    if (e.target.value.length > 0) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/search?username=${
            e.target.value
          }`
        );
        if (!res.ok) {
          throw new Error("Search failed");
        }
        const results = await res.json();
        setSearchResults(results);
      } catch (err) {
        console.error("Search error:", err);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = () => {
    setSearchText("");
    setSearchResults([]);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to={`/home`} style={{ textDecoration: "none" }}>
          <span className="logo">Handy</span>
          <span className="logo1">Fix</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Busca negocios o personas"
            className="searchInput"
            value={searchText}
            onChange={handleSearch}
          />
          {searchResults.length > 0 && (
            <div className="searchResults">
              {searchResults.map((result) => (
                <Link
                  key={result._id}
                  to={`/profile/${result.username}`}
                  onClick={handleResultClick}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="searchResultItem">
                    <img
                      src={result.profilePicture || imagens + "4.jpeg"}
                      alt=""
                      className="searchResultImg"
                    />
                    <span className="searchResultName">{result.username}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to={`/home`} style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink">Inicio</span>
          </Link>
          <span className="topbarLink">Historial</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to={`/profile/${user.username}`}>
            <div className="topbarIconItem">
              <img
                src={user.profilePicture || imagens + "4.jpeg"}
                alt=""
                className="topbarImg"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
