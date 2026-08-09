import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { FiLock } from "react-icons/fi";
import { useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  resetPassword,
} from "../../config/apis/authApi";

export default function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [formData, setFormData] =
    useState({
      password: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response =
        await resetPassword(
          token,
          {
            password:
              formData.password,
          }
        );

      alert(response.message);

      navigate("/auth");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Reset Failed"
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
          New Password
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
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
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

      {/* Confirm */}
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
              formData.confirmPassword
            }
            onChange={handleChange}
            placeholder="Confirm new password"
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

      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
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
          hover:bg-[#806298]
          disabled:opacity-60
        "
      >
        {loading
          ? "Resetting..."
          : "Reset Password"}

        {!loading && (
          <ArrowRight
            size={16}
            className="
              transition-transform
              group-hover:translate-x-1
            "
          />
        )}
      </motion.button>

    </form>
  );
}