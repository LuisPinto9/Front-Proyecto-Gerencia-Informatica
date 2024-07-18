
import { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../sharePost/Share";

export default function Feed2({ user }) {
  const [posts, setPosts] = useState([]);

  console.log(user._id);
  console.log(user.username);
  useEffect(() => {
    if (user) {
      loadPost();
      loadPost();
    }
  }, [user]);

  const loadPost = () => {
    console.log("fedd2",user.username)

    
    const url = user
      ? `http://localhost:4000/api/posts/profile/${user.username}`
      : `http://localhost:4000/api/posts/timeline/${user._id}`;



    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("ok");
        }
        return res.json();
      })
      .then((result) => {
        setPosts(result.sort((p1,p2)=>{
          return new Date(p2.createdAt)-new Date(p1.createdAt)
        }
        
        )
      
      );
      })
      .catch((error) => {
        // console.log('Fetch error:', error);
      });
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* publicar sin iciar sesion */}
        {/* <Share user={user} loadPost={loadPost} /> */}
        
        {/* {
          console.log("nombre de ",user.username,localStorage.getItem("username").replace(/[\[\]"]/g, ""))
        } */}

        
        <Share user={user} loadPost={loadPost} />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
