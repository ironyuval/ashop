import "./App.css";
import { AppRoutes } from "./components/App/Routes";
import Layout from "./components/App/Layout";
import Modals from "./components/Modals";
import { onTokenReceived } from "./components/App/logic";
import { LoadingModal } from "./components/Modals/LoadingModal";
import { setIsAppInited } from "./redux/slice";
import Fab from "./components/Fab/Fab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.core.user);
  const userMail = user && user.email;
  const isAppInited = useSelector((state) => state.core.isAppInited);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("initing app...");
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(onTokenReceived(token));
    } else {
      console.log("no user logged");
      dispatch(setIsAppInited());
    }
  }, []);

  useEffect(() => {
    if (userMail) {
      toast.success(`Welcome, ${user.name}!`);
    }
  }, [userMail]);

  return (
    <>
      <Layout>
        <Modals />
        <AppRoutes />
      </Layout>
      <Fab onClick={() => navigate("/product")} />
    </>
  );
}

export default App;
