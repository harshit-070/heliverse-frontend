import { apiSlice } from "./api";
import querystring from "query-string";
const USER = "users";

export const UserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: (query) => `/${USER}?${querystring.stringify(query)}`,
      providesTags: ["Update_User"],
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: `/${USER}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Update_User"],
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: `/${USER}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Update_User"],
    }),

    deleteUser: builder.mutation({
      query: (data) => ({
        url: `/${USER}/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Update_User"],
    }),
  }),
});

export const {
  useLazyGetUserListQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = UserApi;
