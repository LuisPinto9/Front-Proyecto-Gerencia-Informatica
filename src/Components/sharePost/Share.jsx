import PermMedia from "@mui/icons-material/PermMedia";
import Label from "@mui/icons-material/Label";
import Room from "@mui/icons-material/Room";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="images/person/1.jpeg" alt="" />
          <input placeholder="¿ Qué estás pensando ?" className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Fotos o Videos</span>
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tags</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Ubicacion</span>
            </div>
            {/*<div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
  </div>*/}
          </div>
          <button className="shareButton">Publicar</button>
        </div>
      </div>
    </div>
  );
}
