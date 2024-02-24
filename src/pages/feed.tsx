import Post from "../components/post";
import { postApi } from "../services/api/postApi";
import { userApi } from "../services/api/userApi";
import { PostProps, UserProps } from "../shared/types";

export function Feed() {
  
    const allPosts: PostProps[] | undefined = postApi.endpoints.getAllPosts.useQuery(undefined, {
      skip: false,
    }).data?.data.posts;

    // : UserProps
    const currentUser = userApi.endpoints.getMe.useQuery(null, { 
      skip: false
    }).data;

    const notCurrUserPosts: PostProps[] | undefined = allPosts?.filter((postInfo: PostProps) => 
      postInfo.creatingUser._id != currentUser?._id
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-40 pl-5 pt-16">
      {notCurrUserPosts?.map((notCurrUserPost: PostProps) => (
        <Post _id= {notCurrUserPost._id} title = {notCurrUserPost.title} description = {notCurrUserPost.description} creatingUser = {notCurrUserPost.creatingUser} track={notCurrUserPost.track}/>
      ))}
    </div>
  );
}

export default Feed;