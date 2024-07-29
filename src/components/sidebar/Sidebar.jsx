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
  const [followersOfFollowings, setFollowersOfFollowings] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        const username = JSON.parse(localStorage.getItem("username"))[0];
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users?username=${username}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        const user = await res.json();
        setCurrentUserId(user._id);
        const followingsRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${user._id}/getFollows`);
        if (!followingsRes.ok) {
          throw new Error("Failed to fetch followings");
        }
        const followingsData = await followingsRes.json();
        setFollowings(followingsData);

        const followersData = await Promise.all(followingsData.map(async (f) => {
          const followersRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${f._id}/getFollowers`);
          if (!followersRes.ok) {
            throw new Error("Failed to fetch followers of followings");
          }
          return followersRes.json();
        }));

        // Flatten the array of arrays and filter out duplicates and already followed users
        const uniqueFollowers = Array.from(new Set(followersData.flat().map(a => a._id)))
          .map(id => followersData.flat().find(a => a._id === id))
          .filter(follower => !followingsData.some(f => f._id === follower._id) && follower._id !== user._id);
        setFollowersOfFollowings(uniqueFollowers);
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
        <h4 className="sidebarTitle">Amigos</h4>
        <ul className="sidebarFriendList">
          {followings.map((u) => (
            <Link to={`/profile/${u.username}`} key={u._id} style={{ textDecoration: "none", color: "inherit" }}>
              <CloseFriend user={u} />
            </Link>
          ))}
        </ul>
        <h4 className="sidebarTitle">Amigos de mis amigos</h4>
        <ul className="sidebarFriendList">
          {followersOfFollowings.map((u) => (
            <Link to={`/profile/${u.username}`} key={u._id} style={{ textDecoration: "none", color: "inherit" }}>
              <CloseFriend user={u} />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
