import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Loader2,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getMyWishlist,
  removeFromWishlist,
} from "../config/apis/wishlistApi";

import LoadingSpinner from "../components/common/LoadingSpinner";
import { useToast } from "../context/ToastContext";

export default function Wishlist() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  // =========================
  // FETCH WISHLIST
  // =========================

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        navigate("/auth");
        return;
      }

      try {
        setLoading(true);

        const response = await getMyWishlist(token);

        const products =
          response?.wishlist?.products || [];

        setWishlist(products);
      } catch (error) {
        console.log("Wishlist Fetch Error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/auth");
          return;
        }

        showToast(
          error.response?.data?.message ||
            "Unable to load your wishlist",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [navigate, showToast]);

  // =========================
  // REMOVE FROM WISHLIST
  // =========================

  const handleRemove = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token || !productId || removingId) {
      return;
    }

    try {
      setRemovingId(productId);

      await removeFromWishlist(productId, token);

      setWishlist((prev) =>
        prev.filter(
          (item) => item?._id !== productId
        )
      );

      showToast(
        "Piece removed from your wishlist",
        "success"
      );
    } catch (error) {
      console.log(
        "Wishlist Remove Error:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/auth");
        return;
      }

      showToast(
        error.response?.data?.message ||
          "Unable to remove this piece",
        "error"
      );
    } finally {
      setRemovingId(null);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FCFAFF]">
        <LoadingSpinner
          fullScreen
          text="Curating your wishlist"
        />
      </main>
    );
  }

  // =========================
  // EMPTY WISHLIST
  // =========================

  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen bg-[#FCFAFF]">
        <section className="min-h-[78vh] flex items-center justify-center px-6">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="max-w-xl text-center"
          >
            {/* ICON */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
              className="
                mx-auto
                w-20
                h-20
                rounded-full
                bg-[#F1EAF8]
                flex
                items-center
                justify-center
                text-[#806298]
              "
            >
              <Heart
                size={27}
                strokeWidth={1.3}
              />
            </motion.div>

            {/* LABEL */}

            <p
              className="
                mt-8
                text-[9px]
                uppercase
                tracking-[5px]
                text-[#9B72D0]
              "
            >
              Roselle Collection
            </p>

            {/* TITLE */}

            <h1
              className="
                mt-4
                font-['Cormorant_Garamond']
                text-5xl
                md:text-6xl
                text-[#514064]
                leading-none
              "
            >
              Your Wishlist
            </h1>

            <div
              className="
                mx-auto
                mt-6
                w-12
                h-px
                bg-[#B48CF0]
              "
            />

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                text-sm
                leading-7
                text-[#81768D]
              "
            >
              Your collection of saved pieces is
              waiting to be created. Discover
              something beautiful and keep it close.
            </p>

            {/* BUTTON */}

            <motion.button
              type="button"
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => navigate("/shop")}
              className="
                mt-9
                inline-flex
                items-center
                justify-center
                gap-3
                h-13
                px-8
                bg-[#5E4B7A]
                text-white
                text-[9px]
                uppercase
                tracking-[3px]
                hover:bg-[#806298]
                transition
              "
            >
              Discover the Collection
              <ArrowRight size={15} />
            </motion.button>
          </motion.div>
        </section>
      </main>
    );
  }

  // =========================
  // WISHLIST PAGE
  // =========================

  return (
    <main className="min-h-screen bg-[#FCFAFF]">
      {/* =========================
          HERO
      ========================= */}

      <section
        className="
          border-b
          border-[#E7DFF0]
          bg-white
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            pt-14
            pb-12
            md:pt-20
            md:pb-16
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="flex items-center gap-3">
              <Heart
                size={15}
                className="text-[#9B72D0]"
                fill="currentColor"
              />

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[4px]
                  text-[#9B72D0]
                "
              >
                Your saved pieces
              </p>
            </div>

            <div
              className="
                mt-5
                flex
                flex-col
                md:flex-row
                md:items-end
                md:justify-between
                gap-6
              "
            >
              <div>
                <h1
                  className="
                    font-['Cormorant_Garamond']
                    text-5xl
                    md:text-6xl
                    lg:text-7xl
                    leading-[0.9]
                    text-[#514064]
                  "
                >
                  Wishlist
                </h1>

                <p
                  className="
                    mt-5
                    max-w-lg
                    text-sm
                    leading-7
                    text-[#81768D]
                  "
                >
                  A curated selection of the pieces
                  you've chosen to keep close.
                </p>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  text-[9px]
                  uppercase
                  tracking-[2px]
                  text-[#81768D]
                "
              >
                <span
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-[#9B72D0]
                  "
                />

                {wishlist.length}{" "}
                {wishlist.length === 1
                  ? "Piece"
                  : "Pieces"}{" "}
                Saved
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================
          PRODUCTS
      ========================= */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          py-14
          md:py-20
        "
      >
        <motion.div
          layout
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-x-6
            gap-y-14
          "
        >
          <AnimatePresence mode="popLayout">
            {wishlist.map((product, index) => {
              const image =
                product?.images?.[0] ||
                "https://placehold.co/700x850/F0E9F7/5E4B7A?text=Roselle";

              const isRemoving =
                removingId === product?._id;

              return (
                <motion.article
                  layout
                  key={product?._id}
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
                    scale: 0.95,
                    y: -15,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(
                      index * 0.06,
                      0.3
                    ),
                  }}
                  className="group"
                >
                  {/* IMAGE */}

                  <div
                    className="
                      relative
                      aspect-[4/5]
                      overflow-hidden
                      bg-[#EDE5F5]
                      cursor-pointer
                    "
                    onClick={() =>
                      navigate(
                        `/product/${product?._id}`
                      )
                    }
                  >
                    <motion.img
                      src={image}
                      alt={
                        product?.productName ||
                        "Roselle jewellery"
                      }
                      whileHover={{
                        scale: 1.06,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                    {/* OVERLAY */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#3E3150]/45
                        via-transparent
                        to-transparent
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-500
                      "
                    />

                    {/* REMOVE */}

                    <motion.button
                      type="button"
                      whileTap={{
                        scale: 0.9,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(product?._id);
                      }}
                      disabled={isRemoving}
                      aria-label="Remove from wishlist"
                      className="
                        absolute
                        top-4
                        right-4
                        w-10
                        h-10
                        rounded-full
                        bg-white/95
                        flex
                        items-center
                        justify-center
                        text-[#5E4B7A]
                        hover:text-[#A45D76]
                        disabled:opacity-60
                        transition
                      "
                    >
                      {isRemoving ? (
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </motion.button>

                    {/* VIEW */}

                    <div
                      className="
                        absolute
                        bottom-5
                        left-1/2
                        -translate-x-1/2
                        translate-y-3
                        opacity-0
                        group-hover:translate-y-0
                        group-hover:opacity-100
                        transition-all
                        duration-500
                        bg-white
                        px-5
                        py-3
                        flex
                        items-center
                        gap-2
                        text-[9px]
                        uppercase
                        tracking-[2px]
                        text-[#514064]
                        whitespace-nowrap
                      "
                    >
                      View Piece
                      <ArrowRight size={13} />
                    </div>
                  </div>

                  {/* DETAILS */}

                  <div className="pt-5">
                    <div
                      className="
                        flex
                        justify-between
                        items-start
                        gap-4
                      "
                    >
                      <div className="min-w-0">
                        <h2
                          className="
                            font-['Cormorant_Garamond']
                            text-2xl
                            md:text-[27px]
                            leading-none
                            text-[#514064]
                          "
                        >
                          {product?.productName}
                        </h2>

                        {product?.category && (
                          <p
                            className="
                              mt-2
                              text-[9px]
                              uppercase
                              tracking-[2px]
                              text-[#968BA0]
                            "
                          >
                            {product.category}
                          </p>
                        )}
                      </div>

                      <p
                        className="
                          text-sm
                          font-medium
                          text-[#806298]
                          whitespace-nowrap
                        "
                      >
                        Rs.{" "}
                        {Number(
                          product?.price || 0
                        ).toLocaleString()}
                      </p>
                    </div>

                    {/* ACTIONS */}

                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/product/${product?._id}`
                          )
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          text-[9px]
                          uppercase
                          tracking-[2.5px]
                          text-[#665875]
                          border-b
                          border-[#B48CF0]
                          pb-1
                          hover:text-[#B48CF0]
                          transition
                        "
                      >
                        Discover Piece
                        <ArrowRight size={12} />
                      </button>

                      <ShoppingBag
                        size={15}
                        className="
                          text-[#B48CF0]
                          opacity-60
                        "
                      />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* =========================
          BOTTOM STORY STRIP
      ========================= */}

      <section
        className="
          border-y
          border-[#E7DFF0]
          bg-white
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-14
            md:py-16
            grid
            md:grid-cols-3
            gap-10
            text-center
          "
        >
          <div>
            <Heart
              size={17}
              className="mx-auto text-[#9B72D0]"
            />

            <p
              className="
                mt-4
                font-['Cormorant_Garamond']
                text-3xl
                text-[#514064]
              "
            >
              Chosen by You
            </p>

            <p
              className="
                mt-2
                text-xs
                leading-6
                text-[#81768D]
              "
            >
              Keep the pieces that speak to you.
            </p>
          </div>

          <div>
            <ShoppingBag
              size={17}
              className="mx-auto text-[#9B72D0]"
            />

            <p
              className="
                mt-4
                font-['Cormorant_Garamond']
                text-3xl
                text-[#514064]
              "
            >
              Made for You
            </p>

            <p
              className="
                mt-2
                text-xs
                leading-6
                text-[#81768D]
              "
            >
              Discover jewellery designed to last.
            </p>
          </div>

          <div>
            <span
              className="
                mx-auto
                flex
                items-center
                justify-center
                w-[17px]
                h-[17px]
                text-[#9B72D0]
                font-['Cormorant_Garamond']
                text-lg
              "
            >
              R
            </span>

            <p
              className="
                mt-4
                font-['Cormorant_Garamond']
                text-3xl
                text-[#514064]
              "
            >
              Roselle
            </p>

            <p
              className="
                mt-2
                text-xs
                leading-6
                text-[#81768D]
              "
            >
              Timeless pieces, thoughtfully chosen.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}