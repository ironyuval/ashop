import testFn from "./server-shared/test";
import "./App.css";
import { AppRoutes } from "./components/App/Routes";
import Layout from "./components/App/Layout";
import Modals from "./components/Modals";
import { tryInitApp } from "./components/App/logic";
import { useLocalStorage } from "./utils/useLocalStorage";
import { LoadingModal } from "./components/Modals/LoadingModal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

testFn();

function App() {
  const dispatch = useDispatch();
  const [token] = useLocalStorage("token");

  useEffect(() => {
    if (token) dispatch(tryInitApp());
  }, [token]);

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
