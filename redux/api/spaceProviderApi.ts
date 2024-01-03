import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import BASE_URL from '@/lib/api';
import { setInitialSpaceProvider } from '../features/spaceProviderSlice';
import { ResponseMessageType } from '@/types/types';

export const spaceProviderApi: any = createApi({
  reducerPath: 'spaceProviderApi',
  tagTypes: ['MyRooms'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (builder) => ({
    myProfile: builder.query({
      query() {
        return {
          url: 'space-provider/my-profile',
          credentials: 'include',
        };
      },
      transformResponse: (response: {
        success: boolean;
        spaceProvider: any;
      }) => {
        // console.log(response.spaceProvider);
        return response.spaceProvider;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data)
          dispatch(setInitialSpaceProvider(data));
        } catch (error) {
          dispatch(setInitialSpaceProvider(null));
        }
      },
    }),
    MyRooms: builder.query({
      query() {
        return {
          url: 'room/my-rooms',
          credentials: 'include',
        };
      },
      providesTags: ['MyRooms'],
    }),
    deleteMyRoom: builder.mutation({
      query: (id) => ({
        url: `room/delete/${id}`,
        method: 'DELETE',
        credentials: 'include',
        // body: data,
      }),
      invalidatesTags: ['MyRooms'],
      transformResponse: (
        response: { success: boolean; message: any },
        meta,
        arg
      ) => {
        // console.log(response.message)
        if (response) {
          toast.success(response?.message);
        }
      },
    }),
    roomImagesGetPreSignedPostUrl: builder.mutation({
      query: (data) => ({
        url: 'room/roomImagesGetPreSignedPostUrl',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    registerMyRoom: builder.mutation({
      query: (data) => ({
        url: `room/register`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['MyRooms'],
      transformResponse: (
        response: { success: boolean; message: any },
        meta,
        arg
      ) => {
        if (response) {
          toast.success(response?.message);
        }
      },
    }),
  }),
});

export const {
  useMyProfileQuery,
  useMyRoomsQuery,
  useDeleteMyRoomMutation,
  useRoomImagesGetPreSignedPostUrlMutation,
  useRegisterMyRoomMutation,
  useLogoutMutation,
} = spaceProviderApi;
