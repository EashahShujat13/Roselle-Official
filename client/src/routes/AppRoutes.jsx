import { Routes, Route } from "react-router-dom";

// Main Pages
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import SingleProduct from "../pages/SingleProduct";

// Authentication
import Auth from "../pages/Auth";
import ResetPassword from "../pages/ResetPassword";

// Shopping
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";

// Account & Orders
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";

// Information Pages
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Terms from "../pages/Terms";
import ShippingReturns from "../pages/ShippingReturns";

// Fallback
import NotFound from "../pages/NotFound";

// Admin Pages
import AdminLayout from "../components/Admin/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminProducts from "../pages/Admin/AdminProducts";
import AdminOrders from "../pages/Admin/AdminOrders";
import AdminCustomers from "../pages/Admin/AdminCustomers";
import AdminCategories from "../pages/Admin/AdminCategories";
import AdminAnalytics from "../pages/Admin/AdminAnalytics";
import AdminCoupons from "../pages/Admin/AdminCoupons";
import AdminSettings from "../pages/Admin/AdminSettings";
import ProtectedAdminRoute from "../components/Admin/ProtectedAdminRoute";



export default function AppRoutes() {
  return (
    <Routes>
      {/* =========================
          MAIN
      ========================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/shop"
        element={<Shop />}
      />

      <Route
        path="/product/:id"
        element={<SingleProduct />}
      />

      {/* =========================
          AUTHENTICATION
      ========================= */}

      <Route
        path="/auth"
        element={<Auth />}
      />

      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      {/* =========================
          SHOPPING
      ========================= */}

      <Route
        path="/cart"
        element={<Cart />}
      />

      <Route
        path="/wishlist"
        element={<Wishlist />}
      />

      <Route
        path="/checkout"
        element={<Checkout />}
      />

      {/* =========================
          ACCOUNT & ORDERS
      ========================= */}

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/orders"
        element={<Orders />}
      />

      <Route
        path="/orders/:id"
        element={<OrderDetails />}
      />

      {/* =========================
          INFORMATION
      ========================= */}

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
      />

      <Route
        path="/terms"
        element={<Terms />}
      />

      <Route
        path="/shipping-returns"
        element={<ShippingReturns />}
      />

      
      {/* =========================
          ADMIN PAGES
      ========================= */}
    <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
          <AdminLayout />
          </ProtectedAdminRoute>
          }
      >

      <Route index 
      element={<AdminDashboard />} 
      />

      <Route path="products"
       element={<AdminProducts />}
      />

      <Route path="orders"
       element={<AdminOrders />}
      />

      <Route path="customers"
       element={<AdminCustomers />}
      />

      <Route path="categories"
        element={<AdminCategories />}
      />

      <Route path="analytics"
       element={<AdminAnalytics />}
      />

      <Route path="coupons"
       element={<AdminCoupons />}
      />

      <Route path="settings"
       element={<AdminSettings />}
      />

    
</Route>


      {/* =========================
          404
      ========================= */}

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}