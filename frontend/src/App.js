import testFn from "./server-shared/test";
import "./App.css";
import { AppRoutes } from "./components/App/Routes";
import Layout from "./components/App/Layout";
import Modals from "./components/Modals";
import { tryInitApp } from "./components/App/logic";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

testFn();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryInitApp());
  }, []);

  return (
    <>
      <Layout>
        <Modals />
        <AppRoutes />
      </Layout>
    </>
  );
}

export default App;
