import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {

  const navigate = useNavigate();

  return (

    <div
      className="
      bg-white
      rounded-[28px]
      overflow-hidden
      shadow-sm
      hover:shadow-xl
      duration-300
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
          group-hover:scale-110
          duration-500
          "
        />

        <button
          className="
          absolute
          top-4
          right-4
          bg-white
          p-2
          rounded-full
          shadow
          "
        >
          <Heart size={18} />
        </button>

      </div>

      <div className="p-5">

        <h3 className="text-xl text-[#5E4B7A] font-semibold">
          {product.productName}
        </h3>

        <p className="text-[#B48CF0] mt-2 font-bold">
          Rs. {product.price}
        </p>

        <button
          onClick={() => navigate(`/product/${product._id}`)}
          className="
          w-full
          mt-5
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

  );

}