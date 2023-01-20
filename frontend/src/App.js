import testFn from "./server-shared/test";
import "./App.css";
import { AppRoutes } from "./components/App/Routes";
import Layout from "./components/App/Layout";
import Modals from "./components/Modals";
import { onTokenReceived } from "./components/App/logic";
import { LoadingModal } from "./components/Modals/LoadingModal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

testFn();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(onTokenReceived(token));
    }
  }, []);

  return (
    <>
      <LoadingModal />

      <Layout>
        <Modals />
        <AppRoutes />
      </Layout>
    </>
  );
}

export default App;
