import { combineReducers } from "@reduxjs/toolkit";
import favouriteListSlice from "./favouriteList.slice";
import accountSlice from "./account.slice";

export const rootReducer = combineReducers({
  favouriteList: favouriteListSlice.reducer,
  account: accountSlice.reducer,
});

export const favouriteListActions = favouriteListSlice.actions;
export const accountActions = accountSlice.actions;
