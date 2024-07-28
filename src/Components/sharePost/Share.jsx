import PermMedia from "@mui/icons-material/PermMedia";
import Label from "@mui/icons-material/Label";
import Room from "@mui/icons-material/Room";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import { useState, useRef } from "react";
import "../../assets/css/components/sharePost/share.css";
import { Cancel } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Share({ user, loadPost, homeStatus, loadAllPosts }) {
  const [imagens] = useState("/images/person/");
  const [disable, setDisable] = useState(true);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (desc.current.value) {
      const data = new FormData();
      if (file) data.append("img", file); // Asegúrate de que la clave 'img' coincida con lo que espera tu backend.
      if (desc.current.value) data.append("desc", desc.current.value);
      data.append("userId", user._id);

      fetch("http://localhost:4000/api/posts/", {
        method: "POST",
        body: data, // Envía FormData directamente sin JSON.stringify
      })
        .then((response) => response.json())
        .then((data) => {
          if (!homeStatus) {
            loadPost();
            if (data.userId) {
              setFile(null);
              fileInputRef.current.value = null;
              desc.current.value = ""; // Limpia la descripción si es necesario
            }
          } else {
            loadAllPosts();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleCancelImage = () => {
    setFile(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <Link to={`http://localhost:3000/profile/${user.username}`}>
            <img
              className="shareProfileImg"
              src={user.profilePicture || imagens + "1.jpeg"}
              alt=""
            />
          </Link>
          <input
            placeholder={"haz una publicacion: " + user.username + "?"}
            className="shareInput"
            ref={desc}
            onKeyUp={(e) => {
              if (desc.current.value) {
                setDisable(false);
                if (e.key === "Enter") {
                  submitHandler(e);
                }
              } else {
                setDisable(true);
              }
            }}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <button
              className="shareCancelImgButton"
              onClick={handleCancelImage}
            >
              <Cancel />
            </button>
          </div>
        )}

        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Fotos</span>
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
              ref={fileInputRef}
            ></input>
          </div>
          <button
            className={`shareButton ${disable ? "disabled" : ""}`}
            type="button"
            onClick={submitHandler}
            disabled={disable}
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}
