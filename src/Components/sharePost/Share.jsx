import PermMedia from "@mui/icons-material/PermMedia";
import Label from "@mui/icons-material/Label";
import Room from "@mui/icons-material/Room";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import { useState, useRef } from "react";
import "../../assets/css/components/sharePost/share.css";
import { Cancel } from "@mui/icons-material";

export default function Share({ user, loadPost }) {
  const [imagens] = useState("/images/person/");
  const desc = useRef();
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

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
          if (data.state) {
            setFile(null);
            fileInputRef.current.value = null;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.warn("Por favor, agrega una imagen.");
    }
  };

  const handleCancelImage = () => {
    setFile(null);
    fileInputRef.current.value = null;
  };

  const uploadCapturedImage = async () => {
    setIsUploading(true);

    if (capturedImage) {
      try {
        const uniqueTimestamp = new Date().toISOString().replace(/[:.-]/g, "");

        const blob = await fetch(capturedImage).then((res) => res.blob());
        const fileType = blob.type;
        let fileExtension = "";

        if (fileType === "image/jpeg") {
          fileExtension = "jpg";
        } else if (fileType === "image/png") {
          fileExtension = "png";
        } else {
          throw new Error("Unsupported image format");
        }

        const uniqueFileName = `capturedImage_${uniqueTimestamp}.${fileExtension}`;
        const formData = new FormData();
        formData.append("file", blob, uniqueFileName);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/login/uploadTemporal`,
          {
            method: "POST",
            body: formData,
          }
        );

        return await response.text();
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
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
            placeholder={"haz una publicacion: " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="shareImg"
            />
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
              <span className="shareOptionText">Fotos o Videos</span>
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
              ref={fileInputRef}
            ></input>

            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tags</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Ubicación</span>
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
