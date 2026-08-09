import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ResetPasswordForm from "../components/Auth/ResetPasswordForm";

export default function ResetPassword() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F4FC]">

      {/* BACKGROUND */}

      <div
        className="
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-[#D7B7FF]/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -right-32
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#E7D5EE]/30
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          items-center
          justify-center
          px-5
          py-10
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            w-full
            max-w-xl
            overflow-hidden
            rounded-[32px]
            border
            border-[#E4DAED]
            bg-[#FCFAFF]
            px-7
            py-10
            shadow-[0_30px_90px_rgba(81,64,100,0.13)]
            sm:px-12
            sm:py-14
          "
        >

          {/* TOP LINE */}

          <div
            className="
              absolute
              left-0
              right-0
              top-0
              h-[2px]
              bg-gradient-to-r
              from-[#B48CF0]
              via-[#D7B7FF]
              to-[#9B72D0]
            "
          />

          {/* BRAND */}

          <div className="text-center">

            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-[#DCCFE8]
                bg-white
              "
            >
              <Sparkles
                size={18}
                strokeWidth={1.3}
                className="text-[#9B72D0]"
              />
            </div>

            <p
              className="
                mt-5
                font-['Cormorant_Garamond']
                text-3xl
                tracking-[5px]
                text-[#5E4B7A]
              "
            >
              ROSELLE
            </p>

            <p
              className="
                mt-2
                text-[8px]
                uppercase
                tracking-[4px]
                text-[#9B72D0]
              "
            >
              Account recovery
            </p>

            <h1
              className="
                mt-8
                font-['Cormorant_Garamond']
                text-5xl
                text-[#514064]
              "
            >
              A fresh beginning.
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-md
                text-sm
                leading-7
                text-[#81768D]
              "
            >
              Create a new password and continue
              your Roselle journey.
            </p>

          </div>

          {/* FORM */}

          <div className="mt-10">
            <ResetPasswordForm />
          </div>

          {/* BACK */}

          <button
            type="button"
            onClick={() => navigate("/auth")}
            className="
              mx-auto
              mt-8
              flex
              items-center
              gap-2
              text-[9px]
              uppercase
              tracking-[3px]
              text-[#756982]
              transition
              hover:text-[#B48CF0]
            "
          >
            <ArrowLeft size={14} />
            Back to sign in
          </button>

        </motion.div>

      </div>

    </main>
  );
}