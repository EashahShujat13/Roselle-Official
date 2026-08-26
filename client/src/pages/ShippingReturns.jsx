import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ShippingReturns() {
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
          Shipping & Returns
        </h1>

        <div className="mt-12 space-y-10 text-sm leading-7 text-[#81768D]">

          <section>
            <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#514064]">
              Shipping
            </h2>

            <p className="mt-3">
              Orders are carefully prepared and dispatched using our
              available delivery service. Delivery timelines and charges
              may vary depending on your location.
            </p>
          </section>

          <section>
            <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#514064]">
              Order Processing
            </h2>

            <p className="mt-3">
              Orders are processed after successful confirmation. Customers
              should ensure that all delivery information provided during
              checkout is accurate.
            </p>
          </section>

          <section>
            <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#514064]">
              Returns
            </h2>

            <p className="mt-3">
              Return eligibility depends on the condition of the item and
              the applicable Roselle Jewellery return policy. Items should
              remain unused and in their original condition.
            </p>
          </section>

          <section>
            <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#514064]">
              Need Help?
            </h2>

            <p className="mt-3">
              If you have questions regarding an order, delivery, or return,
              please contact our support team.
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}