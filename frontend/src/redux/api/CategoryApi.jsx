import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api`,
    tagTypes: ["Category"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    categoryAdd: builder.mutation({
      query(body) {
        return {
          url: "/category/add",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Category"],
    }),
    categoryGet: builder.query({
      query: () => "/category/get",
      providesTags: ["Category"],
    }),
  }),
});

export const { useCategoryAddMutation, useCategoryGetQuery } = categoryApi;
