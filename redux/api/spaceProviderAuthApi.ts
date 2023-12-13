import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import { spaceProviderApi } from './spaceProviderApi';
import BASE_URL from '@/lib/api';

export type ResponseMessageType = {
  success: boolean;
  message: string;
};

export const spaceProviderAuthApi = createApi({
  reducerPath: 'spaceProviderAuthApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}space-provider/`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
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
  }),
});

export const { useRegisterMutation, useLoginMutation } = spaceProviderAuthApi;
