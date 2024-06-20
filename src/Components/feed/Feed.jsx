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

export default function Feed() {
  const [posts, setPosts] = useState([]);
  // console.log( result)
  useEffect(() => {
    fetch("http://localhost:4000/api/posts/timeline/66744d5b1f473bba191ac485")
      .then((res) => {
        if (!res.ok) {
          throw new Error('ok');
        }
        return res.json();
      })
      .then(
        (result) => {
         
          setPosts(result);
        }
      )
      .catch((error) => {
        console.log('Fetch error:', error);
      });
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
