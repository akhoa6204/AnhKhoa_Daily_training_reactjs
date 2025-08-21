import { combineReducers } from "@reduxjs/toolkit";
import favouriteListSlice from "./favouriteList.slice";

export const rootReducer = combineReducers({
  favouriteList: favouriteListSlice.reducer,
});

export const favouriteListActions = favouriteListSlice.actions;
