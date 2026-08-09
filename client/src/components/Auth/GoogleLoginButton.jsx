import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import {
  googleLoginUser,
} from "../../config/apis/authApi";

export default function GoogleLoginButton() {
  const navigate = useNavigate();

  const handleGoogleSuccess =
    async (credentialResponse) => {
      try {
        const response =
          await googleLoginUser({
            credential:
              credentialResponse.credential,
          });

        localStorage.setItem(
          "token",
          response.token
        );

        alert(response.message);

        navigate("/");
      } catch (error) {
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
        justify-center
        overflow-hidden
        rounded-xl
        border
        border-[#E5DCEA]
        bg-white
        py-2
        transition
        hover:border-[#D1BFE0]
      "
    >
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() =>
          alert("Google Login Failed")
        }
        theme="outline"
        shape="pill"
        size="large"
        width="100%"
      />
    </motion.div>
  );
}