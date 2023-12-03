import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamName: "",
  isCreatingTeam: false,
  teamMembers: [],
};

export const TeamSlice = createSlice({
  name: "Team",
  initialState,
  reducers: {
    setTeamName(state, action) {
      state.teamName = action.payload;
    },
    setIsCreatingTeam(state, action) {
      state.isCreatingTeam = action.payload;
      state.teamMembers = [];
    },
    setTeamMembers(state, action) {
      state.teamMembers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsCreatingTeam, setTeamMembers, setTeamName } =
  TeamSlice.actions;

export default TeamSlice.reducer;
