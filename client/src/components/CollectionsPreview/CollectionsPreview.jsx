
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import necklace from "../../assets/images/categories/cat2.jpeg";
import ring from "../../assets/images/categories/cat1.jpeg";
import bracelet from "../../assets/images/products/p3.jpeg";

const reveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function CollectionsPreview() {
  const navigate = useNavigate();

  const collections = [
    {
      title: "Necklaces",
      image: necklace,
      text: "Delicate pieces designed to be remembered.",
    },
    {
      title: "Bracelets",
      image: bracelet,
      text: "Handcrafted details for everyday elegance.",
    },
    {
      title: "Rings",
      image: ring,
      text: "Small statements with timeless character.",
    },
  ];

  // ==================================================
  // OPEN CATEGORY
  // Same behavior as CategoryNav
  // ==================================================

  const openCategory = (categoryName) => {
    navigate(
      `/shop?category=${encodeURIComponent(categoryName)}`
    );
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6">

        {/* ==================================================
            HEADING
        ================================================== */}

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="max-w-3xl mb-20"
        >
          <p
            className="
              uppercase
              tracking-[6px]
              text-[10px]
              text-[#9B72D0]
              mb-5
            "
          >
            The Roselle Collection
          </p>

          <h2
            className="
              font-['Cormorant_Garamond']
              text-5xl
              md:text-7xl
              leading-[0.9]
              text-[#514064]
            "
          >
            Pieces made to
            <br />
            <span className="italic">
              become yours.
            </span>
          </h2>

          <p
            className="
              mt-7
              max-w-xl
              text-[#655b75]
              leading-7
              text-sm
              md:text-base
            "
          >
            Explore jewellery created with colour, texture and
            individuality — designed to become part of your story.
          </p>
        </motion.div>

        {/* ==================================================
            COLLECTIONS
        ================================================== */}

        <div
          className="
            grid
            md:grid-cols-3
            gap-6
            md:gap-8
          "
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
              }}
              onClick={() =>
                openCategory(collection.title)
              }
              className={`
                group
                cursor-pointer
                ${index === 1 ? "md:mt-16" : ""}
              `}
            >

              {/* ==================================================
                  IMAGE
              ================================================== */}

              <div
                className="
                  relative
                  overflow-hidden
                  bg-[#E5D8F2]
                  aspect-[4/5]
                "
              >
                <motion.img
                  src={collection.image}
                  alt={collection.title}
                  whileHover={{
                    scale: 1.06,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

                {/* IMAGE OVERLAY */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#514064]/65
                    via-transparent
                    to-transparent
                  "
                />

                {/* NUMBER */}

                <span
                  className="
                    absolute
                    top-5
                    left-5
                    text-white
                    text-[10px]
                    tracking-[3px]
                  "
                >
                  0{index + 1}
                </span>

                {/* ARROW */}

                <motion.div
                  whileHover={{
                    rotate: 45,
                    scale: 1.08,
                  }}
                  className="
                    absolute
                    bottom-6
                    right-6
                    w-11
                    h-11
                    rounded-full
                    bg-white
                    text-[#514064]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ArrowUpRight size={18} />
                </motion.div>
              </div>

              {/* ==================================================
                  TEXT
              ================================================== */}

              <div className="pt-6">

                <h3
                  className="
                    font-['Cormorant_Garamond']
                    text-3xl
                    text-[#514064]
                  "
                >
                  {collection.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-[#756982]
                    leading-6
                  "
                >
                  {collection.text}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

        {/* ==================================================
            VIEW ALL
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mt-16
            flex
            justify-center
          "
        >
          <button
            onClick={() => navigate("/shop")}
            className="
              group
              flex
              items-center
              gap-3
              border-b
              border-[#9B72D0]
              pb-2
              text-[#514064]
              uppercase
              tracking-[3px]
              text-[10px]
              hover:text-[#9B72D0]
              transition
            "
          >
            View All Collections

            <ArrowUpRight
              size={15}
              className="
                group-hover:rotate-45
                transition-transform
                duration-500
              "
            />
          </button>
        </motion.div>

      </div>
    </section>
  );
}

