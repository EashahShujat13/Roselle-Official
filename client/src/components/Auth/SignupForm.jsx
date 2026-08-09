import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { useState } from "react";

import { signupUser } from "../../config/apis/authApi";

export default function SignupForm() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [signupData, setSignupData] =
    useState({
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      signupData.password !==
      signupData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await signupUser({
        fullname: signupData.fullname,
        email: signupData.email,
        password: signupData.password,
      });

      alert(response.message);

      setSignupData({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Signup Failed"
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
      className="space-y-4"
    >

      {/* Full Name */}
      <div>
        <label className="
          mb-2
          block
          text-[9px]
          uppercase
          tracking-[2px]
          text-[#756982]
        ">
          Full Name
        </label>

        <div className="relative">

          <FiUser
            size={17}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[#A894B8]
            "
          />

          <input
            type="text"
            name="fullname"
            value={signupData.fullname}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
            required
          />

        </div>
      </div>

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
            size={17}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[#A894B8]
            "
          />

          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            placeholder="Your email address"
            className={inputClass}
            required
          />

        </div>
      </div>

      {/* Password */}
      <div>
        <label className="
          mb-2
          block
          text-[9px]
          uppercase
          tracking-[2px]
          text-[#756982]
        ">
          Password
        </label>

        <div className="relative">

          <FiLock
            size={17}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[#A894B8]
            "
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            value={signupData.password}
            onChange={handleChange}
            placeholder="Create a password"
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

      {/* Confirm Password */}
      <div>
        <label className="
          mb-2
          block
          text-[9px]
          uppercase
          tracking-[2px]
          text-[#756982]
        ">
          Confirm Password
        </label>

        <div className="relative">

          <FiLock
            size={17}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[#A894B8]
            "
          />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            name="confirmPassword"
            value={
              signupData.confirmPassword
            }
            onChange={handleChange}
            placeholder="Confirm your password"
            className={inputClass}
            required
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-[#A894B8]
              hover:text-[#B48CF0]
            "
          >
            {showConfirmPassword ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>

        </div>
      </div>

      {/* Button */}
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="
          group
          mt-2
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
        "
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}

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

    </form>
  );
}