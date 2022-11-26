import { appSlice } from "./slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
