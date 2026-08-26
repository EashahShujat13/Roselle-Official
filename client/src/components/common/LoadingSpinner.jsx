import { motion } from "framer-motion";

export default function LoadingSpinner({
  fullScreen = false,
  text = "Loading",
}) {
  return (
    <div
      className={`
        relative
        flex
        flex-col
        items-center
        justify-center
        ${
          fullScreen
            ? "min-h-screen bg-[#F7F1FC]"
            : "py-24"
        }
      `}
    >
      {/* Soft Luxury Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          w-20
          h-20
          rounded-full
          bg-[#D7B7FF]/30
          blur-2xl
        "
      />

      {/* Spinner */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            w-11
            h-11
            rounded-full
            border
            border-[#DCCFE8]
            border-t-[#806298]
            border-r-[#B48CF0]
          "
        />

        {/* Center Dot */}
        <motion.div
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            inset-0
            m-auto
            w-1.5
            h-1.5
            rounded-full
            bg-[#806298]
          "
        />
      </div>

      {/* Loading Text */}
      <motion.p
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          mt-6
          text-[9px]
          uppercase
          tracking-[5px]
          text-[#806298]
          font-medium
        "
      >
        {text}
      </motion.p>

      {/* Decorative Line */}
      <div className="mt-3 flex items-center gap-2">
        <span className="w-5 h-px bg-[#D7B7FF]" />

        <span className="w-1 h-1 rounded-full bg-[#B48CF0]" />

        <span className="w-5 h-px bg-[#D7B7FF]" />
      </div>
    </div>
  );
}