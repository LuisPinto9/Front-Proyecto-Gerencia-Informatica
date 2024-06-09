import { Users } from "../../assets/js/dummyData";
import Online from "../online/Online";

export default function Rightbar({ profile }) {
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
          <div className="rightbarFollowing">
            <img
              src="images/person/2.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Sebastian Barrera</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="images/person/3.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Reparación de ...</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="images/person/4.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Luis Pinto</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="images/person/5.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Plomero Jorge</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="images/person/6.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Robinson Aguilar</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
