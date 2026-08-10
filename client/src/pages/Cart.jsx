
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/images/banners/bouquetRing.jpg";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (cart.length === 0) {
    return (
      <main className="min-h-screen">

        <section className="relative overflow-hidden">

          {/* Background */}

          <div className="absolute inset-0 bg-[#F7F1FC]" />

          <div
            className="
              absolute
              -top-32
              -right-32
              w-[420px]
              h-[420px]
              rounded-full
              bg-[#DCC9F4]/35
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-40
              -left-32
              w-[450px]
              h-[450px]
              rounded-full
              bg-[#E8DDF3]/50
              blur-3xl
            "
          />

          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-px
              h-24
              bg-[#B48CF0]/30
            "
          />

          <div
            className="
              relative
              max-w-5xl
              mx-auto
              px-6
              py-28
              md:py-36
              text-center
            "
          >

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >

              <p
                className="
                  uppercase
                  tracking-[7px]
                  text-[9px]
                  text-[#9B72D0]
                "
              >
                Roselle Jewellery
              </p>

              <h1
                className="
                  mt-6
                  font-['Cormorant_Garamond']
                  text-6xl
                  md:text-8xl
                  leading-[0.85]
                  text-[#514064]
                "
              >
                A little room
                <br />
                <span className="italic text-[#806298]">
                  for something beautiful.
                </span>
              </h1>

              <div
                className="
                  mx-auto
                  mt-9
                  flex
                  items-center
                  justify-center
                  gap-4
                "
              >

                <span className="w-12 h-px bg-[#CDB9E2]" />

                <ShoppingBag
                  size={17}
                  strokeWidth={1}
                  className="text-[#9B72D0]"
                />

                <span className="w-12 h-px bg-[#CDB9E2]" />

              </div>

              <p
                className="
                  mt-8
                  mx-auto
                  max-w-md
                  text-sm
                  leading-7
                  text-[#81768D]
                "
              >
                Your collection is waiting.
                Discover a piece that feels uniquely
                yours and make it part of your story.
              </p>

              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/shop")}
                className="
                  mt-10
                  group
                  inline-flex
                  items-center
                  gap-4
                  bg-[#5E4B7A]
                  text-white
                  px-9
                  py-4
                  uppercase
                  tracking-[3px]
                  text-[10px]
                  hover:bg-[#806298]
                  transition-all
                  duration-300
                "
              >
                Explore the Collection

                <ArrowRight
                  size={15}
                  className="
                    group-hover:translate-x-1
                    transition-transform
                  "
                />
              </motion.button>

            </motion.div>

          </div>

        </section>

        {/* Brand statement */}

        <section className="border-t border-[#E6DDED] bg-white">

          <div
            className="
              max-w-7xl
              mx-auto
              px-6
              py-10
              flex
              flex-col
              md:flex-row
              items-center
              justify-center
              gap-5
              text-center
            "
          >

            <span
              className="
                font-['Cormorant_Garamond']
                text-xl
                text-[#514064]
              "
            >
              Thoughtfully made.
            </span>

            <span
              className="
                hidden
                md:block
                w-1
                h-1
                rounded-full
                bg-[#B48CF0]
              "
            />

            <span
              className="
                font-['Cormorant_Garamond']
                text-xl
                text-[#514064]
              "
            >
              Made to be yours.
            </span>

            <span
              className="
                hidden
                md:block
                w-1
                h-1
                rounded-full
                bg-[#B48CF0]
              "
            />

            <span
              className="
                font-['Cormorant_Garamond']
                text-xl
                text-[#514064]
              "
            >
              Made to last.
            </span>

          </div>

        </section>

      </main>
    );
  }

  // =====================================================
  // CART WITH PRODUCTS
  // =====================================================

  return (
    <main className="min-h-screen">

      {/* =================================================
          CART HEADER
      ================================================= */}

      <section
        className="
          relative
          overflow-hidden
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage:
            `url('${bgImage}')`,
        }}
      >

        {/* Image Overlay */}

        <div className="absolute inset-0 bg-[#3F3155]/70" />

        {/* Soft Decorative Glow */}

        <div
          className="
            absolute
            -top-40
            right-[-80px]
            w-[420px]
            h-[420px]
            rounded-full
            bg-[#D9C4F0]/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-48
            left-[-100px]
            w-[450px]
            h-[450px]
            rounded-full
            bg-[#E9DDF3]/20
            blur-3xl
          "
        />

        {/* Fine Vertical Detail */}

        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-px
            h-20
            bg-[#D7B7FF]/40
          "
        />

        <div
          className="
            relative
            max-w-7xl
            mx-auto
            px-6
            py-20
            md:py-24
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
              duration: 0.8,
              ease: "easeOut",
            }}
            className="
              flex
              flex-col
              md:flex-row
              md:items-end
              md:justify-between
              gap-10
            "
          >

            {/* LEFT */}

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-4
                  mb-6
                "
              >

                <span className="w-10 h-px bg-[#D7B7FF]" />

                <p
                  className="
                    uppercase
                    tracking-[6px]
                    text-[9px]
                    text-[#D7B7FF]
                  "
                >
                  Roselle Jewellery
                </p>

              </div>

              <h1
                className="
                  font-['Cormorant_Garamond']
                  text-6xl
                  md:text-8xl
                  leading-[0.8]
                  text-white
                "
              >
                Your
                <br />

                <span className="italic text-[#E2C9FF]">
                  Collection.
                </span>
              </h1>

              <p
                className="
                  mt-7
                  max-w-md
                  text-sm
                  leading-7
                  text-white/75
                "
              >
                A curated selection of pieces chosen
                to become part of your story.
              </p>

            </div>

            {/* RIGHT */}

            <div className="md:text-right pb-1">

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  mb-5
                "
              >

                <ShoppingBag
                  size={17}
                  strokeWidth={1.2}
                  className="text-[#D7B7FF]"
                />

                <span
                  className="
                    uppercase
                    tracking-[3px]
                    text-[9px]
                    text-white/70
                  "
                >
                  Your Selection
                </span>

              </div>

              <p
                className="
                  font-['Cormorant_Garamond']
                  text-4xl
                  text-white
                "
              >
                {cart.length}

                <span
                  className="
                    ml-2
                    text-xl
                    italic
                    text-[#E2C9FF]
                  "
                >
                  {cart.length === 1
                    ? "piece"
                    : "pieces"}
                </span>
              </p>

              <div
                className="
                  mt-5
                  flex
                  md:justify-end
                  items-center
                  gap-3
                "
              >

                <span className="w-8 h-px bg-white/30" />

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[2px]
                    text-white/60
                  "
                >
                  Carefully selected
                </span>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* =================================================
          CART CONTENT
      ================================================= */}

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">

        <div
          className="
            grid
            lg:grid-cols-[1fr_380px]
            gap-14
          "
        >

          {/* =================================================
              ITEMS
          ================================================= */}

          <div>

            <div
              className="
                border-b
                border-[#E4DAED]
                pb-4
                mb-6
                flex
                justify-between
              "
            >

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[3px]
                  text-[#81768D]
                "
              >
                Your Pieces
              </p>

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[3px]
                  text-[#81768D]
                "
              >
                Total
              </p>

            </div>

            <div className="space-y-8">

              {cart.map((item, index) => {

                const image =
                  item.images?.[0] ||
                  "https://placehold.co/500x600/F0E8F7/5E4B7A?text=Roselle";

                return (
                  <motion.article
                    key={item._id}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                    }}
                    className="
                      grid
                      grid-cols-[100px_1fr]
                      md:grid-cols-[140px_1fr]
                      gap-5
                      md:gap-7
                      border-b
                      border-[#E9E1EF]
                      pb-8
                    "
                  >

                    {/* IMAGE */}

                    <button
                      onClick={() =>
                        navigate(`/product/${item._id}`)
                      }
                      className="
                        aspect-[4/5]
                        overflow-hidden
                        bg-[#EDE5F5]
                      "
                    >

                      <motion.img
                        src={image}
                        alt={item.productName}
                        whileHover={{ scale: 1.06 }}
                        transition={{
                          duration: 0.6,
                        }}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />

                    </button>

                    {/* DETAILS */}

                    <div className="flex flex-col justify-between">

                      <div
                        className="
                          flex
                          justify-between
                          gap-5
                        "
                      >

                        <div>

                          <p
                            className="
                              text-[9px]
                              uppercase
                              tracking-[2px]
                              text-[#9B72D0]
                            "
                          >
                            {item.category || "Roselle"}
                          </p>

                          <h2
                            className="
                              mt-2
                              font-['Cormorant_Garamond']
                              text-2xl
                              md:text-3xl
                              text-[#514064]
                            "
                          >
                            {item.productName}
                          </h2>

                        </div>

                        <p
                          className="
                            text-sm
                            text-[#806298]
                            whitespace-nowrap
                          "
                        >
                          Rs.{" "}
                          {(
                            Number(item.price) *
                            item.quantity
                          ).toLocaleString()}
                        </p>

                      </div>

                      <div
                        className="
                          mt-6
                          flex
                          items-center
                          justify-between
                        "
                      >

                        {/* QUANTITY */}

                        <div
                          className="
                            border
                            border-[#DCCFE8]
                            h-10
                            flex
                            items-center
                            gap-5
                            px-3
                            bg-white
                          "
                        >

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="
                              text-[#655B75]
                              hover:text-[#B48CF0]
                              disabled:opacity-30
                              transition
                            "
                          >
                            <Minus size={13} />
                          </button>

                          <span
                            className="
                              min-w-[12px]
                              text-center
                              text-xs
                              text-[#514064]
                            "
                          >
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity + 1
                              )
                            }
                            className="
                              text-[#655B75]
                              hover:text-[#B48CF0]
                              transition
                            "
                          >
                            <Plus size={13} />
                          </button>

                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item._id)
                          }
                          className="
                            flex
                            items-center
                            gap-2
                            text-[9px]
                            uppercase
                            tracking-[2px]
                            text-[#8B8191]
                            hover:text-[#B56D88]
                            transition
                          "
                        >

                          <Trash2 size={14} />

                          Remove

                        </button>

                      </div>

                    </div>

                  </motion.article>
                );
              })}

            </div>

            {/* CONTINUE SHOPPING */}

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="
                mt-10
                group
                inline-flex
                items-center
                gap-2
                text-[9px]
                uppercase
                tracking-[3px]
                text-[#665875]
                border-b
                border-[#B48CF0]
                pb-2
                hover:text-[#B48CF0]
                transition
              "
            >

              <ArrowLeft
                size={14}
                className="
                  group-hover:-translate-x-1
                  transition-transform
                "
              />

              Continue Shopping

            </button>

          </div>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <motion.aside
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              bg-white
              border
              border-[#E5DCEA]
              p-7
              md:p-8
              h-fit
              lg:sticky
              lg:top-28
            "
          >

            <p
              className="
                uppercase
                tracking-[4px]
                text-[10px]
                text-[#9B72D0]
              "
            >
              Order Summary
            </p>

            <h2
              className="
                mt-3
                font-['Cormorant_Garamond']
                text-3xl
                text-[#514064]
              "
            >
              Your Selection
            </h2>

            <div className="mt-8 space-y-4 text-sm">

              <div
                className="
                  flex
                  justify-between
                  text-[#81768D]
                "
              >

                <span>
                  Subtotal
                </span>

                <span>
                  Rs. {cartTotal.toLocaleString()}
                </span>

              </div>

              <div
                className="
                  flex
                  justify-between
                  gap-5
                  text-[#81768D]
                "
              >

                <span>
                  Delivery
                </span>

                <span className="text-right">
                  Calculated at checkout
                </span>

              </div>

            </div>

            <div
              className="
                my-7
                h-px
                bg-[#E5DCEA]
              "
            />

            <div
              className="
                flex
                justify-between
                items-end
              "
            >

              <span
                className="
                  uppercase
                  tracking-[2px]
                  text-[10px]
                  text-[#514064]
                "
              >
                Total
              </span>

              <span
                className="
                  font-['Cormorant_Garamond']
                  text-3xl
                  text-[#806298]
                "
              >
                Rs. {cartTotal.toLocaleString()}
              </span>

            </div>

            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/checkout")}
              className="
                mt-8
                w-full
                h-14
                bg-[#5E4B7A]
                text-white
                flex
                items-center
                justify-center
                gap-3
                uppercase
                tracking-[3px]
                text-[10px]
                hover:bg-[#806298]
                transition
              "
            >

              Proceed to Checkout

              <ArrowRight size={15} />

            </motion.button>

            <p
              className="
                mt-5
                text-center
                text-[10px]
                leading-5
                text-[#9A909F]
              "
            >
              Your jewellery is carefully prepared
              for its journey to you.
            </p>

          </motion.aside>

        </div>

      </section>

      {/* =================================================
          LUXURY BRAND STRIP
      ================================================= */}

      <section
        className="
          border-t
          border-[#E7DFF0]
          bg-white
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-12
            grid
            md:grid-cols-3
            gap-8
            text-center
          "
        >

          <div>

            <p
              className="
                font-['Cormorant_Garamond']
                text-2xl
                text-[#514064]
              "
            >
              Thoughtfully Made
            </p>

            <p
              className="
                mt-2
                text-xs
                leading-6
                text-[#81768D]
              "
            >
              Jewellery designed around individuality.
            </p>

          </div>

          <div>

            <p
              className="
                font-['Cormorant_Garamond']
                text-2xl
                text-[#514064]
              "
            >
              Made to Last
            </p>

            <p
              className="
                mt-2
                text-xs
                leading-6
                text-[#81768D]
              "
            >
              Pieces created to become part of your story.
            </p>

          </div>

          <div>

            <p
              className="
                font-['Cormorant_Garamond']
                text-2xl
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
              Colour, texture and timeless beauty.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

