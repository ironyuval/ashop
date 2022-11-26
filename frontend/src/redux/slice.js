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

const initialState = {
  //data
  user: {
    email: user.email,
    name: user.name,
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
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setIsLogoutModalShown, setIsLoading } =
  appSlice.actions;

export default appSlice.reducer;
