import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SliceName } from "./sliceName";
import type { IProduct } from "../../interface/product";

const initialState = {
  items: [] as IProduct[],
};
const favouriteListSlice = createSlice({
  name: SliceName.FavouriteList,
  initialState,
  reducers: {
    toggleToFavourite: (state, action: PayloadAction<IProduct>) => {
      if (state.items.some((item) => item.id === action.payload.id)) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items = [...state.items, action.payload];
      }
    },
  },
});
export const { toggleToFavourite } = favouriteListSlice.actions;
export default favouriteListSlice;
