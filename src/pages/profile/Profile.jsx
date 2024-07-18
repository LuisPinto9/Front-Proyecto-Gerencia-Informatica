import Topbar from "../../Components/topbar/Topbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import Feed2 from "../../Components/feed/Feed2";
import Rightbar from "../../Components/rightbar/Rightbar";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";

export default function Profile() {

  const [user2, setUser2] = useState({});
  const [imagens] = useState("/images/person/");

  const username = useParams().username
  const [user, setUser] = useState({});
  const cleanUsername = (username) => {
    return username.replace(/[\[\]"]/g, "");
  };

  const fetchUser = useCallback(async () => {
    try {
      console.log("limpio",cleanUsername(username))
      console.log("lno impio",username)
      // const res = await fetch(`http://localhost:4000/api/users?username=${user.username === cleanUsername(username)}`);
      const res = await fetch(`http://localhost:4000/api/users?username=${username}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      console.log("Resultado del fetch:", result);
      setUser(result);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [username]);

  useEffect(() => {
    console.log("Username:", username);
    fetchUser();
    console.log("Usuario ", user);
  }, [username, fetchUser]);

  // useEffect(() => {
    
  //   fetch(`http://localhost:4000/api/users?username=${username}`)
  //     .then((res) => {
  //       if (!res.ok) {
          
  //         throw new Error("ok");
  //       }
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setUser2(result);
  //       setUser(result);
        
  //       console.log("aca debe salirresultado", result)
  //       console.log("aca debe salir")
  //       console.log("aca debe salir",user,"resultado",user2)
  //     })
  //     .catch((error) => {
  //       console.log("Fetch error:", error);
  //     });
  // }, [username]);


  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);

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
