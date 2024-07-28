import { Users } from "../../assets/js/dummyData";
import Online from "../online/Online";
import "../../assets/css/components/rightbar/rightbar.css";
import { useState, useEffect } from "react";
import { json, Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  //amiguis
  const [follows, setFollows] = useState([]);
  const [imagens] = useState("/images/person/");
  //swguidores
  const [followed, setFollowed] = useState(false);
  const [userPrincipal, setUserPrincipalFollowed] = useState(false);

  useEffect(() => {
    if (user) {
      loadUser();
      getUserPrincipal();
    }
  }, [user]);

  useEffect(() => {
    if (userPrincipal) {
      getUserfollowed();
    }
  }, [userPrincipal]);

  const getUserfollowed = () => {
    const isFollowed = userPrincipal.followings.some(
      (following) => following._id === user._id
    );
    setFollowed(isFollowed);
  };

  const getUserPrincipal = () => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/users?username=${
        JSON.parse(localStorage.getItem("username"))[0]
      }`
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
        // console.log('Fetch error:', error);
      });
  };

  const loadUser = () => {
    const url = `${import.meta.env.VITE_API_URL}/api/users/${user._id}/getFollows`;

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
        // console.log('Fetch error:', error);
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

  const handleClick = async () => {
    try {
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
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          setFollowed(!followed);
        })
        .catch((error) => {
          console.log("Fetch error:", error);
        });
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== JSON.parse(localStorage.getItem("username"))[0] && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}

        <h4 className="rightbarTitle">Información de usuario</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Departamento:</span>
            <span className="rightbarInfoValue">Boyacá</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">De:</span>
            <span className="rightbarInfoValue">Mongua</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Teléfono:</span>
            <span className="rightbarInfoValue">3114543488</span>
          </div>
        </div>

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
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
