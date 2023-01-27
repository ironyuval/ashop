import Home from "../../pages/Home";
import About from "../../pages/About";
import Browse from "../../pages/Browse";
import Register from "../../pages/Register";
import LoginPage from "../../pages/LoginPage";
import Admin from "../../pages/Admin";
import Product from "../../pages/Product";
import { Navigate, Route, Routes } from "react-router";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/browse" element={<Browse />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/product/:productId" element={<Product />} />
    <Route path="/404" element={<div>404</div>} />
    <Route path="*" element={<Navigate to="/404" />} />
  </Routes>
);
