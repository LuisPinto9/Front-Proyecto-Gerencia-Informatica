import MoreVert from "@mui/icons-material/MoreVert";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// fetch(`http://localhost:4000/api/users/${post.userId}`)
export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [imagens] = useState("/images/person/");

  const likeHandler = async () => {
    console.log("entro");
    try {
      const response = await fetch(
        `http://localhost:4000/api/posts/${post._id}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }), // Envía el userId al servidor
        }
      );
      console.log("entro", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (isLiked) {
        setLike(like - 1);
      } else {
        setLike(like + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log(post);
    fetch(`http://localhost:4000/api/users?userId=${post.userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("ok");
        }
        return res.json();
      })
      .then((result) => {
        // console.log(post.userId)
        // console.log(result)
        setUser(result);
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  }, []);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`http://localhost:3000/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture || imagens + "9.jpeg"}
                alt=""
              />
            </Link>

            <span className="postUsername"> {user.username} </span>
            <span className="postDate">{post.createdAt}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="images/like.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} Me gusta</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comments} Comentarios</span>
          </div>
        </div>
      </div>
    </div>
  );
}
