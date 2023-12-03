import { apiSlice } from "./api";
import querystring from "query-string";

const TEAM = "teams";

export const TeamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeamList: builder.query({
      query: (query) => `/${TEAM}?${querystring.stringify(query)}`,
      providesTags: ["Updated_Team"],
    }),

    getTeamDetails: builder.query({
      query: (id) => `/${TEAM}/${id}`,
    }),

    createTeam: builder.mutation({
      query: (data) => ({
        url: `/${TEAM}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Updated_Team"],
    }),

    updateTeam: builder.mutation({
      query: (data) => ({
        url: `/${TEAM}/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTeam: builder.mutation({
      query: (data) => ({
        url: `/${TEAM}/${data}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Updated_Team"],
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useLazyGetTeamListQuery,
  useLazyGetTeamDetailsQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = TeamApi;
