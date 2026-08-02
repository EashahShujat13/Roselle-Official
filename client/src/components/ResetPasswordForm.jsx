import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { FiLock } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../config/apis/authApi";

export default function ResetPasswordForm() {

  const { token } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const response = await resetPassword(
        token,
        {
          password: formData.password,
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

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Password */}

      <div>

        <label className="mb-2 block text-sm font-medium text-[#655b75]">
          New Password
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="
            w-full
            rounded-2xl
            border
            border-[#d7b7ff]
            py-3.5
            pl-12
            pr-12
            focus:border-[#b48cf0]
            focus:ring-4
            focus:ring-[#d7b7ff]/40
            outline-none
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
          </button>

        </div>

      </div>

      {/* Confirm Password */}

      <div>

        <label className="mb-2 block text-sm font-medium text-[#655b75]">
          Confirm Password
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
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="
            w-full
            rounded-2xl
            border
            border-[#d7b7ff]
            py-3.5
            pl-12
            pr-12
            focus:border-[#b48cf0]
            focus:ring-4
            focus:ring-[#d7b7ff]/40
            outline-none
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
          </button>

        </div>

      </div>

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
        hover:bg-[#a67dea]
        transition-all
        "
      >

        {loading
          ? "Resetting..."
          : "Reset Password"}

        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition"
        />

      </button>

    </form>

  );

}