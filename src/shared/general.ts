import { postApi } from '../services/api/postApi';
import { userApi } from '../services/api/userApi';
import { PostProps } from './types'; 

export const getAllPostsQuery = () => {
  return postApi.endpoints.getAllPosts.useQuery(undefined, {
    skip: false,
  }).data?.data.posts as PostProps[] | undefined;
};

// : UserProps
export const getCurrentUserQuery = () => {
  return userApi.endpoints.getMe.useQuery(null, {
    skip: false,
  }).data;
};

export const getCurrentUserPosts = (allPosts: PostProps[] | undefined, currentUser: any) => {
  return allPosts?.filter((postInfo: PostProps) => 
    postInfo.creatingUser._id === currentUser?._id
  ) as PostProps[] | undefined;
};

export const getNotCurrentUserPosts = (allPosts: PostProps[] | undefined, currentUser: any) => {
  return allPosts?.filter((postInfo: PostProps) => 
    postInfo.creatingUser._id !== currentUser?._id
  ) as PostProps[] | undefined;
};
