import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>

        <p className="mt-4 text-xs text-[#9A909F]">
          Last updated: August 2026
        </p>

        <div className="mt-12 space-y-10 text-sm leading-7 text-[#81768D]">

          <section>
            <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#514064]">
              Information We Collect
            </h2>

            <p className="mt-3">
              When you create an account, place an order, or contact us,
              we may collect information such as your name, email address,
              shipping details, and order information.
            </p>
          </section>

          <section>
            <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#514064]">
              How We Use Your Information
            </h2>

            <p className="mt-3">
              Your information may be used to process orders, provide
              customer support, maintain your account, and improve our
              services and shopping experience.
            </p>
          </section>

          <section>
            <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#514064]">
              Data Security
            </h2>

            <p className="mt-3">
              We take reasonable measures to protect information associated
              with your account and orders. However, no online service can
              guarantee complete security.
            </p>
          </section>

          <section>
            <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#514064]">
              Contact
            </h2>

            <p className="mt-3">
              If you have questions about this Privacy Policy, please
              contact Roselle Jewellery through our Contact page.
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}