import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-[#EDE3F7] py-24 md:py-32">

      <div className="max-w-4xl mx-auto px-6 text-center">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <p className="
            uppercase
            tracking-[6px]
            text-[10px]
            text-[#9B72D0]
            mb-5
          ">
            Roselle Journal
          </p>

          <h2 className="
            font-['Cormorant_Garamond']
            text-5xl
            md:text-7xl
            leading-[0.9]
            text-[#514064]
          ">
            Stay close to
            <br />
            <span className="italic">
              Roselle.
            </span>
          </h2>

          <p className="
            mt-7
            max-w-lg
            mx-auto
            text-sm
            leading-7
            text-[#655b75]
          ">
            Be the first to discover new collections,
            handmade stories and special pieces.
          </p>


          {!submitted ? (

            <form
              onSubmit={handleSubmit}
              className="
                max-w-xl
                mx-auto
                mt-10
                flex
                border-b
                border-[#9B72D0]
              "
            >

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  py-4
                  text-sm
                  text-[#514064]
                  placeholder:text-[#8A8098]
                "
              />

              <button
                type="submit"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  py-4
                  text-[#514064]
                  uppercase
                  tracking-[3px]
                  text-[10px]
                "
              >
                Join

                <ArrowUpRight
                  size={15}
                  className="
                    group-hover:rotate-45
                    transition-transform
                    duration-500
                  "
                />
              </button>

            </form>

          ) : (

            <motion.p
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mt-10
                font-['Cormorant_Garamond']
                text-2xl
                text-[#514064]
              "
            >
              Welcome to Roselle.
            </motion.p>

          )}

        </motion.div>

      </div>

    </section>
  );
}