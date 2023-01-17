import api from "../../api";
import { setUser } from "../../redux/slice";
import { useDispatch } from "react-redux";

export const tryInitApp = () => async (dispatch) => {
  try {
    console.log("initing app...");
    const { data } = await api.User.getUser();
    dispatch(setUser(data));
    console.log("app inited...");
  } catch (e) {
    console.log(e);
  }
};
