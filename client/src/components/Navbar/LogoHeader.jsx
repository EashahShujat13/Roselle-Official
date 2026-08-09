import { useNavigate } from "react-router-dom";

export default function LogoHeader() {
  const navigate = useNavigate();

  return (
    <div className="py-8 text-center bg-white">

      <h1
        onClick={() => navigate("/")}
        className="
          cursor-pointer
          text-[#5E4B7A]
          text-5xl
          tracking-[10px]
          font-semibold
          font-['Cormorant_Garamond']
        "
      >
        ROSELLE
      </h1>

      <p
        className="
          mt-2
          text-xs
          tracking-[6px]
          uppercase
          text-[#B48CF0]
        "
      >
        Fine Jewellery
      </p>

    </div>
  );
}