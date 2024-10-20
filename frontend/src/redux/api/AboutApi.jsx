import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aboutApi = createApi({
  reducerPath: "aboutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api`,
    tagTypes: ["about"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createAbout: builder.mutation({
      query: (body) => {
        return {
          url: `/about/create`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["about"],
    }),
    getAbout: builder.query({
      query: () => `/about/get`,
      providesTags: ["about"],
    }),
    deleteAbout: builder.mutation({
      query: (id) => {
        return {
          url: `/about/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["about"],
    }),
  }),
});

export const {
  useCreateAboutMutation,
  useGetAboutQuery,
  useDeleteAboutMutation,
} = aboutApi;
