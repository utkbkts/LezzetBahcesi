import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const analyticApi = createApi({
  reducerPath: "analyticApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api`,
    tagTypes: ["analytics"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    analyticsOrder: builder.query({
      query: () => `/admin/get_sales`,
      providesTags: ["analytics"],
    }),
    analyticsOrderDate: builder.query({
      query: ({ startDate, endDate }) =>
        `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
      providesTags: ["analytics"],
    }),
  }),
});

export const { useLazyAnalyticsOrderQuery, useLazyAnalyticsOrderDateQuery } =
  analyticApi;
