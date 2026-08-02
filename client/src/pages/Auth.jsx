import AuthCard from "../components/AuthCard";

export default function Auth() {
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
      {/* Soft Background Glow */}

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

      <AuthCard />
    </main>
  );
}