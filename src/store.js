import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import UserReducer from "./reducer/User.reducer";
import TeamReducer from "./reducer/Team.reducer";

import { apiSlice } from "./services/api";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    team: TeamReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
