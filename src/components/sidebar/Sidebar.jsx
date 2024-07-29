import React, { useState, useEffect } from "react";
import RssFeed from "@mui/icons-material/RssFeed";
import Chat from "@mui/icons-material/Chat";
import PlayCircleFilledOutlined from "@mui/icons-material/PlayCircleFilledOutlined";
import Group from "@mui/icons-material/Group";
import Bookmark from "@mui/icons-material/Bookmark";
import HelpOutline from "@mui/icons-material/HelpOutline";
import WorkOutline from "@mui/icons-material/WorkOutline";
import Event from "@mui/icons-material/Event";
import School from "@mui/icons-material/School";
import { Link } from "react-router-dom";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        const username = JSON.parse(localStorage.getItem("username"))[0];
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users?username=${username}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        const user = await res.json();
        const followingsRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${user._id}/getFollows`);
        if (!followingsRes.ok) {
          throw new Error("Failed to fetch followings");
        }
        const followingsData = await followingsRes.json();
        setFollowings(followingsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFollowings();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Grupos</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Guardados</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Preguntas</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Trabajos</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Eventos</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Cursos</span>
          </li>
        </ul>
        <button className="sidebarButton">Mostrar Mas</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {followings.map((u) => (
            <Link to={`/profile/${u.username}`} key={u._id} style={{ textDecoration: "none", color: "inherit" }}>
              <CloseFriend user={u} />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
