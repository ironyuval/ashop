import { coreSlice, modalsSlice } from "./slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  core: coreSlice.reducer,
  modals: modalsSlice.reducer,
});

export const store = configureStore({
  reducer,
});
