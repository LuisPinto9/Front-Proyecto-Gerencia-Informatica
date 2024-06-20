import MoreVert from "@mui/icons-material/MoreVert";

import { useState, useEffect } from "react";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [imagens] = useState("/images/person/");
  


  useEffect(() => {
  fetch(`http://localhost:4000/api/users/${post.userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('ok');
          }
          return res.json();
        })
        .then(
          (result) => {
            console.log(post.userId)
            console.log(result)
            setUser(result);
            
          }
        )
        .catch((error) => {
          console.log('Fetch error:', error);
        });
    }, []);


  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={user.profilePicture|| imagens+"9.jpeg"}
              alt=""
            />
            <span className="postUsername">
              {user.username }
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="images/like.png"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src="images/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} Me gusta</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} Comentarios</span>
          </div>
        </div>
      </div>
    </div>
  );
}
