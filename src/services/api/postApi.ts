import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { CreatePostProps, PostProps, firstpost, firstpostcreate } from '../../shared/types';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    createPost: builder.mutation<firstpostcreate, CreatePostProps>({
      query(post) {
        return {
          url: '/post',
          method: 'POST',
          credentials: 'include',
          body: post,
        };
      },
    }),
    updatePost: builder.mutation<firstpost, {postId: string, form: FormData}>(
      {
        query(post) {
          return {
            url: `/post/${post.postId}`,
            method: 'PATCH',
            credentials: 'include',
            body: post.form,
          };
        },
      }
    ),
    getAllPosts: builder.query<firstpost, void>({ //PostProps[]
      query() {
        return {
          url: `/post`,
          credentials: 'include',
        };
      },
    }),
    deletePost: builder.mutation<firstpost, string>({
      query(postId) {
        return {
          url: `/post/${postId}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
    }),
    deletePostImage: builder.mutation<any, string>({
      query(postId) {
        return {
          url: `/post/image/delete/${postId}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetAllPostsQuery,
  useDeletePostImageMutation
} = postApi;
