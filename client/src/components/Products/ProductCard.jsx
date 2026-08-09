import {
  ArrowUpRight,
  Heart,
} from "lucide-react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

export default function ProductCard({
  product,
  index = 0,
}) {
  const navigate = useNavigate();

  const [liked, setLiked] =
    useState(false);

  const image =
    product.images?.[0] ||
    "https://placehold.co/700x850/F0E9F7/5E4B7A?text=Roselle";

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration: 0.65,
        delay: Math.min(
          index * 0.05,
          0.25
        ),
      }}
      className="group"
    >

      {/* IMAGE */}

      <div
        onClick={() =>
          navigate(
            `/product/${product._id}`
          )
        }
        className="
          relative
          overflow-hidden
          bg-[#EDE5F5]
          aspect-[4/5]
          cursor-pointer
        "
      >

        <motion.img
          src={image}
          alt={product.productName}
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

        {/* Overlay */}

        <div className="
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
        " />

        {/* Featured */}

        {product.isFeatured && (
          <span className="
            absolute
            top-4
            left-4
            bg-white/95
            px-3
            py-2
            text-[8px]
            uppercase
            tracking-[2px]
            text-[#5E4B7A]
          ">
            Featured
          </span>
        )}

        {/* Wishlist */}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLiked((prev) => !prev);
          }}
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
            hover:text-[#B48CF0]
            transition
          "
        >

          <Heart
            size={17}
            fill={
              liked
                ? "currentColor"
                : "none"
            }
          />

        </button>

        {/* View Piece */}

        <div className="
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
        ">
          View Piece
          <ArrowUpRight size={13} />
        </div>

      </div>

      {/* DETAILS */}

      <div className="pt-5">

        <div className="
          flex
          justify-between
          gap-3
        ">

          <div>

            <h3 className="
              font-['Cormorant_Garamond']
              text-2xl
              md:text-[27px]
              leading-none
              text-[#514064]
            ">
              {product.productName}
            </h3>

            <p className="
              mt-2
              text-[10px]
              uppercase
              tracking-[2px]
              text-[#968BA0]
            ">
              {product.category}
            </p>

          </div>

          <p className="
            text-sm
            font-medium
            text-[#806298]
            whitespace-nowrap
          ">
            Rs.{" "}
            {Number(
              product.price || 0
            ).toLocaleString()}
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/product/${product._id}`
            )
          }
          className="
            mt-5
            text-[9px]
            uppercase
            tracking-[3px]
            text-[#665875]
            border-b
            border-[#B48CF0]
            pb-1
            hover:text-[#B48CF0]
            transition
          "
        >
          Discover Piece
        </button>

      </div>

    </motion.article>
  );
}