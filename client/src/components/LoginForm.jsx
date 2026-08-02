import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import {loginUser} from "../config/apis/authApi";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";

export default function LoginForm({
  openForgotPassword,
}) {

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

const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await loginUser(loginData);

    // JWT Save
    localStorage.setItem("token", response.token);

    alert(response.message);

    // Home Page
    navigate("/");

  } catch (error) {

    alert(
      error.response?.data?.message || "Login Failed"
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <form className="space-y-6"  onSubmit={handleSubmit}>

      {/* Email */}

      <div>
        <label className="mb-2 block text-sm font-medium text-[#655b75]">
          Email Address
        </label>

        <div className="relative">

          <FiMail
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[#9b8bab]
            text-lg
            "
          />

          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="
            w-full
            rounded-2xl
            border
            border-[#d7b7ff]
            bg-white
            py-3.5
            pl-12
            pr-4
            text-[#655b75]
            placeholder:text-[#b8a8c8]
            outline-none
            transition-all
            duration-300
            focus:border-[#b48cf0]
            focus:ring-4
            focus:ring-[#d7b7ff]/40
            "
          />

        </div>
      </div>

      {/* Password */}

      <div>

        <label className="mb-2 block text-sm font-medium text-[#655b75]">
          Password
        </label>

        <div className="relative">

          <FiLock
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[#9b8bab]
            text-lg
            "
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="
            w-full
            rounded-2xl
            border
            border-[#d7b7ff]
            bg-white
            py-3.5
            pl-12
            pr-12
            text-[#655b75]
            placeholder:text-[#b8a8c8]
            outline-none
            transition-all
            duration-300
            focus:border-[#b48cf0]
            focus:ring-4
            focus:ring-[#d7b7ff]/40
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-[#9b8bab]
            hover:text-[#b48cf0]
            transition
            "
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

        </div>

      </div>

      {/* Remember + Forgot */}

      <div className="flex items-center justify-between text-sm">

        <label className="flex items-center gap-2 text-[#655b75]">

          <input
            type="checkbox"
            className="accent-[#b48cf0]"
          />

          Remember me

        </label>

        <button
        type="button"
        onClick={openForgotPassword}
        className="
        text-[#b48cf0]
        hover:text-[#a67dea]
        transition
        "
      >
        Forgot Password?
      </button>

      </div>

      {/* Login Button */}

      <button
        type="submit"
        className="
        group
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-2xl
        bg-[#b48cf0]
        py-3.5
        font-semibold
        text-white
        transition-all
        duration-300
        hover:bg-[#a67dea]
        hover:-translate-y-0.5
        hover:shadow-lg
        hover:shadow-[#d7b7ff]
        "
      >
       {loading ? "Signing In..." : "Sign In"}

        <ArrowRight
          size={18}
          className="
          transition-transform
          duration-300
          group-hover:translate-x-1
          "
        />

      </button>

      {/* Divider */}

      <div className="flex items-center gap-4">

        <div className="h-px flex-1 bg-[#e8dcf8]"></div>

        <span className="text-xs uppercase tracking-[0.3em] text-[#a08db7]">
          OR
        </span>

        <div className="h-px flex-1 bg-[#e8dcf8]"></div>

      </div>

      {/* Google */}

      <GoogleLoginButton />

    </form>
  );
}