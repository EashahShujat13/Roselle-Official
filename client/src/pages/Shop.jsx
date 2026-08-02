import { useEffect, useState } from "react";
import ShopBanner from "../components/Shop/ShopBanner";
import SearchBar from "../components/Shop/SearchBar";
import CategoryFilter from "../components/Shop/CategoryFilter";
import SortDropdown from "../components/Shop/SortDropdown";

import ProductCard from "../components/Products/ProductCard";

import { getAllProducts,searchProducts, } from "../config/apis/productApi";

export default function Shop() {

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {
      const response = await getAllProducts();
      setProducts(response.products);

    } catch (error) {
      console.log(error);
    }

    
  };


  useEffect(() => {
    if (keyword.trim() === "") {
    fetchProducts();
    }

    else {
    handleSearch();
    }

   }, [keyword]);
   const handleSearch = async () => {
  try {
    const response = await searchProducts(keyword);
    setProducts(response.products);
  }

  catch (error) {
    console.log(error);
  }

};

  return (

    <>

      <ShopBanner />

      <SearchBar
         keyword={keyword}

        setKeyword={setKeyword} />

      <CategoryFilter />

      <SortDropdown />

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {

            products.map((product) => (

              <ProductCard

                key={product._id}

                product={product}

              />

            ))

          }

        </div>

      </section>

    </>

  );

}