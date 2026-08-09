import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { getSingleProduct } from "../config/apis/productApi";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  // =========================
  // FETCH PRODUCT
  // =========================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await getSingleProduct(id);

        setProduct(response.product);
      } catch (error) {
        console.log("Single Product Error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FCFAFF]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-14">
            <div className="aspect-[4/5] bg-[#EEE6F5] animate-pulse" />

            <div className="py-10 space-y-6">
              <div className="h-3 w-32 bg-[#E9DFF2] animate-pulse" />

              <div className="h-14 w-3/4 bg-[#E9DFF2] animate-pulse" />

              <div className="h-5 w-32 bg-[#E9DFF2] animate-pulse" />

              <div className="h-px bg-[#E9DFF2]" />

              <div className="h-20 w-full bg-[#E9DFF2] animate-pulse" />

              <div className="h-14 w-full bg-[#E9DFF2] animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // PRODUCT NOT FOUND
  // =========================

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FCFAFF] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="uppercase tracking-[5px] text-[10px] text-[#9B72D0]">
            Roselle
          </p>

          <h1 className="mt-4 font-['Cormorant_Garamond'] text-5xl text-[#514064]">
            Piece not found
          </h1>

          <button
            onClick={() => navigate("/shop")}
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              border-b
              border-[#B48CF0]
              pb-2
              text-[10px]
              uppercase
              tracking-[3px]
              text-[#514064]
              hover:text-[#B48CF0]
              transition
            "
          >
            <ArrowLeft size={15} />
            Back to Collection
          </button>
        </div>
      </main>
    );
  }

  // =========================
  // DYNAMIC DATA
  // =========================

  const stock = Math.max(0, Number(product.stock) || 0);

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [
          "https://placehold.co/900x1100/F0E8F7/5E4B7A?text=Roselle",
        ];

  const isOutOfStock = stock === 0;

  const isMaxQuantity = quantity >= stock;

  // =========================
  // QUANTITY
  // =========================

  const increaseQuantity = () => {
    if (isOutOfStock) return;

    setQuantity((prev) => Math.min(prev + 1, stock));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // =========================
  // IMAGE CONTROLS
  // =========================

  const nextImage = () => {
    setSelectedImage(
      (prev) => (prev + 1) % images.length
    );
  };

  const previousImage = () => {
    setSelectedImage(
      (prev) =>
        (prev - 1 + images.length) % images.length
    );
  };

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addToCart(product, quantity);

    navigate("/cart");
  };

  return (
    <main className="min-h-screen bg-[#FCFAFF]">

      {/* =========================
          BACK BUTTON
      ========================= */}

      <div className="max-w-7xl mx-auto px-6 pt-8">
        <button
          onClick={() => navigate("/shop")}
          className="
            group
            inline-flex
            items-center
            gap-2
            text-[9px]
            uppercase
            tracking-[3px]
            text-[#756982]
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

          Back to collection
        </button>
      </div>

      {/* =========================
          PRODUCT SECTION
      ========================= */}

      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20">

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20">

          {/* =========================
              GALLERY
          ========================= */}

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="grid grid-cols-[72px_1fr] gap-4">

              {/* THUMBNAILS */}

              <div className="flex flex-col gap-3">

                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() =>
                      setSelectedImage(index)
                    }
                    className={`
                      aspect-[4/5]
                      overflow-hidden
                      bg-[#EDE5F5]
                      border
                      transition
                      ${
                        selectedImage === index
                          ? "border-[#9B72D0]"
                          : "border-transparent"
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt={`${product.productName} ${index + 1}`}
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />
                  </button>
                ))}

              </div>

              {/* MAIN IMAGE */}

              <div className="
                relative
                aspect-[4/5]
                overflow-hidden
                bg-[#EDE5F5]
              ">

                <motion.img
                  key={images[selectedImage]}
                  src={images[selectedImage]}
                  alt={product.productName}
                  initial={{
                    opacity: 0,
                    scale: 1.03,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.55,
                  }}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

                {/* FEATURED */}

                {product.isFeatured && (
                  <div className="
                    absolute
                    top-5
                    left-5
                    bg-white/95
                    px-4
                    py-2
                    text-[8px]
                    uppercase
                    tracking-[3px]
                    text-[#514064]
                  ">
                    Featured
                  </div>
                )}

                {/* WISHLIST */}

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setLiked((prev) => !prev)
                  }
                  className="
                    absolute
                    top-5
                    right-5
                    w-11
                    h-11
                    rounded-full
                    bg-white/95
                    flex
                    items-center
                    justify-center
                    text-[#514064]
                    hover:text-[#B48CF0]
                    transition
                  "
                >
                  <Heart
                    size={18}
                    fill={
                      liked
                        ? "currentColor"
                        : "none"
                    }
                  />
                </motion.button>

                {/* IMAGE ARROWS */}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="
                        absolute
                        bottom-5
                        left-5
                        w-10
                        h-10
                        rounded-full
                        bg-white/90
                        flex
                        items-center
                        justify-center
                        text-[#514064]
                        hover:bg-[#B48CF0]
                        hover:text-white
                        transition
                      "
                    >
                      <ArrowLeft size={16} />
                    </button>

                    <button
                      onClick={nextImage}
                      className="
                        absolute
                        bottom-5
                        right-5
                        w-10
                        h-10
                        rounded-full
                        bg-white/90
                        flex
                        items-center
                        justify-center
                        text-[#514064]
                        hover:bg-[#B48CF0]
                        hover:text-white
                        transition
                      "
                    >
                      <ArrowRight size={16} />
                    </button>
                  </>
                )}

              </div>
            </div>
          </motion.div>

          {/* =========================
              PRODUCT INFORMATION
          ========================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 35,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="flex flex-col justify-center"
          >

            {/* CATEGORY */}

            <p className="
              uppercase
              tracking-[5px]
              text-[10px]
              text-[#9B72D0]
            ">
              {product.category ||
                "Roselle Jewellery"}
            </p>

            {/* NAME */}

            <h1 className="
              mt-5
              font-['Cormorant_Garamond']
              text-5xl
              md:text-6xl
              lg:text-7xl
              leading-[0.9]
              text-[#514064]
            ">
              {product.productName}
            </h1>

            <div className="
              mt-7
              w-14
              h-px
              bg-[#B48CF0]
            " />

            {/* PRICE */}

            <p className="
              mt-7
              text-2xl
              font-medium
              text-[#806298]
            ">
              Rs.{" "}
              {Number(product.price).toLocaleString()}
            </p>

            {/* DESCRIPTION */}

            {product.description && (
              <p className="
                mt-7
                max-w-xl
                text-sm
                leading-7
                text-[#756982]
              ">
                {product.description}
              </p>
            )}

            {/* =========================
                STOCK STATUS
            ========================= */}

            <div className="
              mt-8
              flex
              items-center
              gap-3
            ">

              <span
                className={`
                  w-2
                  h-2
                  rounded-full
                  ${
                    stock > 0
                      ? "bg-[#9B72D0]"
                      : "bg-[#B9AFBF]"
                  }
                `}
              />

              <span className="
                text-[10px]
                uppercase
                tracking-[2px]
                text-[#756982]
              ">
                {stock > 0
                  ? `${stock} ${
                      stock === 1
                        ? "piece"
                        : "pieces"
                    } available`
                  : "Currently unavailable"}
              </span>

            </div>

            <div className="
              my-9
              h-px
              bg-[#E5DCEA]
            " />

            {/* =========================
                QUANTITY
            ========================= */}

            {!isOutOfStock && (
              <div className="mb-6">

                <div className="
                  flex
                  items-center
                  justify-between
                  mb-3
                ">

                  <span className="
                    text-[9px]
                    uppercase
                    tracking-[3px]
                    text-[#756982]
                  ">
                    Quantity
                  </span>

                  <span className="
                    text-[9px]
                    text-[#9A909F]
                  ">
                    Max {stock}
                  </span>

                </div>

                <div className="
                  inline-flex
                  items-center
                  border
                  border-[#DCCFE8]
                  bg-white
                  h-12
                ">

                  {/* MINUS */}

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="
                      w-12
                      h-full
                      flex
                      items-center
                      justify-center
                      text-[#514064]
                      hover:text-[#B48CF0]
                      disabled:opacity-30
                      disabled:cursor-not-allowed
                      transition
                    "
                  >
                    <Minus size={15} />
                  </motion.button>

                  {/* NUMBER */}

                  <span className="
                    min-w-[48px]
                    text-center
                    text-sm
                    text-[#514064]
                  ">
                    {quantity}
                  </span>

                  {/* PLUS */}

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={increaseQuantity}
                    disabled={isMaxQuantity}
                    className="
                      w-12
                      h-full
                      flex
                      items-center
                      justify-center
                      text-[#514064]
                      hover:text-[#B48CF0]
                      disabled:opacity-30
                      disabled:cursor-not-allowed
                      transition
                    "
                  >
                    <Plus size={15} />
                  </motion.button>

                </div>

                {isMaxQuantity && stock > 1 && (
                  <p className="
                    mt-3
                    text-[9px]
                    text-[#9A909F]
                  ">
                    You've reached the available stock.
                  </p>
                )}

              </div>
            )}

            {/* =========================
                ADD TO CART
            ========================= */}

            <motion.button
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className="
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
                disabled:opacity-40
                disabled:cursor-not-allowed
                transition
              "
            >
              <ShoppingBag size={16} />

              {isOutOfStock
                ? "Sold Out"
                : `Add ${quantity} ${
                    quantity === 1
                      ? "Piece"
                      : "Pieces"
                  } to Bag`}
            </motion.button>

            {/* =========================
                SMALL DETAILS
            ========================= */}

            <div className="
              mt-10
              grid
              grid-cols-2
              gap-4
            ">

              <div className="
                border
                border-[#E5DCEA]
                p-5
                bg-white/60
              ">
                <Sparkles
                  size={17}
                  className="text-[#9B72D0]"
                />

                <p className="
                  mt-3
                  text-[9px]
                  uppercase
                  tracking-[2px]
                  text-[#514064]
                ">
                  Thoughtfully crafted
                </p>

                <p className="
                  mt-2
                  text-xs
                  leading-5
                  text-[#81768D]
                ">
                  Designed with detail and intention.
                </p>
              </div>

              <div className="
                border
                border-[#E5DCEA]
                p-5
                bg-white/60
              ">
                <Heart
                  size={17}
                  className="text-[#9B72D0]"
                />

                <p className="
                  mt-3
                  text-[9px]
                  uppercase
                  tracking-[2px]
                  text-[#514064]
                ">
                  Made to be yours
                </p>

                <p className="
                  mt-2
                  text-xs
                  leading-5
                  text-[#81768D]
                ">
                  A piece made for your everyday story.
                </p>
              </div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* =========================
          STORY STRIP
      ========================= */}

      <section className="
        border-y
        border-[#E7DFF0]
        bg-white
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          py-16
          grid
          md:grid-cols-3
          gap-10
          text-center
        ">

          <div>
            <p className="
              font-['Cormorant_Garamond']
              text-3xl
              text-[#514064]
            ">
              Thoughtfully Made
            </p>

            <p className="
              mt-2
              text-xs
              leading-6
              text-[#81768D]
            ">
              Jewellery designed around individuality.
            </p>
          </div>

          <div>
            <p className="
              font-['Cormorant_Garamond']
              text-3xl
              text-[#514064]
            ">
              Made to Last
            </p>

            <p className="
              mt-2
              text-xs
              leading-6
              text-[#81768D]
            ">
              Pieces created to become part of your story.
            </p>
          </div>

          <div>
            <p className="
              font-['Cormorant_Garamond']
              text-3xl
              text-[#514064]
            ">
              Roselle
            </p>

            <p className="
              mt-2
              text-xs
              leading-6
              text-[#81768D]
            ">
              Colour, texture and timeless beauty.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}