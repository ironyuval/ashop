import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import Browse from "./pages/Browse";
import Register from "./pages/Register";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import Product from "./pages/Product";
import { getBasename } from "./utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const getAllProducts = `${getBasename()}/api/product/`;

function App() {
  const user = { name: "Gal", type: 1 };

  const [products, setProducts] = useState([]);

  const getFirstFiveProducts = async () => {
    try {
      const { data } = await axios.get(getAllProducts);
      setProducts(data.products);
      console.log(data.products);
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
        <Header />
      </div>
    </Router>
  );
}

export default App;
