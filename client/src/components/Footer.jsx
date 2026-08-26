import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#3D3150] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Cormorant_Garamond'] text-4xl tracking-[6px]">
              ROSELLE
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/60 max-w-xs">
              Luxury jewellery crafted for timeless
              elegance and modern individuality.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/60 max-w-xs">
              Discover pieces designed to become
              part of your story.
            </p>
          </motion.div>

          {/* Shop */}
          <div>
            <h3 className="uppercase tracking-[4px] text-[10px] text-[#DCC9F4]">
              Shop
            </h3>

            <div className="mt-6 flex flex-col gap-4 text-sm text-white/60">
              <button onClick={() => navigate("/shop")} className="text-left hover:text-white transition">
                All Jewellery
              </button>
              <button onClick={() => navigate("/shop")} className="text-left hover:text-white transition">
                Necklaces
              </button>
              <button onClick={() => navigate("/shop")} className="text-left hover:text-white transition">
                Rings
              </button>
              <button onClick={() => navigate("/shop")} className="text-left hover:text-white transition">
                Bracelets
              </button>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="uppercase tracking-[4px] text-[10px] text-[#DCC9F4]">
              Explore
            </h3>

            <div className="mt-6 flex flex-col gap-4 text-sm text-white/60">
              <button onClick={() => navigate("/")} className="text-left hover:text-white transition">
                Home
              </button>
              <button onClick={() => navigate("/shop")} className="text-left hover:text-white transition">
                Collections
              </button>
              <button onClick={() => navigate("/contact")} className="text-left hover:text-white transition">
                Contact
              </button>
              <button onClick={() => navigate("/auth")} className="text-left hover:text-white transition">
                Account
              </button>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="uppercase tracking-[4px] text-[10px] text-[#DCC9F4]">
              Follow Roselle
            </h3>

            <div className="mt-6 flex gap-3">
              {[FaInstagram, FaFacebookF, FaPinterestP, FaTwitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#B48CF0] hover:border-[#B48CF0] transition"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-20 pt-7 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-[10px] uppercase tracking-[2px] text-white/40">

          <p>© 2026 ROSELLE</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <button onClick={() => navigate("/terms")} className="hover:text-white transition">
              Terms & Conditions
            </button>
            <button onClick={() => navigate("/privacy-policy")} className="hover:text-white transition">
              Privacy Policy
            </button>
            <button onClick={() => navigate("/shipping-returns")} className="hover:text-white transition">
              Shipping & Returns
            </button>
          </div>

          <p>Designed with elegance</p>

        </div>

      </div>
    </footer>
  );
}