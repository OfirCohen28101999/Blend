import Post from "../components/post";
import { postsInfo } from "../shared/mock";
import { PostProps } from "../shared/types";

export function Feed() {
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-40 pl-5 pt-16">
      {postsInfo.filter((postInfo:PostProps) => !postInfo.creatingUser).map((notCurrUserPosts: PostProps) => (
        <Post id= {notCurrUserPosts.id} postTitle = {notCurrUserPosts.postTitle} postText = {notCurrUserPosts.postText} creatingUser = {notCurrUserPosts.creatingUser} postLikes={notCurrUserPosts.postLikes}/>
      ))}
    </div>
  );
}

export default Feed;