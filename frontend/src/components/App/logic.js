import api from "../../api";
import { setIsAppInited, setIsLoading, setUser } from "../../redux/slice";
import axios from "axios";

export const onTokenReceived = (token) => async (dispatch) => {
  localStorage.setItem("token", token);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
  dispatch(getUserData());
};

export const getUserData = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.User.getData();
    dispatch(setUser(data));
    console.log("user data received: ");
    console.log(data);
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setIsLoading(false));
    dispatch(setIsAppInited());
  }
};
