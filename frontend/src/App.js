import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import Browse from "./pages/Browse";
import Register from "./pages/Register";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import Product from "./pages/Product";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
    <BrowserRouter>
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
        <Switch>
          <Route path="/">
            <Home />
          </Route>

          <Route path="/about">
            <About />
          </Route>
          <Route path="/auth">
            <Admin />
          </Route>
          <Route path="/browse">
            <Browse products={products} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          {user.type === 1 ? (
            <>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/product">
                <Product />
              </Route>
            </>
          ) : undefined}
        </Switch>
        <ToastContainer position="bottom-right" />
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
