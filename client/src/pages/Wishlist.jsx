import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import bgImage from "../assets/images/banners/ringImg.jpg";

import {
  getMyWishlist,
  removeFromWishlist,
} from "../config/apis/wishlistApi";

import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [addingId, setAddingId] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // =========================================================
  // FETCH WISHLIST
  // =========================================================

  const fetchWishlist = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getMyWishlist(token);

      setWishlistItems(response?.wishlist?.products || []);
    } catch (error) {
      console.error("Wishlist Fetch Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/auth");
        return;
      }

      setError(
        error.response?.data?.message ||
          "Unable to load your wishlist."
      );
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  // =========================================================
  // LOAD WISHLIST
  // =========================================================

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // =========================================================
  // REMOVE FROM WISHLIST
  // =========================================================

  const handleRemove = async (productId) => {
    if (!token || removingId) return;

    try {
      setRemovingId(productId);
      setError("");

      await removeFromWishlist(productId, token);

      setWishlistItems((currentItems) =>
        currentItems.filter(
          (item) => item?._id !== productId
        )
      );
    } catch (error) {
      console.error("Remove Wishlist Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/auth");
        return;
      }

      setError(
        error.response?.data?.message ||
          "Unable to remove this piece."
      );
    } finally {
      setRemovingId(null);
    }
  };

  // =========================================================
  // ADD TO CART
  // =========================================================

  const handleAddToCart = (product) => {
    if (!product?._id || addingId) return;

    try {
      setAddingId(product._id);

      addToCart(product);
    } catch (error) {
      console.error("Add To Cart Error:", error);
    } finally {
      setTimeout(() => {
        setAddingId(null);
      }, 700);
    }
  };

  // =========================================================
  // LOGIN PROTECTION
  // =========================================================

  if (!token) {
    return (
      <main className="min-h-screen bg-[#FAF7FD] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md text-center"
        >
          <Heart
            size={42}
            strokeWidth={1}
            className="mx-auto text-[#9B72D0]"
          />

          <p className="mt-7 uppercase tracking-[5px] text-[10px] text-[#9B72D0]">
            Roselle
          </p>

          <h1
            className="
              mt-3
              font-['Cormorant_Garamond']
              text-5xl
              text-[#514064]
            "
          >
            Your Wishlist
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#81768D]">
            Please login to view the pieces you have saved.
          </p>

          <button
            type="button"
            onClick={() => navigate("/auth")}
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              bg-[#5E4B7A]
              px-8
              py-4
              text-white
              uppercase
              tracking-[3px]
              text-[10px]
              hover:bg-[#806298]
              transition
            "
          >
            Login
            <ArrowRight size={15} />
          </button>
        </motion.div>
      </main>
    );
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF7FD] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2
            size={28}
            strokeWidth={1.5}
            className="animate-spin text-[#9B72D0]"
          />

          <p className="text-[10px] uppercase tracking-[4px] text-[#81768D]">
            Loading your wishlist
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7FD]">

      {/* =====================================================
          HERO
      ===================================================== */}

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
          backgroundImage: `url('${bgImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-[#3F3155]/70" />

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

      {/* =====================================================
          CONTENT
      ===================================================== */}

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

          <div className="flex items-center gap-4">
            <p className="text-xs text-[#81768D]">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "piece" : "pieces"} saved
            </p>

            <button
              type="button"
              onClick={fetchWishlist}
              disabled={loading}
              aria-label="Refresh wishlist"
              className="
                w-9
                h-9
                border
                border-[#DCCFE8]
                flex
                items-center
                justify-center
                text-[#806298]
                hover:bg-[#F1E8FA]
                transition
                disabled:opacity-50
              "
            >
              <RefreshCw size={13} />
            </button>
          </div>
        </motion.div>

        {/* ERROR */}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              mb-8
              border
              border-red-200
              bg-red-50
              px-5
              py-4
              text-sm
              text-red-500
            "
          >
            {error}
          </motion.div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
              type="button"
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
          /* =================================================
             PRODUCT GRID
          ================================================= */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <AnimatePresence mode="popLayout">
              {wishlistItems.map((item, index) => {
                const productId = item?._id;

                const image =
                  item?.images?.[0] ||
                  "https://placehold.co/600x750/F3ECFA/5E4B7A?text=Roselle";

                const price = Number(item?.price || 0);

                const productName =
                  item?.productName ||
                  item?.name ||
                  "Roselle Piece";

                const category =
                  item?.category || "Roselle";

                return (
                  <motion.article
                    key={productId}
                    layout
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.94,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
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

                    <div
                      className="
                        relative
                        aspect-[4/5]
                        overflow-hidden
                        bg-[#F3ECFA]
                      "
                    >
                      <img
                        src={image}
                        alt={productName}
                        className="
                          w-full
                          h-full
                          object-cover
                          transition
                          duration-700
                          group-hover:scale-105
                        "
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/600x750/F3ECFA/5E4B7A?text=Roselle";
                        }}
                      />

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

                      {/* REMOVE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(productId)
                        }
                        disabled={removingId === productId}
                        aria-label={`Remove ${productName} from wishlist`}
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
                          disabled:opacity-60
                        "
                      >
                        {removingId === productId ? (
                          <Loader2
                            size={15}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2
                            size={15}
                            strokeWidth={1.5}
                          />
                        )}
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

                          <span
                            className="
                              text-[8px]
                              uppercase
                              tracking-[2px]
                              text-[#665875]
                            "
                          >
                            Saved
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* PRODUCT INFO */}

                    <div className="p-5">

                      <p
                        className="
                          text-[8px]
                          uppercase
                          tracking-[3px]
                          text-[#9B72D0]
                        "
                      >
                        {category}
                      </p>

                      <h3
                        className="
                          mt-2
                          font-['Cormorant_Garamond']
                          text-2xl
                          text-[#514064]
                          line-clamp-1
                        "
                      >
                        {productName}
                      </h3>

                      <div
                        className="
                          mt-4
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >
                        <p className="text-sm text-[#665875]">
                          Rs. {price.toLocaleString()}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/product/${productId}`)
                          }
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
                        type="button"
                        onClick={() =>
                          handleAddToCart(item)
                        }
                        disabled={addingId === productId}
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
                          disabled:opacity-60
                          disabled:cursor-not-allowed
                        "
                      >
                        {addingId === productId ? (
                          <>
                            <Loader2
                              size={14}
                              className="animate-spin"
                            />
                            Adding...
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={14} />
                            Add to Bag
                          </>
                        )}
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>

          </div>
        )}
      </section>

      {/* =====================================================
          BOTTOM BRAND STRIP
      ===================================================== */}

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