import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const footerApi = createApi({
  reducerPath: "footerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api`,
    tagTypes: ["footer"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createFooter: builder.mutation({
      query: (body) => {
        return {
          url: `/footer/create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["footer"],
    }),
    getFooter: builder.query({
      query: () => `/footer/get`,
      providesTags: ["footer"],
    }),
  }),
});

export const { useCreateFooterMutation, useGetFooterQuery } = footerApi;
