import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";

import ScrollToTop from "./components/common/ScrollToTop";
import AppContent from "./AppContent";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <ScrollToTop />
          <AppContent />
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;