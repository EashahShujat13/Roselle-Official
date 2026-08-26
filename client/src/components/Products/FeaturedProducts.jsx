import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { getFeaturedProducts } from "../../config/apis/productApi";
import ProductCard from "./ProductCard";

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
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
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
            <p
              className="
                uppercase
                tracking-[6px]
                text-[10px]
                text-[#9B72D0]
                mb-5
              "
            >
              The Roselle Edit
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
              Pieces worth
              <br />
              <span className="italic">remembering.</span>
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {products.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}