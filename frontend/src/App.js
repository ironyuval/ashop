import testFn from "./server-shared/test";
import "./App.css";
import { AppRoutes } from "./components/App/Routes";
import Layout from "./components/App/Layout";
import Modals from "./components/Modals";
import { onTokenReceived } from "./components/App/logic";
import { LoadingModal } from "./components/Modals/LoadingModal";
import { setIsAppInited } from "./redux/slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

testFn();

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.core.user);
  const isAppInited = useSelector((state) => state.core.isAppInited);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(onTokenReceived(token));
    } else {
      dispatch(setIsAppInited());
    }
  }, []);

  useEffect(() => {
    if (user && user.name) {
      toast.success(`Welcome, ${user.name}!`);
    }
  }, [user]);

  return (
    <>
      <Layout>
        <Modals />
        <AppRoutes />
      </Layout>

      <LoadingModal />
    </>
  );
}

export default App;
