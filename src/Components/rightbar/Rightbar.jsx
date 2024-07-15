import { Users } from "../../assets/js/dummyData";
import Online from "../online/Online";
import '../../assets/css/components/rightbar/rightbar.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Add ,Remove} from "@mui/icons-material";

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
    setFollowed(userPrincipal.followings.includes(user?.id));
  };
  const getUserPrincipal = () => {
    fetch(
      `http://localhost:4000/api/users?username=${localStorage
        .getItem("username")
        .replace(/[\[\]"]/g, "")}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fetch failed");
        }
        return res.json();
      })
      .then((result) => {
        console.log("usuario final", result);
        setUserPrincipalFollowed(result);
      })
      .catch((error) => {
        // console.log('Fetch error:', error);
      });
  };

  const loadUser = () => {
    console.log("rigbar", user.username);
    const url = `http://localhost:4000/api/users/${user._id}/getFollows`;

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
          <img className="birthdayImg" src="images/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>

        <img className="rightbarAd" src="images/ad.png" alt="" />
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
        ? `http://localhost:4000/api/users/${user._id}/unfollow`
        : `http://localhost:4000/api/users/${user._id}/follow`;

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
    setFollowed(!followed)
  };
  const ProfileRightbar = () => {
    return (
      <>
        {/* para seguirme */}
        {user.username !==
          localStorage.getItem("username").replace(/[\[\]"]/g, "") && (
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
          {follows.map((follows) => (
            <div className="rightbarFollowing">
              <Link to={`http://localhost:3000/profile/${follows.username}`}>
                <img
                  src={follows.profilePicture || imagens + "1.jpeg"}
                  alt=""
                  className="rightbarFollowingImg"
                />
              </Link>
              <span className="rightbarFollowingName">{follows.username}</span>
            </div>
          ))}

          <div className="rightbarFollowing">
            <img
              src="images/person/6.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">usuario ejemplo</span>
          </div>
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
