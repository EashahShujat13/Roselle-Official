import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { googleLoginUser } from "../../config/apis/authApi";

export default function GoogleLoginButton() {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google credential received");

      const response = await googleLoginUser({
        credential: credentialResponse.credential,
      });

      console.log("Backend Google Response:", response);

      localStorage.setItem("token", response.token);

      alert(response.message);

      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);

      alert(
        error.response?.data?.message ||
          "Google Login Failed"
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
          alert("Google Login Failed");
        }}
        theme="outline"
        size="large"
        shape="pill"
      />
    </motion.div>
  );
}