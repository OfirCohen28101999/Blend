import { createApi } from '@reduxjs/toolkit/query/react';
import { setUser } from '../features/userSlice';
import customFetchBase from './customFetchBase';
import { UpdateUserProps, UserProps } from '../../shared/types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<UserProps, null>({
      query() {
        return {
          url: 'users/me',
          credentials: 'include',
        };
      },
      transformResponse: (result: { data: { user: UserProps } }) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    updateMe: builder.mutation<UserProps, FormData>({
      query(userInfo) {
        return {
          url: 'users/me',
          method: 'PATCH',
          credentials: 'include',
          body: userInfo
        };
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateMeMutation
} = userApi;

