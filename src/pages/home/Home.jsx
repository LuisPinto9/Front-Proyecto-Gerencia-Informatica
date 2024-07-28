import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { SaveLocalStorage } from "../../helpers/SaveLocalStorage";

export default function Home() {
  const location = useLocation();
  const [tokenSaved, setTokenSaved] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const homeStatus = true;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get("token") && !tokenSaved) {
      localStorage.clear();
      SaveLocalStorage("token", searchParams.get("token"));
      setTokenSaved(true);
    }
    if (searchParams.get("username") && !tokenSaved) {
      SaveLocalStorage("username", searchParams.get("username"));
    }
    if (JSON.parse(localStorage.getItem("username")) !== null) {
      setUsername(JSON.parse(localStorage.getItem("username"))[0]);
    }
  }, []);

  useEffect(() => {
    if (username) {
      fetch(`http://localhost:4000/api/users?username=${username}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Fetch failed");
          }
          return res.json();
        })
        .then((result) => {
          console.log("usuario final", result);
          setUser(result);
        })
        .catch((error) => {
          // console.log('Fetch error:', error);
        });
    }
  }, [username]);

  return (
    <>
      <Topbar username={username} />
      <div className="homeContainer">
        <Sidebar />
        <Feed user={user} homeStatus={homeStatus} />
        <Rightbar user={user} />
      </div>
      {/* {tokenSaved ? <div>Token saved successfully</div> : <div>Saving token...</div>}
      {user? <div> a</div> : <div>Saving token...</div>} */}
    </>
  );
}
