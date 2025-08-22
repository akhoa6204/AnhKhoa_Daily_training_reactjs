import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../interface/user";
import { SliceName } from "./sliceName";

const initialState = {
  users: [] as IUser[],
  user: null as IUser | null,
  isAuthenticated: false as boolean,
};
const accountSlice = createSlice({
  name: SliceName.Account,
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<Pick<IUser, "email">>) {
      const { email } = action.payload;
      const user = state.users?.find((user) => user.email === email);
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
      }
    },
    logOut(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    registerSuccess(state, action: PayloadAction<IUser>) {
      state.users = [...state.users, action.payload];
    },
  },
});

export default accountSlice;
export const { loginSuccess, logOut, registerSuccess } = accountSlice.actions;
