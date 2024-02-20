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
              {/* <div>
            <iframe className="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl" src="https://www.youtube.com/embed/KaLxCiilHns" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div> */}
      <ProfileInfo/>
      <p className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"/>

 <p className="mt-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"></p>
 <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">My posts:</h5>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {currUserPosts?.map(currUserPost => (
        //postComments ={postsComments} send to Post
        <Post _id={currUserPost._id} title={currUserPost.title} description={currUserPost.description} creatingUser={currUserPost.creatingUser} track={currUserPost.track}/>
      ))}
    </div>
  </div>
  );
}

export default MyAccount;
