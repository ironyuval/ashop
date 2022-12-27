import { createSlice } from "@reduxjs/toolkit";

export const getStorageUser = () => {
  const storagedUser = localStorage.getItem("user");
  const user = (storagedUser && JSON.parse(localStorage.getItem("user"))) || {};

  return user;
};

export const getStorageToken = () => {
  const user = getStorageUser();
  return user.token;
};

const user = getStorageUser();

export const initialState = {
  //data
  user: {
    email: user.email,
    name: user.name,
    favorites: user.favorites,
    token: user.token,
    type: user.type,
  },
  //modals
  isLogoutModalShown: false,
  isLoading: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload };
    },
    setIsLogoutModalShown: (state, action) => {
      return { ...state, isLogoutModalShown: action.payload };
    },
    setIsLoading: (state, action) => {
      return { ...state, isLoading: action.payload };
    },
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const newFavorites = [...state.user.favorites];
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
export const { setUser, setIsLogoutModalShown, setIsLoading } =
  appSlice.actions;

export default appSlice.reducer;
