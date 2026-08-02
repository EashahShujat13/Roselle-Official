import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { googleLoginUser } from "../config/apis/authApi";

export default function GoogleLoginButton() {

  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {

    try {

      const response = await googleLoginUser({
        credential: credentialResponse.credential,
      });

      localStorage.setItem("token", response.token);

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

    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => alert("Google Login Failed")}
    />

  );

}