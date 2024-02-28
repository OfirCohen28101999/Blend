import ProfileInfo from "../components/profileInfo";
import Post from "../components/post";
import { PostProps } from "../shared/types";
import { getAllPostsQuery, getCurrentUserQuery, getCurrentUserPosts } from "../shared/general";

function MyAccount() {

  const allPosts: PostProps[] | undefined = getAllPostsQuery();
  const currentUser = getCurrentUserQuery();
  const currUserPosts: PostProps[] | undefined = getCurrentUserPosts(allPosts, currentUser);

  return (
    <div className="ml-40 pl-5 pt-16">
      <ProfileInfo/>
      <p className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"/>
      <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">My posts:</h5>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {currUserPosts?.map(currUserPost => (
          <Post _id={currUserPost._id} title={currUserPost.title} description={currUserPost.description} creatingUser={currUserPost.creatingUser} track={currUserPost.track}/>
        ))}
    </div>
  </div>
  );
}

export default MyAccount;
