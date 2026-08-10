import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/images/banners/bouquetRing.jpg";
export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[90vh] min-h-[650px] overflow-hidden">

      {/* Background Image */}

      <motion.img
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
        src={bgImage}
        alt="Roselle jewellery collection"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* Luxury Overlay */}

      <div className="
        absolute
        inset-0
        bg-gradient-to-r
        from-[#3D3150]/75
        via-[#514064]/35
        to-transparent
      " />

      <div className="
        absolute
        inset-0
        bg-gradient-to-t
        from-[#3D3150]/55
        via-transparent
        to-transparent
      " />


      {/* Content */}

      <div className="
        relative
        z-10
        h-full
        max-w-7xl
        mx-auto
        px-6
        flex
        items-center
      ">

        <motion.div
          initial={{
            opacity: 0,
            y: 45,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: "easeOut",
          }}
          className="max-w-2xl text-white"
        >

          <motion.p
            initial={{ opacity: 0, letterSpacing: "1px" }}
            animate={{
              opacity: 1,
              letterSpacing: "6px",
            }}
            transition={{
              duration: 1,
              delay: 0.7,
            }}
            className="
              uppercase
              text-[10px]
              mb-6
              text-[#E4D2F7]
            "
          >
            Fine Jewellery · Est. 2026
          </motion.p>


          <h1 className="
            font-['Cormorant_Garamond']
            text-6xl
            sm:text-7xl
            md:text-8xl
            leading-[0.85]
            font-medium
          ">
            Jewellery
            <br />
            <span className="italic">
              with meaning.
            </span>
          </h1>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1,
            }}
            className="
              mt-8
              max-w-lg
              text-sm
              md:text-base
              leading-7
              text-white/80
            "
          >
            Handcrafted pieces created to celebrate
            individuality, colour and the moments that
            become part of your story.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.2,
            }}
            className="
              mt-9
              flex
              flex-wrap
              gap-5
            "
          >

            <button
              onClick={() => navigate("/shop")}
              className="
                group
                flex
                items-center
                gap-3
                bg-white
                text-[#514064]
                px-7
                py-4
                uppercase
                tracking-[3px]
                text-[10px]
                hover:bg-[#B48CF0]
                hover:text-white
                transition-all
                duration-500
              "
            >
              Explore Collection

              <ArrowUpRight
                size={16}
                className="
                  group-hover:rotate-45
                  transition-transform
                  duration-500
                "
              />
            </button>


            <button
              onClick={() => navigate("/collections")}
              className="
                text-white
                border-b
                border-white/60
                pb-2
                uppercase
                tracking-[3px]
                text-[10px]
                hover:border-white
                transition
              "
            >
              Discover Roselle
            </button>

          </motion.div>

        </motion.div>

      </div>


      {/* Scroll Indicator */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.8,
          duration: 1,
        }}
        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          text-white
          flex
          flex-col
          items-center
          gap-3
        "
      >

        <span className="
          text-[8px]
          uppercase
          tracking-[4px]
        ">
          Scroll
        </span>

        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <ArrowDown size={15} />
        </motion.div>

      </motion.div>

    </section>
  );
}