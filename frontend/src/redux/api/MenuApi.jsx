import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api`,
    tagTypes: ["menu"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createMenu: builder.mutation({
      query: (body) => {
        return {
          url: `/menu/create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["menu"],
    }),
    getMenu: builder.query({
      query: () => `/menu/get`,
      providesTags: ["menu"],
    }),
  }),
});

export const { useCreateMenuMutation, useGetMenuQuery } = menuApi;
