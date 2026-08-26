import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { googleLoginUser } from "../../config/apis/authApi";
import { useToast } from "../../context/ToastContext";

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google credential received");

      const response = await googleLoginUser({
        credential: credentialResponse.credential,
      });

      console.log("Backend Google Response:", response);

      localStorage.setItem("token", response.token);

      if (response.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );
      }

      showToast(
        response.message || "Google login successful.",
        "success"
      );

      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);

      showToast(
        error.response?.data?.message ||
          "Google Login Failed",
        "error"
      );
    }
  };

  return (
    <motion.div
      whileHover={{ y: -1 }}
      className="
        flex
        w-full
        justify-center
        overflow-hidden
        rounded-xl
        border
        border-[#E5DCEA]
        bg-white
        py-2
        transition-all
        duration-300
        hover:border-[#D1BFE0]
      "
    >
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          console.error("Google Sign-In failed");

          showToast(
            "Google Login Failed",
            "error"
          );
        }}
        theme="outline"
        size="large"
        shape="pill"
      />
    </motion.div>
  );
}