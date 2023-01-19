import testFn from "./server-shared/test";
import "./App.css";
import { AppRoutes } from "./components/App/Routes";
import Layout from "./components/App/Layout";
import Modals from "./components/Modals";
import { tryInitApp } from "./components/App/logic";
import { usePersistedString } from "./utils/usePersistedString";
import { LoadingModal } from "./components/Modals/LoadingModal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

testFn();

const useToken = () => {
  const dispatch = useDispatch();
  const [storageToken, setStorageToken, removeStorageToken] =
    usePersistedString("token");
  const [token, setToken] = useState(storageToken);

  useEffect(() => {
    if (token) {
      setStorageToken(token);
      dispatch(setToken(token));
    }
  }, [token]);

  const removeToken = () => {};

  return [token, setToken, removeToken];
};

function App() {
  const dispatch = useDispatch();
  const [token] = usePersistedString("token");

  useEffect(() => {
    if (token) {
      console.log("token detected");

      dispatch(tryInitApp());
    }
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
