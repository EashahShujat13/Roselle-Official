import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { signupUser } from "../config/apis/authApi";

export default function SignupForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [signupData, setSignupData] = useState({
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

    if (signupData.password !== signupData.confirmPassword) {
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
        error.response?.data?.message || "Signup Failed"
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

      {/* Full Name */}

      <div>

        <label className="mb-2 block text-sm font-medium text-[#655b75]">
          Full Name
        </label>

        <div className="relative">

          <FiUser
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
            type="text"
            name="fullname"
            value={signupData.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
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
            name="email"
            value={signupData.email}
            onChange={handleChange}
            placeholder="Enter your email"
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
            name="password"
            value={signupData.password}
            onChange={handleChange}
            placeholder="Create a password"
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
            value={signupData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
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
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
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
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

      </div>

      {/* Create Account Button */}

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
        {loading ? "Creating Account..." : "Create Account"}

        <ArrowRight
          size={18}
          className="
          transition-transform
          duration-300
          group-hover:translate-x-1
          "
        />

      </button>

    </form>

  );
}