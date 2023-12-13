import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://svik6jowwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1',
  }),
  endpoints: (builder) => ({}),
});
