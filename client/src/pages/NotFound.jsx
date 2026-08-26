import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#F7F1FC] flex items-center justify-center px-6">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-xl"
      >
        <p className="uppercase tracking-[7px] text-[10px] text-[#9B72D0]">
          Roselle Jewellery
        </p>

        <h1 className="mt-6 font-['Cormorant_Garamond'] text-8xl md:text-9xl text-[#514064]">
          404
        </h1>

        <h2 className="mt-4 font-['Cormorant_Garamond'] text-4xl text-[#514064]">
          This page has wandered away.
        </h2>

        <p className="mt-5 text-sm leading-7 text-[#81768D] max-w-md mx-auto">
          The page you're looking for doesn't exist or may have moved.
          Let's take you back to something beautiful.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-3 bg-[#5E4B7A] text-white px-7 py-4 uppercase tracking-[2px] text-[10px] hover:bg-[#806298] transition"
          >
            <Home size={15} />
            Back Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-3 border border-[#CDB9E2] text-[#5E4B7A] px-7 py-4 uppercase tracking-[2px] text-[10px] hover:bg-white transition"
          >
            <ArrowLeft size={15} />
            Go Back
          </button>
        </div>
      </motion.section>
    </main>
  );
}