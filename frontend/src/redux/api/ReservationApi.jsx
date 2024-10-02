import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api`,
    tagTypes: ["Reservation"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    saveReservation: builder.mutation({
      query(body) {
        return {
          url: `/reservation`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Reservation"],
    }),
    getReservation: builder.query({
      query: () => "/reservation/get",
      providesTags: ["Reservation"],
    }),
    updateReservation: builder.mutation({
      query({ id, body }) {
        return {
          url: `/reservation/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Reservation"],
    }),
  }),
});

export const {
  useSaveReservationMutation,
  useGetReservationQuery,
  useUpdateReservationMutation,
} = reservationApi;
