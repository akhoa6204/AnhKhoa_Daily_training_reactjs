import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../components/ProductList";
import { SliceName } from "./sliceName";

const initialState = {
  items: [] as Product[],
};
const favouriteListSlice = createSlice({
  name: SliceName.FavouriteList,
  initialState,
  reducers: {
    toggleToFavourite: (state, action: PayloadAction<Product>) => {
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
