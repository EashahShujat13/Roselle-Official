import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import ShopBanner from "../components/Shop/ShopBanner";
import SearchBar from "../components/Shop/SearchBar";
import SortDropdown from "../components/Shop/SortDropdown";
import ProductCard from "../components/Products/ProductCard";

import {
  getAllProducts,
  searchProducts,
  getProductsByCategory,
} from "../config/apis/productApi";

const reveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function Shop() {

  const [searchParams, setSearchParams] =
    useSearchParams();

  const selectedCategory =
    searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);


  /*
  ==========================================
  LOAD CATEGORY / ALL PRODUCTS
  ==========================================
  */

  useEffect(() => {

    if (keyword.trim()) return;

    const loadProducts = async () => {

      try {

        setLoading(true);

        let response;

        if (selectedCategory !== "All") {

          response =
            await getProductsByCategory(
              selectedCategory
            );

        } else {

          response =
            await getAllProducts();

        }

        setProducts(
          response.products || []
        );

      } catch (error) {

        console.log(error);
        setProducts([]);

      } finally {

        setLoading(false);

      }

    };

    loadProducts();

  }, [selectedCategory, keyword]);


  /*
  ==========================================
  GLOBAL SEARCH
  ==========================================

  IMPORTANT:

  Search category ko ignore karegi.

  Earrings selected
  +
  search "brac"

  => Bracelet products
  */

  useEffect(() => {

    if (!keyword.trim()) return;

    const timer = setTimeout(async () => {

      try {

        setLoading(true);

        const response =
          await searchProducts(
            keyword.trim()
          );

        setProducts(
          response.products || []
        );

      } catch (error) {

        console.log(error);
        setProducts([]);

      } finally {

        setLoading(false);

      }

    }, 350);

    return () => clearTimeout(timer);

  }, [keyword]);


  /*
  ==========================================
  SORT
  ==========================================
  */

  const sortedProducts = useMemo(() => {

    const result = [...products];

    if (sort === "low") {

      return result.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );

    }

    if (sort === "high") {

      return result.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );

    }

    if (sort === "newest") {

      return result.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

    }

    if (sort === "featured") {

      return result.sort(
        (a, b) =>
          Number(b.isFeatured) -
          Number(a.isFeatured)
      );

    }

    return result;

  }, [products, sort]);


  /*
  ==========================================
  DYNAMIC CATEGORY
  ==========================================

  Search ke results se actual category
  automatically detect hogi.
  */

  const dynamicCategory = useMemo(() => {

    /*
    No search
    */

    if (!keyword.trim()) {

      return selectedCategory;

    }


    /*
    Search hai but koi result nahi
    */

    if (!sortedProducts.length) {

      return "Search Results";

    }


    /*
    Search results ki categories
    */

    const categories = [
      ...new Set(
        sortedProducts
          .map(
            (product) =>
              product.category
          )
          .filter(Boolean)
      ),
    ];


    /*
    Sirf ek category
    */

    if (categories.length === 1) {

      return categories[0];

    }


    /*
    Multiple categories
    */

    return "Search Results";

  }, [
    keyword,
    selectedCategory,
    sortedProducts,
  ]);


  /*
  ==========================================
  DYNAMIC DESCRIPTION
  ==========================================
  */

  const dynamicDescription =
    useMemo(() => {

      if (keyword.trim()) {

        if (
          dynamicCategory ===
          "Search Results"
        ) {

          return `Showing pieces matching "${keyword}".`;

        }

        return `Discover ${dynamicCategory.toLowerCase()} pieces matching "${keyword}".`;

      }

      if (
        dynamicCategory === "All"
      ) {

        return "Discover pieces designed to become part of your story.";

      }

      return `Discover our ${dynamicCategory.toLowerCase()} collection.`;

    }, [
      keyword,
      dynamicCategory,
    ]);


  /*
  ==========================================
  CLEAR CATEGORY
  ==========================================
  */

  const handleCategoryClear = () => {

    setKeyword("");
    setSearchParams({});

  };


  /*
  ==========================================
  CLEAR SEARCH
  ==========================================
  */

  const handleSearchClear = () => {

    setKeyword("");

  };


  return (

    <main className="bg-white min-h-screen">


      {/* =====================================
          HERO
      ===================================== */}

      <ShopBanner
        title={dynamicCategory}
        total={sortedProducts.length}
        searching={Boolean(
          keyword.trim()
        )}
      />


      {/* =====================================
          CONTROLS
      ===================================== */}

      <section
        className="
          bg-[#F8F4FC]
          py-14
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
          "
        >

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >

            <div
              className="
                flex
                flex-col
                lg:flex-row
                lg:items-end
                lg:justify-between
                gap-8
              "
            >


              {/* LEFT */}

              <div>

                <p
                  className="
                    uppercase
                    tracking-[5px]
                    text-[10px]
                    text-[#9B72D0]
                    mb-3
                  "
                >
                  {keyword.trim()
                    ? "Search Collection"
                    : "Curated for you"}
                </p>


                <h2
                  className="
                    font-['Cormorant_Garamond']
                    text-5xl
                    md:text-6xl
                    text-[#514064]
                  "
                >

                  {dynamicCategory ===
                  "All"
                    ? "The Collection"
                    : dynamicCategory}

                </h2>


                <p
                  className="
                    mt-3
                    text-sm
                    text-[#81768D]
                    max-w-md
                  "
                >
                  {dynamicDescription}
                </p>

              </div>


              {/* SEARCH + SORT */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                "
              >

                <SearchBar
                  keyword={keyword}
                  setKeyword={setKeyword}
                />

                <SortDropdown
                  sort={sort}
                  setSort={setSort}
                />

              </div>

            </div>


            {/* CATEGORY */}

            {selectedCategory !==
              "All" &&
              !keyword.trim() && (

                <button
                  onClick={
                    handleCategoryClear
                  }
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    text-[10px]
                    uppercase
                    tracking-[3px]
                    text-[#70588D]
                    border-b
                    border-[#B48CF0]
                    pb-1
                    hover:text-[#B48CF0]
                    transition
                  "
                >

                  {selectedCategory}

                  <X size={13} />

                </button>

              )}


            {/* SEARCH */}

            {keyword.trim() && (

              <button
                onClick={
                  handleSearchClear
                }
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  text-[10px]
                  uppercase
                  tracking-[3px]
                  text-[#81768D]
                  hover:text-[#B48CF0]
                  transition
                "
              >

                Search: "{keyword}"

                <X size={13} />

              </button>

            )}

          </motion.div>

        </div>

      </section>


      {/* =====================================
          PRODUCTS
      ===================================== */}

      <section className="pb-28">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              mb-8
            "
          >

            <p
              className="
                text-xs
                tracking-[2px]
                text-[#81768D]
              "
            >

              {loading
                ? "Discovering pieces..."
                : `${sortedProducts.length} ${
                    sortedProducts.length ===
                    1
                      ? "piece"
                      : "pieces"
                  }`}

            </p>


            <SlidersHorizontal
              size={17}
              className="
                text-[#81768D]
              "
            />

          </div>


          {/* LOADING */}

          {loading ? (

            <div
              className="
                grid
                grid-cols-2
                lg:grid-cols-4
                gap-5
                lg:gap-8
              "
            >

              {Array.from({
                length: 8,
              }).map((_, index) => (

                <div
                  key={index}
                  className="
                    aspect-[4/5]
                    bg-[#EDE6F4]
                    animate-pulse
                  "
                />

              ))}

            </div>

          ) : sortedProducts.length ===
            0 ? (

            /* EMPTY */

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                py-32
                text-center
              "
            >

              <p
                className="
                  uppercase
                  tracking-[5px]
                  text-[10px]
                  text-[#9B72D0]
                "
              >
                Roselle
              </p>


              <h3
                className="
                  mt-4
                  font-['Cormorant_Garamond']
                  text-4xl
                  text-[#514064]
                "
              >
                No pieces found
              </h3>


              <p
                className="
                  mt-3
                  text-[#81768D]
                "
              >
                Try another search or
                explore our collection.
              </p>


              <button
                onClick={() => {

                  setKeyword("");
                  setSearchParams({});

                }}
                className="
                  mt-8
                  px-7
                  py-3
                  border
                  border-[#B48CF0]
                  text-[#514064]
                  text-xs
                  uppercase
                  tracking-[2px]
                  hover:bg-[#B48CF0]
                  hover:text-white
                  transition
                "
              >
                View All Pieces
              </button>

            </motion.div>

          ) : (

            /* PRODUCTS */

            <motion.div
              layout
              className="
                grid
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-x-4
                gap-y-12
                lg:gap-x-7
                lg:gap-y-16
              "
            >

              {sortedProducts.map(
                (product, index) => (

                  <ProductCard
                    key={product._id}
                    product={product}
                    index={index}
                  />

                )
              )}

            </motion.div>

          )}

        </div>

      </section>

    </main>
  );
}