import { createSlice } from "@reduxjs/toolkit";

export const initialState = {};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      delete state.user;
    },
    setIsLogoutModalShown: (state, action) => {
      state.isLogoutModalShown = action.payload;
    },
    setIsLoginModalShown: (state, action) => {
      state.isLoginModalShown = action.payload;
    },
    setIsProfileModalShown: (state, action) => {
      state.isProfileModalShown = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      let newFavorites = [...state.user.favorites];
      if (state.user.favorites.includes(productId)) {
        newFavorites = state.user.favorites.filter((id) => id !== productId);
      } else {
        newFavorites.push(productId);
      }

      state.user.favorites = newFavorites;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  removeUser,
  setIsLogoutModalShown,
  setIsLoading,
  toggleFavorite,
  setIsProfileModalShown,
  setIsLoginModalShown,
} = appSlice.actions;

export default appSlice.reducer;
