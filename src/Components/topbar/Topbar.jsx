import Search from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import Chat from "@mui/icons-material/Chat";
import Notifications from "@mui/icons-material/Notifications";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Topbar({ username }) {
  const [user, setUser] = useState({});
  const [imagens] = useState("/images/person/");

  useEffect(() => {
    fetch(`http://localhost:4000/api/users?username=${username}`)
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
        // console.log('Fetch error:', error);
      });
  }, [username]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link
          to={`http://localhost:3000/home`}
          style={{ textDecoration: "none" }}
        >
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
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Inicio</span>
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
          <Link to={`http://localhost:3000/profile/${user.username}`}>
            <div className="topbarIconItem">
              <img
                src={user.profilePicture || imagens + "1.png"}
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
