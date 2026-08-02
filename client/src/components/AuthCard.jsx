import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function AuthCard() {
 const [authScreen, setAuthScreen] = useState("login");
  return (
    <div
      className="
        relative
        w-full
        max-w-xl
        overflow-hidden
       `rounded-[32px]`
        border
        border-[#d7b7ff]
        bg-white/95
        backdrop-blur-sm
        shadow-[0_20px_60px_rgba(180,140,240,0.18)]
        px-12 
        py-12
      "
    >
      {/* Top Accent */}

      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500"></div>

      {/* Brand */}

      <div className="text-center">

  <p className="text-xs tracking-[0.6em] uppercase font-semibold text-[#b48cf0]">
    ROSELLE
  </p>

  <h2 className="mt-5 text-xl font-semibold text-[#655b75]">
    Handcrafted Beads Jewellery
  </h2>

  <p className="mt-3 text-sm leading-7 text-[#8d7e9f]">
    {authScreen === "login"
     ? "Sign in to continue your shopping experience."
      : authScreen === "signup"
      ? "Create your account to discover timeless handcrafted jewellery."
      : "Enter your email to receive a password reset link."}
  </p>

</div>

      {/* Toggle */}

      <div className="mt-10 mb-10">

        <div className="flex rounded-2xl bg-[#f7f1ff] p-1">

          <button
            onClick={() => setAuthScreen("login")}
                    className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${authScreen === "login"
          ? "Sign in to continue your shopping experience."
          : authScreen === "signup"
          ? "Create your account to discover timeless handcrafted jewellery."
          : "Enter your email to receive a password reset link."}`}
          >
            Login
          </button>

          <button
            onClick={() => setAuthScreen("signup")}
            className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${
             authScreen === "signup"
                ? "bg-white text-violet-700 shadow-md"
                : "text-[#8d7e9f] hover:text-violet-600"
            }`}
          >
            Sign Up
          </button>

        </div>

      </div>

      {/* Render Forms */}

          {authScreen === "login" && (
        <LoginForm
          openForgotPassword={() => setAuthScreen("forgot")}
        />
      )}

      {authScreen === "signup" && (
        <SignupForm />
      )}

      {authScreen === "forgot" && (
        <ForgotPasswordForm />
      )}
    </div>
  );
}