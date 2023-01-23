import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: null,
  isAppInited: null,
};

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      localStorage.removeItem("token");
      delete state.user;
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
    setIsAppInited: (state) => (state.isAppInited = true),
  },
});

export const modalsSlice = createSlice({
  name: "modals",
  initialState: {},
  reducers: {
    setIsLogoutModalShown: (state, action) => {
      state.isLogoutModalShown = action.payload;
    },
    setIsLoginModalShown: (state, action) => {
      state.isLoginModalShown = action.payload;
    },
    setIsProfileModalShown: (state, action) => {
      state.isProfileModalShown = action.payload;
    },
    setIsFiltersModalShown: (state, action) => {
      state.isFiltersModalShown = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser, setIsLoading, toggleFavorite } =
  coreSlice.actions;

export const {
  setIsLogoutModalShown,
  setIsProfileModalShown,
  setIsLoginModalShown,
  setIsFiltersModalShown,
} = modalsSlice.actions;

// Exported selectors for each reducer

export const coreContext = createSelector((state) => state.core);
export const modalsContext = createSelector((state) => state.modals);
