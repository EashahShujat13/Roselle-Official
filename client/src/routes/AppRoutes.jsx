import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Shop from "../pages/Shop";
import SingleProduct from "../pages/SingleProduct";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";

export default function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/auth"
        element={<Auth />}
      />

      <Route
        path="/shop"
        element={<Shop />}
      />

      <Route
        path="/product/:id"
        element={<SingleProduct />}
      />

      <Route
        path="/cart"
        element={<Cart />}
      />

      <Route 
       path="/checkout"
       element={<Checkout />} 
      />
      <Route
       path="/profile"
       element={<Profile />}
      />

      

      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

    </Routes>
  );
}