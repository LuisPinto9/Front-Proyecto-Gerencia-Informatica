// import Post from "../post/Post";
// import Share from "../sharePost/Share";
// import { Posts } from "../../assets/js/dummyData";

// export default function Feed() {
//   return (
//     <div className="feed">
//       <div className="feedWrapper">
//         <Share />
//         {Posts.map((p) => (
//           <Post key={p.id} post={p} />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../sharePost/Share";

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  console.log(user._id);

  useEffect(() => {
    if (user) {
      loadPost();
    }
  }, [user]);

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
        setPosts(result);
      })
      .catch((error) => {
        // console.log('Fetch error:', error);
      });
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share user={user} loadPost={loadPost} />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
