import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#F7F1FC]">
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-[6px] text-[9px] text-[#9B72D0]">
            Roselle Jewellery
          </p>

          <h1 className="mt-5 font-['Cormorant_Garamond'] text-6xl md:text-7xl text-[#514064]">
            We'd love to hear from you.
          </h1>

          <p className="mt-6 text-sm leading-7 text-[#81768D]">
            Whether you have a question about an order, our jewellery,
            or anything else, our team is here to help.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <motion.a
            href="mailto:hello@rosellejewellery.com"
            whileHover={{ y: -5 }}
            className="bg-white border border-[#E5DCEA] p-8 text-center"
          >
            <Mail size={22} strokeWidth={1.2} className="mx-auto text-[#806298]" />
            <h2 className="mt-5 font-['Cormorant_Garamond'] text-2xl text-[#514064]">
              Email
            </h2>
            <p className="mt-2 text-xs text-[#81768D]">
              hello@rosellejewellery.com
            </p>
          </motion.a>

          <motion.a
            href="tel:+923001234567"
            whileHover={{ y: -5 }}
            className="bg-white border border-[#E5DCEA] p-8 text-center block"
          >
            <Phone size={22} strokeWidth={1.2} className="mx-auto text-[#806298]" />
            <h2 className="mt-5 font-['Cormorant_Garamond'] text-2xl text-[#514064]">
              Phone
            </h2>
            <p className="mt-2 text-xs text-[#81768D]">
              +92 300 1234567
            </p>
          </motion.a>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white border border-[#E5DCEA] p-8 text-center"
          >
            <MapPin size={22} strokeWidth={1.2} className="mx-auto text-[#806298]" />
            <h2 className="mt-5 font-['Cormorant_Garamond'] text-2xl text-[#514064]">
              Location
            </h2>
            <p className="mt-2 text-xs text-[#81768D]">
              Pakistan
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}