import { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../sharePost/Share";

export default function Feed({ user, homeStatus }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    user && !homeStatus ? loadPost() : loadAllPosts();
  }, [user]);

  const loadAllPosts = () => {
    fetch("http://localhost:4000/api/posts/allPosts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("ok");
        }
        return res.json();
      })
      .then((result) => {
        setPosts(
          result.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      })
      .catch((error) => {
        // console.log('Fetch error:', error);
      });
  };

  const loadPost = () => {
    const url = user
      ? `http://localhost:4000/api/posts/profile/${localStorage
          .getItem("username")
          .replace(/[\[\]"]/g, "")}`
      : `http://localhost:4000/api/posts/timeline/${user._id}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("ok");
        }
        return res.json();
      })
      .then((result) => {
        setPosts(
          result.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      })
      .catch((error) => {
        // console.log('Fetch error:', error);
      });
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      });
  
      if (response.ok) {
        console.log(`Post eliminado con id: ${id}`);
        setPosts(posts.filter(post => post._id !== id));
      } else {
        console.error('Error al eliminar el post');
      }
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    } 
  };  

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share user={user} loadPost={loadPost} homeStatus={homeStatus} loadAllPosts={loadAllPosts}/>
        {posts.map((post) => (
          <Post key={post._id} post={post} deletePost={deletePost}/>
        ))}
      </div>
    </div>
  );
}
