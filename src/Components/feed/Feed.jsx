import Post from "../post/Post";
import Share from "../sharePost/Share";
import { Posts } from "../../assets/js/dummyData";

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
