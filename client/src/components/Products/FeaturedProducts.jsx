import { useEffect, useState } from "react";
import { ArrowUpRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { getFeaturedProducts } from "../../config/apis/productApi";

export default function FeaturedProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getFeaturedProducts();

        setProducts(response.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-[#F5EFFA] py-28 md:py-36">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            flex
            flex-col
            md:flex-row
            md:items-end
            md:justify-between
            gap-8
            mb-16
          "
        >

          <div>

            <p className="
              uppercase
              tracking-[6px]
              text-[10px]
              text-[#9B72D0]
              mb-5
            ">
              The Roselle Edit
            </p>

            <h2 className="
              font-['Cormorant_Garamond']
              text-5xl
              md:text-7xl
              leading-[0.9]
              text-[#514064]
            ">
              Pieces worth
              <br />
              <span className="italic">
                remembering.
              </span>
            </h2>

          </div>

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
              w-fit
            "
          >
            Shop All

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


        {/* Products */}

        <div className="
          grid
          sm:grid-cols-2
          lg:grid-cols-4
          gap-7
        ">

          {products.map((product, index) => (

            <motion.article
              key={product._id}
              initial={{
                opacity: 0,
                y: 50,
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
                duration: 0.7,
                delay: index * 0.1,
              }}
              className="group cursor-pointer"
              onClick={() =>
                navigate(`/product/${product._id}`)
              }
            >

              <div className="
                relative
                overflow-hidden
                bg-[#E4D7F0]
                aspect-[4/5]
              ">

                <motion.img
                  src={
                    product.images?.[0] ||
                    "https://placehold.co/600x750?text=Roselle"
                  }
                  alt={product.productName}
                  whileHover={{
                    scale: 1.07,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="
                    absolute
                    top-5
                    right-5
                    w-10
                    h-10
                    rounded-full
                    bg-white/95
                    flex
                    items-center
                    justify-center
                    text-[#514064]
                    hover:bg-[#B48CF0]
                    hover:text-white
                    transition
                  "
                >
                  <Heart size={17} />
                </button>


                <div className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  bg-white/95
                  translate-y-full
                  group-hover:translate-y-0
                  transition-transform
                  duration-500
                  py-4
                  text-center
                ">
                  <span className="
                    uppercase
                    tracking-[3px]
                    text-[9px]
                    text-[#514064]
                  ">
                    View Details
                  </span>
                </div>

              </div>


              <div className="pt-5">

                <p className="
                  uppercase
                  tracking-[3px]
                  text-[9px]
                  text-[#9B72D0]
                ">
                  {product.category}
                </p>

                <h3 className="
                  mt-2
                  font-['Cormorant_Garamond']
                  text-2xl
                  text-[#514064]
                ">
                  {product.productName}
                </h3>

                <p className="
                  mt-2
                  text-sm
                  text-[#655b75]
                ">
                  Rs. {product.price}
                </p>

              </div>

            </motion.article>

          ))}

        </div>

      </div>

    </section>
  );
}