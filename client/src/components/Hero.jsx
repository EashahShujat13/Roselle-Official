import { ArrowRight } from "lucide-react";
import heroImg from "../assets/images/categories/cat3.jpeg"; // apni image ka name

export default function Hero() {
  return (
    <section className="bg-[#FCFAFF]">

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20">

        <div className="grid lg:grid-cols-2 items-center gap-16">

          {/* Left */}

          <div>

            <p className="
            uppercase
            tracking-[6px]
            text-[#B48CF0]
            text-sm
            mb-5
            ">
              Luxury Jewellery
            </p>

            <h1 className="
            text-5xl
            lg:text-7xl
            leading-tight
            text-[#5E4B7A]
            font-['Cormorant_Garamond']
            ">
              Timeless
              <br />
              Elegance
            </h1>

            <p className="
            mt-8
            text-lg
            text-[#7B6B91]
            max-w-lg
            leading-8
            ">
              Discover handcrafted jewellery
              designed to celebrate every
              beautiful moment with elegance
              and luxury.
            </p>

            <button
              className="
              mt-10
              flex
              items-center
              gap-3
              bg-[#B48CF0]
              text-white
              px-8
              py-4
              rounded-full
              hover:bg-[#9D70E8]
              duration-300
              "
            >
              Shop Collection

              <ArrowRight size={18} />

            </button>

          </div>

          {/* Right */}

          <div>

            <img
              src={heroImg}
              alt="Jewellery"
              className="
              w-full
              rounded-[40px]
              object-cover
              shadow-2xl
              "
            />

          </div>

        </div>

      </div>

    </section>
  );
}