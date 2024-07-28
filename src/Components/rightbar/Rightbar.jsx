import { useState, useEffect, useRef } from "react";
import { json,Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Users } from "../../assets/js/dummyData";
import "../../assets/css/components/rightbar/rightbar.css";
import Online from "../online/Online";


export default function Rightbar({ user }) {
  const [follows, setFollows] = useState([]);
  const [imagens] = useState("/images/person/");
  const [followed, setFollowed] = useState(false);
  const [userPrincipal, setUserPrincipalFollowed] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState({
    username: "",
    phone: "",
  });
  const toast = useRef(null);

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
    if (userPrincipal && userPrincipal.followings) {
      setFollowed(userPrincipal.followings.includes(user?.id));
    }
    
  };


  const getUserPrincipal = () => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/users?username=${localStorage
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
        setUserPrincipalFollowed(result);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
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
  useEffect(() => {
    if (user) {
      setEditUser({
        username: user.username || "",
        phone: user.phone || "",
        city: user.city || "",
        from: user.from || "",
        desc: user.desc || "",
      });
    }
  }, [user]);
  const handleEditUser = async () => {
    const url = `${import.meta.env.VITE_API_URL}/api/users/update/${user._id}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.state) {
          toast.current.show({
            severity: "success",
            summary: "Usuario actualizado",
            detail:
              "La información del usuario ha sido actualizada correctamente",
            life: 3000,
          });
          setShowEditModal(false);
          setUserPrincipalFollowed(data.data);
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail:
              data.error || "No se pudo actualizar la información del usuario",
            life: 3000,
          });
        }
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Error al actualizar la información del usuario",
          life: 3000,
        });
      });
  };

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => setShowEditModal(false)}
          className="p-button-text"
        />
        <Button label="Guardar" icon="pi pi-check" onClick={handleEditUser} />
      </div>
    );
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
        {user.username ===
          localStorage.getItem("username").replace(/[\[\]"]/g, "") && (
          <Button
            label="Editar"
            icon="pi pi-pencil"
            onClick={() => setShowEditModal(true)}
          />
        )}
        {user.username !==
          localStorage.getItem("username").replace(/[\[\]"]/g, "") && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}

{/* username: user.username || "",
        phone: user.phone || "",
        city: user.city || "",
        from: user.from || "",
        desc: user.desc || "", */}

        <h4 className="rightbarTitle">Información de usuario</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ciudad actual:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">De:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Teléfono:</span>
            <span className="rightbarInfoValue">{user.phone}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">contacto:</span>
            <span className="rightbarInfoValue">{user.email}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Descripcion:</span>
            <span className="rightbarInfoValue">{user.desc}</span>
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

        <h4 className="rightbarTitle">Seguidores</h4>
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
      <Dialog
        header="Editar Usuario"
        visible={showEditModal}
        style={{ width: "50vw" }}
        footer={renderFooter()}
        onHide={() => setShowEditModal(false)}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="username">Username</label>
            <InputText
              id="username"
              value={editUser.username}
              onChange={(e) =>
                setEditUser({ ...editUser, username: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="phone">Phone</label>
            <InputText
              id="phone"
              value={editUser.phone}
              onChange={(e) =>
                setEditUser({ ...editUser, phone: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="city">City</label>
            <InputText
              id="city"
              value={editUser.city}
              onChange={(e) =>
                setEditUser({ ...editUser, city: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="from">From</label>
            <InputText
              id="from"
              value={editUser.from}
              onChange={(e) =>
                setEditUser({ ...editUser, from: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="desc">Description</label>
            <InputText
              id="desc"
              value={editUser.desc}
              onChange={(e) =>
                setEditUser({ ...editUser, desc: e.target.value })
              }
            />
          </div>
        </div>
      </Dialog>
      <Toast ref={toast} />
    </div>
  );
}
