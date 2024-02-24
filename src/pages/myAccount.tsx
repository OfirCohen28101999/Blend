import ProfileInfo from "../components/profileInfo";
import Post from "../components/post";
import { postApi } from "../services/api/postApi";
import { PostProps } from "../shared/types";
import { userApi } from "../services/api/userApi";

function MyAccount() {

  const allPosts: PostProps[] | undefined = postApi.endpoints.getAllPosts.useQuery(undefined, {
    skip: false,
  }).data?.data.posts;

  // : UserProps
  const currentUser = userApi.endpoints.getMe.useQuery(null, { 
    skip: false
  }).data;

  const currUserPosts: PostProps[] | undefined = allPosts?.filter((postInfo: PostProps) => 
    postInfo.creatingUser._id == currentUser?._id
  );

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
