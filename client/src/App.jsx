import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";

import ScrollToTop from "./components/common/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <ScrollToTop />

          <div className="min-h-screen bg-[#FDFBFE] text-[#514064]">
            <Navbar />

            <main>
              <AppRoutes />
            </main>

            <Footer />
          </div>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;