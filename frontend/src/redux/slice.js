import { createSlice } from "@reduxjs/toolkit";

export const getStorageUser = () => {
  const storagedUser = localStorage.getItem("user");

  if (storagedUser) {
    const parsed = JSON.parse(storagedUser);
    return parsed;
  }
};

export const getStorageToken = () => {
  const user = getStorageUser();
  return user.token;
};

const user = getStorageUser();

export const initialState = {
  //data
  user: user
    ? {
        email: user.email,
        name: user.name,
        favorites: user.favorites,
        token: user.token,
        type: user.type,
      }
    : null,
  //modals
  isLogoutModalShown: false,
  isProfileModalShown: false,
  isLoginModalShown: false,
  isLoading: false,
};

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
