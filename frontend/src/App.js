import { getStorageToken, setUser } from "./redux/slice";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Admin from "./pages/Admin";
import Browse from "./pages/Browse";
import Register from "./pages/Register";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import Product from "./pages/Product";
import { getBasename } from "./utils";
import Footer from "./components/Footer";
import LogoutModal from "./components/LogoutModal";
import ProfileModal from "./components/ProfileModal";
import { UserType } from "./utils/types";
import { MobileMenu } from "./components/MobileMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

const random = Math.floor(Math.random() * 5);

const queryString = new URLSearchParams(`perPage=5`);

const getAllProducts = `${getBasename()}/api/product?${queryString}`;

const getUserDataURL = `${getBasename()}/api/user/data`;

function App() {
  const user = useSelector((state) => state.app.user);

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const getFirstFiveProducts = async () => {
    try {
      const { data } = await axios.get(getAllProducts);
      setProducts(data.products);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${getStorageToken()}` },
    };

    try {
      const { data } = await axios.get(getUserDataURL, config);
      dispatch(setUser(data));
      console.log("user data received: ", data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFirstFiveProducts();
    if (user) {
      getUserData();
    }
  }, []);

  return (
    <Router basename="/">
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          height: "100vh",
          /*           border: "2px solid green",
           */
        }}
      >
        <MobileMenu />

        <Header />
        <LogoutModal />
        <ProfileModal />

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            height: "100vh",
            /*             border: "2px solid green",
             */
          }}
        >
          <Routes>
            <Route path="/" element={<Home products={products} />} />
            <Route path="/about" element={<About />} />
            <Route path="/browse" element={<Browse products={products} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            {user && user.type === UserType.Admin ? (
              <>
                <Route path="/admin" element={<Admin />} />

                <Route path="/product" element={<Product />} />
              </>
            ) : undefined}
          </Routes>
        </div>
        <ToastContainer position="bottom-right" />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
