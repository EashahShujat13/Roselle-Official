import {
  Heart,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);

  return (

    <nav className="bg-white border-b border-[#eee7f8] sticky top-0 z-50">

      {/* Logo */}

      <div className="py-8 text-center">

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

      {/* Desktop */}

      <div
        className="
        hidden
        lg:flex
        items-center
        justify-between
        max-w-7xl
        mx-auto
        px-10
        h-16
        border-t
        border-[#eee7f8]
        "
      >

        {/* Left */}

        <div className="flex items-center gap-8">

          <button
            onClick={() => navigate("/")}
            className="text-[#655b75] hover:text-[#B48CF0]"
          >
            Home
          </button>

          <span>|</span>

          <button
            onClick={() => navigate("/shop")}
            className="text-[#655b75] hover:text-[#B48CF0]"
          >
            Shop
          </button>

          <span>|</span>

          <button
            onClick={() => navigate("/collections")}
            className="text-[#655b75] hover:text-[#B48CF0]"
          >
            Collections
          </button>

          <span>|</span>

          <button
            onClick={() => navigate("/contact")}
            className="text-[#655b75] hover:text-[#B48CF0]"
          >
            Contact
          </button>

        </div>

        {/* Right */}

        <div className="flex items-center gap-6">

          <Heart
            size={20}
            className="
            cursor-pointer
            text-[#655b75]
            hover:text-[#B48CF0]
            "
          />

          <ShoppingBag
            size={20}
            className="
            cursor-pointer
            text-[#655b75]
            hover:text-[#B48CF0]
            "
          />

          {

            token ?

            <button
              onClick={() => navigate("/profile")}
              className="
              text-[#655b75]
              hover:text-[#B48CF0]
              "
            >
              Account
            </button>

            :

            <button
              onClick={() => navigate("/auth")}
              className="
              text-[#655b75]
              hover:text-[#B48CF0]
              "
            >
              Login
            </button>

          }

        </div>

      </div>

      {/* Mobile */}

      <div
        className="
        lg:hidden
        flex
        items-center
        justify-between
        px-5
        h-16
        border-t
        border-[#eee7f8]
        "
      >

        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>

        <ShoppingBag />

      </div>

      {

        open &&

        <div
          className="
          fixed
          inset-0
          bg-black/40
          z-50
          "
        >

          <div
            className="
            w-[270px]
            h-full
            bg-white
            p-6
            "
          >

            <div className="flex justify-end">

              <button
                onClick={() => setOpen(false)}
              >
                <X />
              </button>

            </div>

            <div className="mt-8 flex flex-col gap-6">

              <button onClick={() => navigate("/")}>
                Home
              </button>

              <button onClick={() => navigate("/shop")}>
                Shop
              </button>

              <button onClick={() => navigate("/collections")}>
                Collections
              </button>

              <button onClick={() => navigate("/contact")}>
                Contact
              </button>

              <button onClick={() => navigate("/auth")}>
                Login
              </button>

            </div>

          </div>

        </div>

      }

    </nav>

  );

}