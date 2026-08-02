import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPassword() {

  return (

    <main
      className="
      min-h-screen
      flex
      items-center
      justify-center
      px-5
      py-10
      bg-[#f7f1ff]
      relative
      overflow-hidden
      "
    >

      <div
        className="
        absolute
        top-0
        left-1/2
        -translate-x-1/2
        h-72
        w-72
        rounded-full
        bg-[#d7b7ff]/30
        blur-3xl
        "
      />

      <div
        className="
        relative
        w-full
        max-w-xl
        overflow-hidden
        rounded-[32px]
        border
        border-[#d7b7ff]
        bg-white/95
        backdrop-blur-sm
        shadow-[0_20px_60px_rgba(180,140,240,0.18)]
        px-12
        py-12
        "
      >

        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500"></div>

        <div className="text-center">

          <p className="text-xs tracking-[0.6em] uppercase font-semibold text-[#b48cf0]">
            ROSELLE
          </p>

          <h2 className="mt-5 text-xl font-semibold text-[#655b75]">
            Reset Password
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#8d7e9f]">
            Create your new password to continue.
          </p>

        </div>

        <div className="mt-10">

          <ResetPasswordForm />

        </div>

      </div>

    </main>

  );

}