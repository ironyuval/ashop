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

testFn();

function App() {
  const dispatch = useDispatch();
  const isAppInited = useSelector((state) => state.core.isAppInited);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(onTokenReceived(token));
    } else {
      dispatch(setIsAppInited());
    }
  }, []);

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
