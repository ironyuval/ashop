export const tryInitApp = (dispatch) => async () => {
  try {
    const { data } = await API.User.getUserData();
    dispatch(setUser(data));
    console.log("user data received: ", data);
  } catch (e) {
    console.log(e);
  }
};
