import api from "../../api";
import { setIsLoading, setUser } from "../../redux/slice";
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

    console.log("initing app...");
    console.log("getting data for user...");
    const { data } = await api.User.getData();
    dispatch(setUser(data));
    console.log("user data: ");
    console.log(data);
    console.log("app inited");
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setIsLoading(false));
  }
};
