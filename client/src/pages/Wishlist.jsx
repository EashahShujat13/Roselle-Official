
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bgImage from "../assets/images/banners/ringImg.jpg";

export default function Wishlist() {
  const navigate = useNavigate();

  // STATIC DATA
  // Later this will come from Redux / API
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Luna Pearl Necklace",
      category: "Necklaces",
      price: "Rs. 4,500",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 2,
      name: "Élan Gold Earrings",
      category: "Earrings",
      price: "Rs. 3,200",
      image:
        "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 3,
      name: "Amour Bracelet",
      category: "Bracelets",
      price: "Rs. 3,800",
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 4,
      name: "Celeste Ring",
      category: "Rings",
      price: "Rs. 2,900",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  return (
    <main className="min-h-screen bg-[#FAF7FD]">

      {/* HERO / WISHLIST BANNER */}

      <section
        className="
          relative
          overflow-hidden
          bg-cover
          bg-center
          py-24
          md:py-32
        "
        style={{
          backgroundImage:
            `url('${bgImage}')`,
        }}
      >
        {/* Overlay */}

        <div className="absolute inset-0 bg-[#3F3155]/70" />

        {/* Glow */}

        <div
          className="
            absolute
            -top-32
            -right-32
            w-96
            h-96
            rounded-full
            bg-[#DCC9F4]/20
            blur-3xl
          "
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-6"
        >
          <div className="flex items-center gap-3">
            <Heart
              size={15}
              className="text-[#D7B7FF]"
              fill="currentColor"
            />

            <p className="uppercase tracking-[6px] text-[10px] text-[#D7B7FF]">
              Roselle
            </p>
          </div>

          <h1
            className="
              mt-5
              font-['Cormorant_Garamond']
              text-6xl
              md:text-8xl
              leading-none
              text-white
            "
          >
            My Wishlist
          </h1>

          <div className="mt-7 w-14 h-px bg-[#D7B7FF]" />

          <p className="mt-5 text-sm text-white/80 max-w-md">
            A collection of the pieces you've fallen in love with.
          </p>
        </motion.div>
      </section>

      {/* WISHLIST CONTENT */}

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            flex
            flex-col
            md:flex-row
            md:items-end
            justify-between
            gap-5
            mb-10
          "
        >
          <div>
            <p className="uppercase tracking-[5px] text-[10px] text-[#9B72D0]">
              Your Collection
            </p>

            <h2
              className="
                mt-3
                font-['Cormorant_Garamond']
                text-4xl
                md:text-5xl
                text-[#514064]
              "
            >
              Saved Pieces
            </h2>
          </div>

          <p className="text-xs text-[#81768D]">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "piece" : "pieces"} saved
          </p>
        </motion.div>

        {/* EMPTY STATE */}

        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              border
              border-[#E5DCEA]
              bg-white
              py-20
              px-6
              text-center
            "
          >
            <div
              className="
                mx-auto
                w-20
                h-20
                rounded-full
                bg-[#F1E8FA]
                flex
                items-center
                justify-center
              "
            >
              <Heart
                size={30}
                strokeWidth={1.3}
                className="text-[#9B72D0]"
              />
            </div>

            <p className="mt-7 uppercase tracking-[4px] text-[9px] text-[#9B72D0]">
              Your wishlist is waiting
            </p>

            <h2
              className="
                mt-3
                font-['Cormorant_Garamond']
                text-4xl
                text-[#514064]
              "
            >
              Nothing saved yet
            </h2>

            <p className="mt-3 text-sm text-[#81768D]">
              Discover something beautiful and save it for later.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                bg-[#5E4B7A]
                text-white
                px-8
                py-4
                uppercase
                tracking-[3px]
                text-[10px]
                hover:bg-[#806298]
                transition
              "
            >
              Explore Collection
              <ArrowRight size={15} />
            </button>
          </motion.div>
        ) : (

          /* PRODUCT GRID */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {wishlistItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="
                  group
                  bg-white
                  border
                  border-[#E5DCEA]
                  overflow-hidden
                "
              >

                {/* IMAGE */}

                <div className="relative aspect-[4/5] overflow-hidden bg-[#F3ECFA]">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition
                      duration-700
                      group-hover:scale-105
                    "
                  />

                  {/* IMAGE OVERLAY */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-[#3F3155]/0
                      group-hover:bg-[#3F3155]/10
                      transition
                      duration-500
                    "
                  />

                  {/* REMOVE BUTTON */}

                  <button
                    onClick={() =>
                      removeFromWishlist(item.id)
                    }
                    aria-label={`Remove ${item.name} from wishlist`}
                    className="
                      absolute
                      top-4
                      right-4
                      w-10
                      h-10
                      bg-white/95
                      flex
                      items-center
                      justify-center
                      text-[#9B72D0]
                      opacity-0
                      translate-y-2
                      group-hover:opacity-100
                      group-hover:translate-y-0
                      transition
                      duration-300
                      hover:bg-[#5E4B7A]
                      hover:text-white
                    "
                  >
                    <Trash2 size={15} strokeWidth={1.5} />
                  </button>

                  {/* SAVED BADGE */}

                  <div
                    className="
                      absolute
                      left-4
                      top-4
                      bg-white/90
                      px-3
                      py-2
                    "
                  >
                    <div className="flex items-center gap-2">
                      <Heart
                        size={11}
                        fill="currentColor"
                        className="text-[#9B72D0]"
                      />

                      <span className="text-[8px] uppercase tracking-[2px] text-[#665875]">
                        Saved
                      </span>
                    </div>
                  </div>
                </div>

                {/* PRODUCT INFO */}

                <div className="p-5">

                  <p className="text-[8px] uppercase tracking-[3px] text-[#9B72D0]">
                    {item.category}
                  </p>

                  <h3
                    className="
                      mt-2
                      font-['Cormorant_Garamond']
                      text-2xl
                      text-[#514064]
                    "
                  >
                    {item.name}
                  </h3>

                  <div className="mt-4 flex items-center justify-between">

                    <p className="text-sm text-[#665875]">
                      {item.price}
                    </p>

                    <button
                      onClick={() => navigate("/shop")}
                      className="
                        flex
                        items-center
                        gap-2
                        text-[9px]
                        uppercase
                        tracking-[2px]
                        text-[#9B72D0]
                        hover:text-[#514064]
                        transition
                      "
                    >
                      View
                      <ArrowRight size={13} />
                    </button>

                  </div>

                  {/* ADD TO BAG */}

                  <button
                    onClick={() => navigate("/shop")}
                    className="
                      mt-5
                      w-full
                      h-12
                      border
                      border-[#DCCFE8]
                      flex
                      items-center
                      justify-center
                      gap-3
                      text-[#665875]
                      uppercase
                      tracking-[2px]
                      text-[9px]
                      hover:bg-[#5E4B7A]
                      hover:text-white
                      hover:border-[#5E4B7A]
                      transition
                    "
                  >
                    <ShoppingBag size={14} />
                    View Piece
                  </button>

                </div>
              </motion.article>
            ))}

          </div>
        )}

      </section>

      {/* BOTTOM BRAND STRIP */}

      <section className="border-y border-[#E7DFF0] bg-white">

        <div className="max-w-7xl mx-auto px-6 py-14 text-center">

          <div className="flex justify-center">
            <Sparkles
              size={18}
              strokeWidth={1.3}
              className="text-[#B48CF0]"
            />
          </div>

          <p
            className="
              mt-4
              font-['Cormorant_Garamond']
              text-3xl
              md:text-4xl
              text-[#514064]
            "
          >
            Keep the pieces that speak to you.
          </p>

          <p className="mt-3 text-xs text-[#81768D]">
            Roselle — thoughtfully made, beautifully yours.
          </p>

        </div>

      </section>

    </main>
  );
}

