import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api`,
    tagTypes: ["Order", "UserOrder"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query(body) {
        return {
          url: "/payment/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Order"],
    }),
    iyzipayCheckOut: builder.mutation({
      query(body) {
        return {
          url: "/payment/checkoutSession",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Order"],
    }),
    getUserOrderDetail: builder.query({
      query: (id) => `/me/orders/${id}`,
      providesTags: ["Order"],
    }),
    getUserOrder: builder.query({
      query: () => "/me/user/detail",
      providesTags: ["UserOrder"],
    }),

    //admin yönlendirmeleri
    getAdminOrders: builder.query({
      query: () => `/admin/orders`,
      providesTags: ["Order"],
    }),
    getTodayOrders: builder.query({
      query: () => `/admin/today/orders`,
      providesTags: ["Order"],
    }),
    deleteOrders: builder.mutation({
      query(id) {
        return {
          url: `/admin/orders/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Order"],
    }),
    updateOrders: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/orders/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Order", "UserOrder"],
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetAdminOrdersQuery,
  useIyzipayCheckOutMutation,
  useGetTodayOrdersQuery,
  useDeleteOrdersMutation,
  useGetUserOrderDetailQuery,
  useGetUserOrderQuery,
  useUpdateOrdersMutation,
} = orderApi;
