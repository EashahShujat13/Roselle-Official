import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className={isAdminRoute ? "" : "min-h-screen bg-[#FDFBFE] text-[#514064]"}>
      {!isAdminRoute && <Navbar />}
      <main>
        <AppRoutes />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default AppContent;