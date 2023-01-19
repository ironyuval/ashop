import api from "../../api";
import { setIsLoading, setUser } from "../../redux/slice";
import { useDispatch } from "react-redux";

export const tryInitApp = () => async (dispatch) => {
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
