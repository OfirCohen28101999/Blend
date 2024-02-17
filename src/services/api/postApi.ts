import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { firstpost } from '../../shared/types';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    // createPost: builder.mutation<firstpost, FormData>({
    //   query(post) {
    //     return {
    //       url: '/',
    //       method: 'POST',
    //       credentials: 'include',
    //       body: post,
    //     };
    //   },
    // }),
    // updatePost: builder.mutation<firstpost, { id: string; post: FormData }>(
    //   {
    //     query({ id, post }) {
    //       return {
    //         url: `/post/${id}`,
    //         method: 'PATCH',
    //         credentials: 'include',
    //         body: post,
    //       };
    //     },
    //   }
    // ),
    // getPost: builder.query<firstpost, string>({
    //   query(id) {
    //     return {
    //       url: `/post/${id}`,
    //       credentials: 'include',
    //     };
    //   },
    // }),
    getAllPosts: builder.query<firstpost, void>({ //PostProps[]
      query() {
        return {
          url: `/post`,
          credentials: 'include',
        };
      },
    }),
    // deletePost: builder.mutation<firstpost, string>({
    //   query(id) {
    //     return {
    //       url: `/post/${id}`,
    //       method: 'Delete',
    //       credentials: 'include',
    //     };
    //   },
    // }),
  }),
});

export const {
  // useCreatePostMutation,
  // useDeletePostMutation,
  // useUpdatePostMutation,
  useGetAllPostsQuery,
} = postApi;
