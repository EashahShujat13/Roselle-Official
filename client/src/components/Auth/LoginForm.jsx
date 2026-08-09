import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { FiLock, FiMail } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../config/apis/authApi";
import GoogleLoginButton from "./GoogleLoginButton";

export default function LoginForm({
  openForgotPassword,
}) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(loginData);

      localStorage.setItem("token", response.token);

      if (response.user) {
       localStorage.setItem(
         "user",
        JSON.stringify(response.user)
       );
     }

      alert(response.message);

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full
    rounded-xl
    border
    border-[#E1D5EB]
    bg-[#FFFDFE]
    py-3.5
    pl-11
    pr-11
    text-sm
    text-[#514064]
    placeholder:text-[#B4A8BC]
    outline-none
    transition-all
    duration-300
    focus:border-[#B48CF0]
    focus:ring-4
    focus:ring-[#D7B7FF]/20
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      {/* Email */}
      <div>
        <label className="
          mb-2
          block
          text-[9px]
          uppercase
          tracking-[2px]
          text-[#756982]
        ">
          Email Address
        </label>

        <div className="relative">

          <FiMail
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[#A894B8]
            "
            size={17}
          />

          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Your email address"
            className={inputClass}
            required
          />

        </div>
      </div>

      {/* Password */}
      <div>
        <div className="
          mb-2
          flex
          items-center
          justify-between
        ">
          <label className="
            text-[9px]
            uppercase
            tracking-[2px]
            text-[#756982]
          ">
            Password
          </label>

          <button
            type="button"
            onClick={openForgotPassword}
            className="
              text-[9px]
              tracking-[1px]
              text-[#9B72D0]
              hover:text-[#70558E]
              transition
            "
          >
            Forgot password?
          </button>
        </div>

        <div className="relative">

          <FiLock
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[#A894B8]
            "
            size={17}
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Your password"
            className={inputClass}
            required
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-[#A894B8]
              hover:text-[#B48CF0]
              transition
            "
          >
            {showPassword ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>

        </div>
      </div>

      {/* Remember */}
      <label className="
        flex
        items-center
        gap-2
        text-[10px]
        text-[#81768D]
      ">
        <input
          type="checkbox"
          className="accent-[#B48CF0]"
        />
        Remember me
      </label>

      {/* Login button */}
      <motion.button
        whileHover={{
          y: -2,
        }}
        whileTap={{
          scale: 0.98,
        }}
        type="submit"
        disabled={loading}
        className="
          group
          flex
          h-14
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-[#5E4B7A]
          text-white
          text-[10px]
          uppercase
          tracking-[3px]
          transition-all
          duration-300
          hover:bg-[#806298]
          hover:shadow-[0_12px_30px_rgba(94,75,122,0.18)]
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        {loading
          ? "Signing In..."
          : "Enter Roselle"}

        {!loading && (
          <ArrowRight
            size={16}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        )}
      </motion.button>

      {/* Divider */}
      <div className="
        flex
        items-center
        gap-4
        py-1
      ">
        <span className="h-px flex-1 bg-[#E7DCEF]" />

        <span className="
          text-[8px]
          uppercase
          tracking-[3px]
          text-[#A79AAE]
        ">
          Or continue with
        </span>

        <span className="h-px flex-1 bg-[#E7DCEF]" />
      </div>

      <GoogleLoginButton />

    </form>
  );
}