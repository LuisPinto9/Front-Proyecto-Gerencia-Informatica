import Topbar from "../../components/topbar/Topbar";
import Perfil from "../../components/rightbar/Perfil";
import Feed2 from "../../components/feed/Feed2/";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function Profile() {
  const [user, setUser] = useState({});
  const [imagens] = useState("/images/person/");
  const homeStatus = false;

  const username = useParams().username;

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

  return (
    <>
      <Topbar username={JSON.parse(localStorage.getItem("username"))[0]} />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={imagens + "1 copy.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || imagens + "4.jpeg"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.email}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Perfil user={user} setUser={setUser}/>
            <Feed2 user={user} homeStatus={homeStatus} />
            {console.log("prfoile", user.username)}
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
