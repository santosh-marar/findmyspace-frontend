import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import { spaceProviderApi } from './spaceProviderApi';
import BASE_URL from '@/lib/api';
import { ResponseMessageType } from '@/types/types';

export const spaceProviderAuthApi: any = createApi({
  reducerPath: 'spaceProviderAuthApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}space-provider/`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    spaceProviderAvatarGetPreSignedPostUrl: builder.mutation({
      query: (data) => ({
        url: 'spaceProviderAvatarGetPreSignedPostUrl',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      transformResponse: (response: ResponseMessageType, meta, arg) => {
        if (response) {
          toast.success(response?.message);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(spaceProviderApi.endpoints.myProfile.initiate(null));
        } catch (error) {
          console.error(error);
        }
      },
      transformResponse: (response: ResponseMessageType, meta, arg) => {
        toast.success(response?.message);
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
        credentials: 'include',
      }),
      transformResponse: (response: ResponseMessageType, meta, arg) => {
        toast.success(response?.message);
      },
    }),
  }),
});

export const {
  useSpaceProviderAvatarGetPreSignedPostUrlMutation,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = spaceProviderAuthApi;
