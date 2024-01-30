import BASE_URL from '@/lib/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roomsApi = createApi({
  reducerPath: 'roomsApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}room`,
  }),
  endpoints: (builder) => ({
    getRooms: builder.query<any, any>({
      query: (object) =>
        `rooms?city=${object.city}&chockName=${object.chockName}&page=${object.page}`,
    }),
    getRoomById: builder.query<any, string>({
      query: (id) => `room/${id}`,
    }),
  }),
});

export const { useGetRoomsQuery, useGetRoomByIdQuery } = roomsApi;
