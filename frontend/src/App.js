import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import Browse from "./pages/Browse";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const getAllProducts = "https://ashopauth.herokuapp.com/api/product/";

function App() {
  const user = { name: "Gal", type: 1 };

  const [products, setProducts] = useState([]);

  const getFirstFiveProducts = async () => {
    try {
      const { data } = await axios.get(getAllProducts);
      setProducts(data.products);
      console.log("we got products");
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFirstFiveProducts();
  }, []);

  return (
    <Router>
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Admin />} />
          <Route path="/auth" element={<Admin />} />
          <Route path="/browse" element={<Browse products={products} />} />
          <Route path="/product" element={<Admin />} />
          {user.type === 1 ? (
            <Route path="/admin" element={<Admin />} />
          ) : undefined}
        </Routes>
        <Header />
      </div>
    </Router>
  );
}

export default App;
