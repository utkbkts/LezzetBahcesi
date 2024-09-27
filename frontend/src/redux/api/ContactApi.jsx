import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query(body) {
        return {
          url: "/send",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useSendMessageMutation } = contactApi;
