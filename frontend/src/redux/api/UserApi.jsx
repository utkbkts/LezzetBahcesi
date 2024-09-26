/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setisAuthenticated, setLoading, setUser } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api`,
    credentials: "include",
  }),
  tagTypes: ["User", "AdminUser"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/me",
      transformResponse: (response) => response.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setisAuthenticated(true));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
        }
      },
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/me/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation({
      query({ token, body }) {
        return {
          url: `/password/reset/${token}`,
          method: "PUT",
          body,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: `/password/forgot`,
          method: "POST",
          body,
        };
      },
    }),
    updateProfilePassword: builder.mutation({
      query(body) {
        return {
          url: `/password/updatePassword`,
          method: "PUT",
          body,
        };
      },
    }),
    getAdminUsers: builder.query({
      query: () => `/admin/users`,
      providesTags: ["AdminUser"],
    }),
    getAdminRoleUsers: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/admin/users/role/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["AdminUser"],
    }),
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/admin/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminUser"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAdminUsersQuery,
  useUpdateProfileMutation,
  useUpdateProfilePasswordMutation,
  useDeleteUserMutation,
  useGetAdminRoleUsersMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApi;
