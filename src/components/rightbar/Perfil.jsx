import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Users } from "../../assets/js/dummyData";
import "../../assets/css/components/rightbar/rightbar.css";
import Online from "../online/Online";

export default function Perfil({ user }) {
  const [follower, setFollower] = useState([]);
  const [follows, setFollows] = useState([]);
  const [imagens] = useState("/images/person/");
  const [followed, setFollowed] = useState(false);
  const [userPrincipal, setUserPrincipalFollowed] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState({
    username: "",
    phone: "",
    city: "",
    from: "",
    desc: "",
    skills: "", 
    workExperience: "", 
    interests: "" 
  });
  const toast = useRef(null);

  useEffect(() => {
    if (user) {
      getUserPrincipal();
    }
  }, [user]);

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
        // console.error("Fetch error:", error);
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
        interests: user.interests || "",
        workExperience: user.workExperience || "",
        skills: user.skills || "",
      });
    }
  }, [user]);

  const handleEditUser = async () => {
    // console.log("usuario edita",editUser)
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
          <div className="rightbarInfoItem1">
            <h4 className="rightbarTitle">Editar Perfil</h4>
            <Button
              label="Editar"
              icon="pi pi-pencil"
              onClick={() => setShowEditModal(true)}
            />
          </div>
        )}

        <div className="rightbarInfoItem1">
          <span className="rightbarTitle">UBICACION</span>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ciudad actual:</span>
            <span className="rightbarInfoValue">{user.city}</span>
            <p></p>
            <span className="rightbarInfoKey">De:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <span className="rightbarTitle">INFORMACION DE CONTACTO</span>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Teléfono:</span>
            <span className="rightbarInfoValue">{user.phone}</span>
            <p></p>
            <span className="rightbarInfoKey">correo:</span>
            <span className="rightbarInfoValue">{user.email}</span>
          </div>
          <h4 className="rightbarTitle">INFORMACION DE PERFIL</h4>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Acerca de mi:</span>
            <span className="rightbarInfoValue">{user.desc}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Experiencia laboral:</span>
            <span className="rightbarInfoValue">{user.workExperience}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Intereses:</span>
            <span className="rightbarInfoValue">{user.interests}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Habilidades:</span>
            <span className="rightbarInfoValue">{user.skills}</span>
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
          <div className="p-field">
            <label htmlFor="skills">Habilidades</label>
            <InputText
              id="skills"
              value={editUser.skills}
              onChange={(e) =>
                setEditUser({ ...editUser, skills: e.target.value })
              }
            />
          </div><div className="p-field">
            <label htmlFor="workExperience">Experiencia</label>
            <InputText
              id="workExperience"
              value={editUser.workExperience}
              onChange={(e) =>
                setEditUser({ ...editUser, workExperience: e.target.value })
              }
            />
          </div><div className="p-field">
            <label htmlFor="interests">Intereses</label>
            <InputText
              id="interests"
              value={editUser.interests}
              onChange={(e) =>
                setEditUser({ ...editUser, interests: e.target.value })
              }
            />
          </div>


        </div>
      </Dialog>
      <Toast ref={toast} />
    </div>
  );
}
