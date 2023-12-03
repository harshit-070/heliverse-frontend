import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseURL = `${process.env.REACT_APP_BACKEND}/api`;

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Update_User", "Updated_Team"],

  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
    credentials: "include",
    mode: "cors",
  }),
  endpoints: (builder) => ({}),
});
