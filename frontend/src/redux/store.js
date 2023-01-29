import { coreSlice } from "./slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  core: coreSlice.reducer,
});

export const store = configureStore({
  reducer,
});
