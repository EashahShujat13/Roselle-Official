import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FiMail } from "react-icons/fi";
import { forgotPassword } from "../config/apis/authApi";

export default function ForgotPasswordForm() {

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await forgotPassword({ email });

      alert(response.message);

      setEmail("");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
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
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
        "
      >

        {loading
          ? "Sending Link..."
          : "Send Reset Link"}

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