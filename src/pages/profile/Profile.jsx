import Topbar from "../../Components/topbar/Topbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import Feed2 from "../../Components/feed/Feed2";
import Rightbar from "../../Components/rightbar/Rightbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function Profile() {
  const [user, setUser] = useState({});
  const [imagens] = useState("/images/person/");

  const username = useParams().username;

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
        console.log("Fetch error:", error);
      });
  }, [username]);

  return (
    <>
      <Topbar user={user} />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={imagens + "1.jpeg"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || imagens + "1.jpeg"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.email}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed2 user={user} />
            {
              console.log("prfoile",user.username)
            }
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
