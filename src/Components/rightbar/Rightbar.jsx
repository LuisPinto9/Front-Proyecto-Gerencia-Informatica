import { Users } from "../../assets/js/dummyData";
import Online from "../online/Online";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Add} from  "@mui/icons-material"

export default function Rightbar({ user }) {
  const [follows, setFollows] = useState([]);
  const [imagens] = useState("/images/person/");
  useEffect(() => {
    if (user) {
      loadUser();
    }
  }, [user._id]);

  const loadUser = () => {
    console.log("rigbar",user.username)
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

  const ProfileRightbar = () => {
    return (
      <>
      {/* para seguirme */}
      {user.username !== localStorage.getItem("username").replace(/[\[\]"]/g, "")
         &&
         <button  className="rightbarFollowButton">
          Follow<Add/>
         </button>
         
           }
         
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
