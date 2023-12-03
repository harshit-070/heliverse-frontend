import { createSlice } from "@reduxjs/toolkit";
import { DomainList } from "../components/User/DomainFilter";
import { GenderList } from "../components/User/GenderFilter";

const initialState = {
  editUser: {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
    gender: GenderList[1].value,
    domain: DomainList[1].value,
    available: false,
  },
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setEditUser(state, action) {
      state.editUser = action.payload;
    },
    resetEditUser(state, action) {
      state.editUser = initialState.editUser;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEditUser, resetEditUser } = UserSlice.actions;

export default UserSlice.reducer;
