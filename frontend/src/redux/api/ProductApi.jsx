import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api`,
    tagTypes: ["Product"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    //kullanici yönlendirmeleri
    getAllProducts: builder.query({
      query: (params) => {
        return {
          url: "/products",
          params: {
            page: params?.page,
            search: params?.search,
            category: params?.category,
            "productDetail.price[gte]": params?.min,
            "productDetail.price[lte]": params?.max,
            "ratings[lte]": params?.ratings,
          },
        };
      },
      providesTags: ["Product"],
    }),

    productById: builder.query({
      query(id) {
        return {
          url: `/product/${id}`,
        };
      },
      providesTags: ["Product"],
    }),
    submitReview: builder.mutation({
      query(body) {
        return {
          url: `/reviews`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product", "Review"],
    }),
    getUserReviews: builder.query({
      query: (userId) => `/reviews/user?userId=${userId}`,
      providesTags: ["Review"],
    }),
    getUserProduct: builder.query({
      query: () => "/product/user/detail",
      providesTags: ["Product"],
    }),

    //admin yönlendirmeleri
    createProducts: builder.mutation({
      query(body) {
        return {
          url: "/admin/products",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    getAdminProducts: builder.query({
      query: () => "/admin/products",
      providesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/admin/products/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteReviews: builder.mutation({
      query({ productId, id }) {
        return {
          url: `/admin/reviews?productId=${productId}&id=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductsMutation,
  useGetAdminProductsQuery,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useProductByIdQuery,
  useSubmitReviewMutation,
  useDeleteReviewsMutation,
  useGetUserReviewsQuery,
  useGetUserProductQuery,
} = productApi;
