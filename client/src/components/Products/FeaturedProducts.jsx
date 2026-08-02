import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getFeaturedProducts } from "../../config/apis/productApi";

export default function FeaturedProducts() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const response = await getFeaturedProducts();

      setProducts(response.products);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <section className="py-24 bg-[#FCFAFF]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <p className="uppercase tracking-[5px] text-[#B48CF0]">
            Featured
          </p>

          <h2
            className="
            text-5xl
            font-['Cormorant_Garamond']
            text-[#5E4B7A]
            mt-3
            "
          >
            Featured Products
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {

            products.map((product) => (

              <div
                key={product._id}
                className="
                bg-white
                rounded-[30px]
                overflow-hidden
                shadow-sm
                hover:shadow-xl
                duration-500
                group
                "
              >

                <div className="relative overflow-hidden">

                  <img
                    src={
                    product.images?.[0] ||
                    "https://placehold.co/500x600?text=Roselle"
}
                    alt={product.productName}
                    className="
                    w-full
                    h-[320px]
                    object-cover
                    duration-500
                    group-hover:scale-110
                    "
                  />

                  <button
                    className="
                    absolute
                    top-5
                    right-5
                    bg-white
                    p-2
                    rounded-full
                    "
                  >

                    <Heart size={18} />

                  </button>

                </div>

                <div className="p-6">

                  <h3
                    className="
                    text-xl
                    font-semibold
                    text-[#5E4B7A]
                    "
                  >
                    {product.productName}
                  </h3>

                  <p
                    className="
                    mt-3
                    text-[#B48CF0]
                    font-semibold
                    "
                  >
                    Rs. {product.price}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/product/${product._id}`)
                    }
                    className="
                    mt-6
                    w-full
                    py-3
                    rounded-full
                    border
                    border-[#B48CF0]
                    hover:bg-[#B48CF0]
                    hover:text-white
                    duration-300
                    "
                  >
                    View Details
                  </button>

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </section>

  );

}