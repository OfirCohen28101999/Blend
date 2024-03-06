import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { CommentProps, CreateCommentProps, FirstComment } from '../../shared/types';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    createComment: builder.mutation<CommentProps, CreateCommentProps>({
      query(newComment: CreateCommentProps) {
        return {
          url: `/post/comment/${newComment.postId}`,
          method: 'POST',
          credentials: 'include',
          body: {title: newComment.title, description: newComment.description},
        };
      },
    }),
    getAllCommentsByPostId: builder.query<FirstComment, string>({
      query(postId) {
        return {
          url: `/post/${postId}/comments`,
          credentials: 'include',
        };
      },
    }),
    deleteComment: builder.mutation<CommentProps, string>({
      query(commentId) {
        return {
          url: `/post/comment/${commentId}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentsByPostIdQuery
} = commentApi;
