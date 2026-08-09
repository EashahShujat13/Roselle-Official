import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function BeadsEditorial() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#514064] py-28 md:py-36 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        <div className="
          grid
          lg:grid-cols-[0.9fr_1.1fr]
          gap-10
          items-center
        ">

          {/* Text */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
            }}
            className="text-white"
          >

            <p className="
              uppercase
              tracking-[6px]
              text-[10px]
              text-[#DCC9F4]
              mb-6
            ">
              The Handmade Edit
            </p>

            <h2 className="
              font-['Cormorant_Garamond']
              text-5xl
              md:text-7xl
              leading-[0.9]
            ">
              The beauty of
              <br />
              <span className="italic">
                handmade.
              </span>
            </h2>

            <p className="
              mt-8
              max-w-md
              text-sm
              leading-7
              text-white/65
            ">
              Colourful beads, delicate textures and unexpected
              combinations come together in pieces made by hand
              and designed to feel entirely your own.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="
                group
                mt-9
                flex
                items-center
                gap-3
                uppercase
                tracking-[3px]
                text-[10px]
                border-b
                border-[#DCC9F4]
                pb-2
                text-white
              "
            >
              Explore Handmade Jewellery

              <ArrowUpRight
                size={16}
                className="
                  group-hover:rotate-45
                  transition-transform
                  duration-500
                "
              />
            </button>

          </motion.div>


          {/* Image */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
            }}
            className="relative"
          >

            <motion.img
              src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1600&q=90"
              alt="Handmade beads jewellery"
              whileHover={{
                scale: 1.03,
              }}
              transition={{
                duration: 0.8,
              }}
              className="
                w-full
                aspect-[16/10]
                object-cover
              "
            />

            <div className="
              absolute
              inset-5
              border
              border-white/25
              pointer-events-none
            " />

          </motion.div>

        </div>

      </div>

    </section>
  );
}