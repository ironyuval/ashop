import Home from "../../pages/Home";
import About from "../../pages/About";
import Browse from "../../pages/Browse";
import Admin from "../../pages/Admin";
import Product from "../../pages/Product";
import Wishlist from "../../pages/Wishlist";
import Cart from "../../pages/Cart";
import { Navigate, Route, Routes } from "react-router";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/browse" element={<Browse />} />
    <Route path="/wishlist" element={<Wishlist />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/product" element={<Product />} />
    <Route path="/product/:productId" element={<Product />} />
    <Route path="/404" element={<div>404</div>} />
    <Route path="*" element={<Navigate to="/404" />} />
  </Routes>
);
