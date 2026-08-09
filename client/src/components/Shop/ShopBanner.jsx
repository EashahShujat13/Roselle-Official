import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function ShopBanner() {
  const scrollToProducts = () => {
    window.scrollTo({
      top: 550,
      behavior: "smooth",
    });
  };

  return (
    <section className="
      relative
      min-h-[65vh]
      flex
      items-center
      justify-center
      overflow-hidden
      bg-[#5A476E]
    ">

      <img
        src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=2200&q=90"
        alt="Roselle jewellery collection"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          scale-105
        "
      />

      <div className="
        absolute
        inset-0
        bg-[#3E3150]/55
      " />

      <div className="
        absolute
        inset-0
        bg-gradient-to-b
        from-[#3E3150]/30
        via-transparent
        to-[#3E3150]/70
      " />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="
          relative
          z-10
          text-center
          text-white
          px-6
        "
      >

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0px" }}
          animate={{
            opacity: 1,
            letterSpacing: "7px",
          }}
          transition={{
            duration: 1.1,
            delay: 0.2,
          }}
          className="
            uppercase
            text-[10px]
            text-[#E5D2FA]
          "
        >
          Roselle Fine Jewellery
        </motion.p>

        <h1 className="
          mt-5
          font-['Cormorant_Garamond']
          text-6xl
          md:text-8xl
          leading-[0.85]
          font-medium
        ">
          The Art of
          <br />
          <span className="italic">
            Adornment
          </span>
        </h1>

        <p className="
          max-w-lg
          mx-auto
          mt-7
          text-sm
          md:text-base
          text-white/80
          leading-7
        ">
          Discover handcrafted jewellery created
          for moments worth remembering.
        </p>

        <button
          onClick={scrollToProducts}
          className="
            mt-9
            inline-flex
            items-center
            gap-3
            border-b
            border-white/70
            pb-2
            uppercase
            tracking-[3px]
            text-[10px]
            hover:border-[#D7B7FF]
            hover:text-[#D7B7FF]
            transition
          "
        >
          Explore Collection

          <ArrowDown
            size={15}
          />

        </button>

      </motion.div>

    </section>
  );
}