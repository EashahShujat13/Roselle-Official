import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FiMail } from "react-icons/fi";
import { useState } from "react";

import { forgotPassword } from "../../config/apis/authApi";

export default function ForgotPasswordForm({
  goBack,
}) {
  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await forgotPassword({ email });

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

      <button
        type="button"
        onClick={goBack}
        className="
          group
          inline-flex
          items-center
          gap-2
          text-[9px]
          uppercase
          tracking-[2px]
          text-[#81768D]
          hover:text-[#B48CF0]
          transition
        "
      >
        <ArrowLeft
          size={13}
          className="
            transition-transform
            group-hover:-translate-x-1
          "
        />

        Back to sign in
      </button>

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
            placeholder="Your email address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-[#E1D5EB]
              bg-[#FFFDFE]
              py-3.5
              pl-11
              pr-4
              text-sm
              text-[#514064]
              placeholder:text-[#B4A8BC]
              outline-none
              transition-all
              duration-300
              focus:border-[#B48CF0]
              focus:ring-4
              focus:ring-[#D7B7FF]/20
            "
            required
          />

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
          ? "Sending Link..."
          : "Send Reset Link"}

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

      <p className="
        text-center
        text-[10px]
        leading-5
        text-[#9A909F]
      ">
        We'll send a secure password reset
        link to your registered email.
      </p>

    </form>
  );
}