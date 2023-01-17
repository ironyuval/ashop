import { createSlice } from "@reduxjs/toolkit";

export const getStorageToken = () => {
  const user = getStorageUser();
  return user.token;
};

export const initialState = {};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: { ...user, ...action.payload } };
    },
    removeUser: (state) => {
      return { ...state, user: null };
    },
    setIsLogoutModalShown: (state, action) => {
      return { ...state, isLogoutModalShown: action.payload };
    },
    setIsLoginModalShown: (state, action) => {
      return { ...state, isLoginModalShown: action.payload };
    },
    setIsProfileModalShown: (state, action) => {
      return { ...state, isProfileModalShown: action.payload };
    },
    setIsLoading: (state, action) => {
      return { ...state, isLoading: action.payload };
    },
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      let newFavorites = [...state.user.favorites];
      if (state.user.favorites.includes(productId)) {
        newFavorites = state.user.favorites.filter((id) => id !== productId);
      } else {
        newFavorites.push(productId);
      }

      return { ...state, user: { ...state.user, favorites: newFavorites } };
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
