import Home from "./pages/Home";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import Browse from "./pages/Browse";
import Register from "./pages/Register";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import Product from "./pages/Product";
import { getBasename } from "./utils";
import Footer from "./components/Footer";
import LogoutModal from "./components/LogoutModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const getAllProducts = `${getBasename()}/api/product/`;

function App() {
  const user = useSelector((state) => state.app.user);

  const [products, setProducts] = useState([]);

  const getFirstFiveProducts = async () => {
    try {
      const { data } = await axios.get(getAllProducts);
      setProducts(data.products);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFirstFiveProducts();
  }, []);

  return (
    <Router basename="/">
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          height: "100vh",
          border: "2px solid green",
        }}
      >
        <Header />
        <LogoutModal />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            height: "100vh",
            border: "2px solid green",
          }}
        >
          <Routes>
            <Route path="/" element={<Home products={products} />} />
            <Route path="/about" element={<About />} />
            <Route path="/browse" element={<Browse products={products} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            {user.type === 1 ? (
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
