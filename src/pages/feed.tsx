import Post from "../components/post";
import { getAllPostsQuery, getCurrentUserQuery, getNotCurrentUserPosts } from "../shared/general";
import { PostProps } from "../shared/types";

export function Feed() {
    
  const allPosts: PostProps[] | undefined = getAllPostsQuery();
  const currentUser = getCurrentUserQuery();
  const notCurrUserPosts: PostProps[] | undefined = getNotCurrentUserPosts(allPosts, currentUser);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-40 pl-5 pt-16">
      {notCurrUserPosts?.map((notCurrUserPost: PostProps) => (
        <Post _id= {notCurrUserPost._id} title = {notCurrUserPost.title} description = {notCurrUserPost.description} creatingUser = {notCurrUserPost.creatingUser} track={notCurrUserPost.track}/>
      ))}
    </div>
  );
}

export default Feed;