import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import authImage from "../../assets/images/auth/roselleauth.jpg";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function AuthCard() {
  const [authScreen, setAuthScreen] = useState("login");

  const content = {
    login: {
      eyebrow: "Welcome to Roselle",
      title: "Welcome back.",
      description:
        "Sign in to continue your Roselle experience.",
    },

    signup: {
      eyebrow: "Begin your Roselle journey",
      title: "Create your account.",
      description:
        "Join Roselle and discover pieces made to become part of your story.",
    },

    forgot: {
      eyebrow: "Roselle account",
      title: "Forgot your password?",
      description:
        "Enter your email and we'll send you a secure reset link.",
    },
  };

  const current = content[authScreen];

  return (
    <main className="min-h-screen bg-[#F8F4FB] px-4 py-6 md:px-8 lg:px-10">

      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          overflow-hidden
          rounded-[28px]
          bg-white
          shadow-[0_25px_80px_rgba(80,55,100,0.12)]
          lg:min-h-[780px]
          lg:grid
          lg:grid-cols-2
        "
      >

        {/* =====================================================
            LEFT IMAGE
        ====================================================== */}

        <motion.section
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="
            relative
            hidden
            min-h-[780px]
            overflow-hidden
            lg:block
          "
        >

          {/* Background Image */}

          <img
            src={authImage}
            alt="Roselle jewellery"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          {/* Soft overlay */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-b
              from-[#241A2F]/20
              via-[#3D2A4F]/10
              to-[#241A2F]/70
            "
          />

          {/* =================================================
              ROSELLE BRAND
              MOVED TO RIGHT SIDE
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.25,
            }}
            className="
              absolute
              top-10
              right-10
              z-10
              text-right
            "
          >

            <p
              className="
                font-['Cormorant_Garamond']
                text-3xl
                tracking-[0.28em]
                text-white
                drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]
              "
            >
              ROSELLE
            </p>

            <div
              className="
                mt-2
                ml-auto
                h-px
                w-10
                bg-[#D7B7FF]
              "
            />

          </motion.div>

          {/* Small decorative icon */}

          <div
            className="
              absolute
              right-10
              top-[120px]
              z-10
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              bg-white/10
              text-white
              backdrop-blur-md
            "
          >
            <Sparkles size={17} strokeWidth={1.3} />
          </div>

          {/* =================================================
              IMAGE TEXT
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.45,
            }}
            className="
              absolute
              bottom-12
              left-10
              right-10
              z-10
            "
          >

            <p
              className="
                uppercase
                tracking-[0.45em]
                text-[9px]
                text-[#E8D9F7]
              "
            >
              Jewellery with intention
            </p>

            <h2
              className="
                mt-4
                max-w-xl
                font-['Cormorant_Garamond']
                text-5xl
                leading-[0.9]
                text-white
                md:text-6xl
              "
            >
              Pieces that become
              <br />

              <span
                className="
                  italic
                  text-[#D7B7FF]
                "
              >
                part of your story.
              </span>
            </h2>

          </motion.div>

        </motion.section>


        {/* =====================================================
            RIGHT AUTH PANEL
        ====================================================== */}

        <section
          className="
            relative
            flex
            min-h-[720px]
            flex-col
            justify-center
            overflow-hidden
            bg-[#FCFAFF]
            px-7
            py-12
            sm:px-12
            md:px-16
            lg:px-20
            xl:px-24
          "
        >

          {/* Soft decorative glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-72
              w-72
              rounded-full
              bg-[#D7B7FF]/20
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              -left-32
              h-72
              w-72
              rounded-full
              bg-[#B48CF0]/10
              blur-3xl
            "
          />


          <div className="relative z-10 mx-auto w-full max-w-[560px]">

            {/* Mobile Brand */}

            <div className="mb-12 lg:hidden">

              <p
                className="
                  font-['Cormorant_Garamond']
                  text-3xl
                  tracking-[0.25em]
                  text-[#514064]
                "
              >
                ROSELLE
              </p>

              <div className="mt-2 h-px w-10 bg-[#B48CF0]" />

            </div>


            {/* =================================================
                HEADER
            ================================================== */}

            <AnimatePresence mode="wait">

              <motion.div
                key={authScreen}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                }}
                transition={{
                  duration: 0.35,
                }}
              >

                <p
                  className="
                    uppercase
                    tracking-[0.45em]
                    text-[9px]
                    text-[#9B72D0]
                  "
                >
                  {current.eyebrow}
                </p>

                <h1
                  className="
                    mt-5
                    font-['Cormorant_Garamond']
                    text-5xl
                    leading-[0.95]
                    text-[#514064]
                    md:text-6xl
                  "
                >
                  {current.title}
                </h1>

                <p
                  className="
                    mt-5
                    max-w-md
                    text-sm
                    leading-7
                    text-[#81768D]
                  "
                >
                  {current.description}
                </p>

              </motion.div>

            </AnimatePresence>


            {/* =================================================
                AUTH TABS
            ================================================== */}

            {authScreen !== "forgot" && (

              <div
                className="
                  mt-10
                  flex
                  border-b
                  border-[#E5DCEA]
                "
              >

                <button
                  type="button"
                  onClick={() => setAuthScreen("login")}
                  className={`
                    relative
                    flex-1
                    pb-4
                    text-[10px]
                    uppercase
                    tracking-[0.35em]
                    transition
                    ${
                      authScreen === "login"
                        ? "text-[#5E4B7A]"
                        : "text-[#A59AAE] hover:text-[#806298]"
                    }
                  `}
                >
                  Sign In

                  {authScreen === "login" && (
                    <motion.span
                      layoutId="authTab"
                      className="
                        absolute
                        bottom-[-1px]
                        left-0
                        h-[2px]
                        w-full
                        bg-[#B48CF0]
                      "
                    />
                  )}

                </button>


                <button
                  type="button"
                  onClick={() => setAuthScreen("signup")}
                  className={`
                    relative
                    flex-1
                    pb-4
                    text-[10px]
                    uppercase
                    tracking-[0.35em]
                    transition
                    ${
                      authScreen === "signup"
                        ? "text-[#5E4B7A]"
                        : "text-[#A59AAE] hover:text-[#806298]"
                    }
                  `}
                >
                  Create Account

                  {authScreen === "signup" && (
                    <motion.span
                      layoutId="authTab"
                      className="
                        absolute
                        bottom-[-1px]
                        left-0
                        h-[2px]
                        w-full
                        bg-[#B48CF0]
                      "
                    />
                  )}

                </button>

              </div>

            )}


            {/* =================================================
                FORM
            ================================================== */}

            <div className="mt-9">

              <AnimatePresence mode="wait">

                <motion.div
                  key={authScreen}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                >

                  {authScreen === "login" && (
                    <LoginForm
                      openForgotPassword={() =>
                        setAuthScreen("forgot")
                      }
                    />
                  )}

                  {authScreen === "signup" && (
                    <SignupForm />
                  )}

                  {authScreen === "forgot" && (
                    <ForgotPasswordForm />
                  )}

                </motion.div>

              </AnimatePresence>

            </div>


            {/* =================================================
                FORGOT PASSWORD BACK
            ================================================== */}

            {authScreen === "forgot" && (

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                type="button"
                onClick={() => setAuthScreen("login")}
                className="
                  mt-7
                  flex
                  items-center
                  gap-2
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-[#806298]
                  transition
                  hover:text-[#B48CF0]
                "
              >
                <ArrowRight
                  size={13}
                  className="rotate-180"
                />

                Back to sign in

              </motion.button>

            )}

          </div>

        </section>

      </div>

    </main>
  );
}