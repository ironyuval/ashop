import { createSlice } from "@reduxjs/toolkit";

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
    toggleWishlist: (state, action) => {
      const productId = action.payload;
      let wishlist = state.user.wishlist || [];
      if (wishlist.includes(productId)) {
        state.user.wishlist = wishlist.filter((id) => id !== productId);
      } else {
        state.user.wishlist.push(productId);
      }
    },
    toggleCart: (state, action) => {
      const productId = action.payload;
      let cart = state.user.cart || [];
      if (cart.includes(productId)) {
        state.user.cart = cart.filter((id) => id !== productId);
      } else {
        state.user.cart.push(productId);
      }
    },
    setIsAppInited: (state) => {
      console.log("app inited");
      state.isAppInited = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  removeUser,
  setIsLoading,
  toggleWishlist,
  toggleCart,
  setIsAppInited,
} = coreSlice.actions;
