import MoreVert from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [imagens] = useState("/images/person/");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments); // State to manage comments

  // Handler to submit comments (only adds comments to the comments array)
  const submitCommentHandler = async () => {
    console.log("Submit comment working");
    try {
      const response = await fetch(`http://localhost:4000/api/posts/${post._id}/comment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, text: comment }), // Only sends user ID and comment to add comments without time or user
      });

      console.log("fetch complete", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedPost = await response.json();
      setComments(updatedPost.comments); // Update comments state with the new comments
      setComment(""); // Clear the input field after successful submission
    } catch (error) {
      console.error("Error posting comment:", error);
      console.log("fetch error");
    }
  };

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
          body: JSON.stringify({ userId: user._id }), // Sends the user ID to the server
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
        setUser(result);
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  }, [post.userId]);

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
              src="/images/like.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} Me gusta</span>
          </div>
          <div className="postBottomRight">
            <div className="postCommentInput">
              <input
                type="text"
                placeholder="Comenta al usuario..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={submitCommentHandler}>Comentar</button>
            </div>
            <span className="postCommentText">
              {comments.length} Comentarios
            </span>
            <div className="postComments">
              {comments.map((c, index) => (
                <div key={index} className="comment">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
