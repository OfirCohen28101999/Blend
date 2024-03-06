import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { FirstTrack } from '../../shared/types';

export const trackApi = createApi({
  reducerPath: 'trackApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getAllTracks: builder.query<FirstTrack, void>({
      query() {
        return {
          url: `/tracks`,
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useGetAllTracksQuery,
} = trackApi;
