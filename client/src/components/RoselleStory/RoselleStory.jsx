import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function RoselleStory() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-28 md:py-36">

      <div className="max-w-7xl mx-auto px-6">

        <div className="
          grid
          lg:grid-cols-2
          gap-12
          lg:gap-20
          items-center
        ">

          {/* Image */}

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
            }}
            className="relative"
          >

            <div className="
              absolute
              -top-5
              -left-5
              w-full
              h-full
              border
              border-[#DCC9F4]
            " />

            <motion.img
              src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1400&q=90"
              alt="Roselle jewellery"
              whileHover={{
                scale: 1.025,
              }}
              transition={{
                duration: 0.8,
              }}
              className="
                relative
                w-full
                aspect-[4/5]
                object-cover
              "
            />

            <div className="
              absolute
              bottom-6
              left-6
              bg-white/95
              px-5
              py-4
            ">
              <p className="
                text-[9px]
                uppercase
                tracking-[4px]
                text-[#9B72D0]
              ">
                Est. 2026
              </p>

              <p className="
                mt-1
                font-['Cormorant_Garamond']
                text-xl
                text-[#514064]
              ">
                Made with meaning
              </p>
            </div>

          </motion.div>


          {/* Content */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
            }}
            className="lg:pl-8"
          >

            <p className="
              uppercase
              tracking-[6px]
              text-[10px]
              text-[#9B72D0]
              mb-6
            ">
              The Roselle Story
            </p>

            <h2 className="
              font-['Cormorant_Garamond']
              text-5xl
              md:text-7xl
              leading-[0.9]
              text-[#514064]
            ">
              More than
              <br />
              <span className="italic">
                jewellery.
              </span>
            </h2>

            <div className="
              w-14
              h-px
              bg-[#B48CF0]
              my-8
            " />

            <p className="
              text-[#655b75]
              leading-8
              text-sm
              md:text-base
              max-w-lg
            ">
              Roselle was created for those who believe jewellery
              should feel personal. Every piece brings together
              colour, texture and thoughtful craftsmanship.
            </p>

            <p className="
              mt-5
              text-[#8A8098]
              leading-7
              text-sm
              max-w-lg
            ">
              From delicate everyday pieces to expressive handmade
              designs, our collections are made to accompany the
              moments that become part of your story.
            </p>

            <button
              onClick={() => navigate("/collections")}
              className="
                group
                mt-9
                flex
                items-center
                gap-3
                text-[#514064]
                uppercase
                tracking-[3px]
                text-[10px]
                border-b
                border-[#B48CF0]
                pb-2
                hover:text-[#9B72D0]
                transition
              "
            >
              Discover Our Story

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

        </div>

      </div>

    </section>
  );
}