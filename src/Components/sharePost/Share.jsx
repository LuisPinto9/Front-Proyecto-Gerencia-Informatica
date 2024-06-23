import PermMedia from "@mui/icons-material/PermMedia";
import Label from "@mui/icons-material/Label";
import Room from "@mui/icons-material/Room";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import { useState, useEffect, useRef } from "react";

export default function Share({ user, loadPost }) {
  const [imagens] = useState("/images/person/");
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);

  const [flag, setFlag] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      fetch("http://localhost:4000/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      })
        .then((response) => response.json())
        .then((data) => {
          loadPost();
          setVisible(false);
          if (data.state) {
            setFlag(true);
          }
        })
        .catch((error) => {
          setVisible(false);
          console.error("Error:", error);
        });
    } else {
      setVisible(false);
      console.warn("Por favor, agrega una imagen.");
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilePicture || imagens + "1.jpeg"}
            alt=""
          />
          <input
            placeholder={"has una publicacion: " + user.username}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Fotos o Videos</span>
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
            ></input>

            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tags</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Ubicacion</span>
            </div>
          </div>

          <button className="shareButton" type="button" onClick={submitHandler}>
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}
