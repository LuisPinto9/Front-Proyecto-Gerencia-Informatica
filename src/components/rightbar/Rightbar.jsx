import { useState, useEffect, useRef } from "react";
import { json, Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Users } from "../../assets/js/dummyData";
import "../../assets/css/components/rightbar/rightbar.css";
import Online from "../online/Online";

export default function Rightbar({ user }) {
  const [follower, setFollower] = useState([]);

  const [follows, setFollows] = useState([]);
  const [imagens] = useState("/images/person/");
  const [followed, setFollowed] = useState(false);
  const [userPrincipal, setUserPrincipalFollowed] = useState(false);

  useEffect(() => {
    if (user) {
      loadUser();
      seguidores();
      getUserPrincipal();
    }
  }, [user]);

  useEffect(() => {
    if (userPrincipal) {
      getUserfollowed();
    }
  }, [userPrincipal]);

  const getUserfollowed = () => {
    if (userPrincipal && userPrincipal.followings) {
      setFollowed(userPrincipal.followings.includes(user._id));
    }
  };

  const getUserPrincipal = () => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/users?username=${JSON.parse(localStorage.getItem("username"))[0]}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fetch failed");
        }
        return res.json();
      })
      .then((result) => {
        setUserPrincipalFollowed(result);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const loadUser = () => {
    const url = `${import.meta.env.VITE_API_URL}/api/users/${
      user._id
    }/getFollows`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("ok");
        }
        return res.json();
      })
      .then((result) => {
        setFollows(result);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const seguidores = () => {
    const url = `${import.meta.env.VITE_API_URL}/api/users/${
      user._id
    }/getFollowers`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("ok");
        }
        return res.json();
      })
      .then((result) => {
        setFollower(result);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const handleClick = async () => {
    const url = followed
      ? `${import.meta.env.VITE_API_URL}/api/users/${user._id}/unfollow`
      : `${import.meta.env.VITE_API_URL}/api/users/${user._id}/follow`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userPrincipal._id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setFollowed(!followed);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/images/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>

        <img className="rightbarAd" src="/images/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !==
          localStorage.getItem("username").replace(/[\[\]"]/g, "") && (
          <div className="rightbarInfoItem">
            <h4 className="rightbarTitle">Agrega un seguidor</h4>
            <div className="rightbarInfo">
              <button className="rightbarFollowButton" onClick={handleClick}>
                {followed ? "Unfollow" : "Follow"}
                {followed ? <Remove /> : <Add />}
              </button>
            </div>
          </div>
        )}

        <h4 className="rightbarTitle">Siguiendo</h4>
        <div className="rightbarFollowings">
          {follows && follows.length > 0 ? (
            follows.map((follow) => (
              <div key={follow.username} className="rightbarFollowing">
                <Link to={`/profile/${follow.username}`}>
                  <img
                    src={follow.profilePicture || `${imagens}1.jpeg`}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                </Link>
                <span className="rightbarFollowingName">{follow.username}</span>
              </div>
            ))
          ) : (
            <p>
              Aún no sigues a nadie. ¡Explora y encuentra personas interesantes
              a seguir!
            </p>
          )}
        </div>

        <h4 className="rightbarTitle">Seguidores</h4>
        <div className="rightbarFollowings">
          {follower && follower.length > 0 ? (
            follower.map((follow) => (
              <div key={follow.username} className="rightbarFollowing">
                <Link to={`/profile/${follow.username}`}>
                  <img
                    src={follow.profilePicture || `${imagens}1.jpeg`}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                </Link>
                <span className="rightbarFollowingName">{follow.username}</span>
              </div>
            ))
          ) : (
            <p>
              Nadie te está siguiendo aún. ¡Comparte tus habilidades para atraer seguidores!
            </p>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
      {/* <Toast ref={toast} /> */}
    </div>
  );
}
