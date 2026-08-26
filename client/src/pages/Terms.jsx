import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#F7F1FC]">
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-[#806298] hover:text-[#5E4B7A] transition"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        <p className="mt-12 uppercase tracking-[6px] text-[9px] text-[#9B72D0]">
          Roselle Jewellery
        </p>

        <h1 className="mt-5 font-['Cormorant_Garamond'] text-6xl text-[#514064]">
          Terms & Conditions
        </h1>

        <p className="mt-4 text-xs text-[#9A909F]">
          Last updated: August 2026
        </p>

        <div className="mt-12 space-y-10 text-sm leading-7 text-[#81768D]">

          <section>
            <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#514064]">
              Orders
            </h2>

            <p className="mt-3">
              By placing an order, you agree to provide accurate information
              required to process and deliver your purchase.
            </p>
          </section>

          <section>
            <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#514064]">
              Product Information
            </h2>

            <p className="mt-3">
              We aim to present product descriptions, images, prices, and
              availability as accurately as possible. Product appearance may
              vary slightly depending on screen settings.
            </p>
          </section>

          <section>
            <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#514064]">
              Pricing
            </h2>

            <p className="mt-3">
              Prices and availability may change without prior notice.
              Applicable delivery charges will be shown during checkout.
            </p>
          </section>

          <section>
            <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#514064]">
              Account Responsibility
            </h2>

            <p className="mt-3">
              Customers are responsible for maintaining the accuracy and
              security of their account information.
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}
