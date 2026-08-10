
import { motion } from "framer-motion";
import {
  User,
  Mail,
  LogOut,
  ShoppingBag,
  Heart,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgAuth from '../assets/images/auth/bgauth2.jpg';
import { getMyProfile } from "../config/apis/authApi";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getMyProfile(token);
        setUser(response.user);
      } catch (error) {
        console.error("Profile Error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/auth");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF7FD] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            size={28}
            className="animate-spin text-[#9B72D0]"
            strokeWidth={1.5}
          />

          <p className="text-[10px] uppercase tracking-[4px] text-[#81768D]">
            Loading your account
          </p>
        </div>
      </main>
    );
  }

  // Not logged in
  if (!token || !user) {
    return (
      <main className="min-h-screen bg-[#FAF7FD] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-md"
        >
          <p className="uppercase tracking-[6px] text-[10px] text-[#9B72D0]">
            Roselle
          </p>

          <h1 className="mt-4 font-['Cormorant_Garamond'] text-5xl text-[#514064]">
            Welcome to Roselle
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#81768D]">
            Sign in to view your account and manage your Roselle
            experience.
          </p>

          <button
            onClick={() => navigate("/auth")}
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              bg-[#5E4B7A]
              text-white
              px-8
              py-4
              uppercase
              tracking-[3px]
              text-[10px]
              hover:bg-[#806298]
              transition
            "
          >
            Sign In
            <ArrowRight size={15} />
          </button>
        </motion.div>
      </main>
    );
  }

  const displayName =
    user.fullname ||
    user.fullName ||
    user.name ||
    "Roselle Member";

  const email = user.email || "Your account email";

  const provider =
    user.provider === "google"
      ? "Google Account"
      : "Roselle Account";

  return (
    <main className="min-h-screen bg-[#FAF7FD]">

      {/* HERO / ACCOUNT BANNER */}

      <section
        className="
          relative
          overflow-hidden
          py-24
          md:py-32
          bg-cover
          bg-center
        "
        style={{
          backgroundImage:
            `url('${bgAuth}')`,
        }}
      >
        {/* IMAGE OVERLAY */}

        <div className="absolute inset-0 bg-[#3F3155]/65" />

        {/* SOFT PURPLE GLOW */}

        <div
          className="
            absolute
            -top-32
            -right-32
            w-96
            h-96
            rounded-full
            bg-[#DCC9F4]/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -left-32
            w-96
            h-96
            rounded-full
            bg-[#E8DCF5]/20
            blur-3xl
          "
        />

        {/* HERO CONTENT */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-6"
        >
          <p className="uppercase tracking-[6px] text-[10px] text-[#D7B7FF]">
            Roselle
          </p>

          <h1
            className="
              mt-5
              font-['Cormorant_Garamond']
              text-6xl
              md:text-8xl
              leading-none
              text-white
            "
          >
            My Account
          </h1>

          <div className="mt-7 w-14 h-px bg-[#D7B7FF]" />

          <p className="mt-5 text-sm text-white/80">
            Welcome back, {displayName}.
          </p>
        </motion.div>
      </section>

      {/* ACCOUNT */}

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-[1fr_0.65fr] gap-10 lg:gap-16">

          {/* USER CARD */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="
              bg-white
              border
              border-[#E5DCEA]
              p-8
              md:p-10
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-5
                pb-8
                border-b
                border-[#E8E0EE]
              "
            >
              <div className="flex items-center gap-5">
                <div
                  className="
                    w-16
                    h-16
                    rounded-full
                    bg-[#F1E8FA]
                    flex
                    items-center
                    justify-center
                    text-[#9B72D0]
                  "
                >
                  <User size={25} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[3px] text-[#9B72D0]">
                    Member
                  </p>

                  <h2
                    className="
                      mt-1
                      font-['Cormorant_Garamond']
                      text-3xl
                      text-[#514064]
                    "
                  >
                    {displayName}
                  </h2>
                </div>
              </div>

              <ShieldCheck
                size={20}
                className="text-[#B48CF0]"
              />
            </div>

            {/* EMAIL */}

            <div
              className="
                mt-8
                flex
                items-center
                gap-4
                p-5
                bg-[#FAF7FD]
                border
                border-[#EEE6F4]
              "
            >
              <div
                className="
                  w-10
                  h-10
                  bg-[#F1E8FA]
                  flex
                  items-center
                  justify-center
                  text-[#9B72D0]
                "
              >
                <Mail size={17} />
              </div>

              <div>
                <p className="text-[8px] uppercase tracking-[2px] text-[#9B72D0]">
                  Email Address
                </p>

                <p className="mt-1 text-sm text-[#514064]">
                  {email}
                </p>
              </div>
            </div>

            {/* LOGIN METHOD */}

            <div
              className="
                mt-4
                flex
                items-center
                gap-4
                p-5
                border
                border-[#EEE6F4]
              "
            >
              <div
                className="
                  w-10
                  h-10
                  bg-[#F7F1FC]
                  flex
                  items-center
                  justify-center
                "
              >
                <ShieldCheck
                  size={17}
                  className="text-[#9B72D0]"
                />
              </div>

              <div>
                <p className="text-[8px] uppercase tracking-[2px] text-[#9B72D0]">
                  Sign In Method
                </p>

                <p className="mt-1 text-sm text-[#514064]">
                  {provider}
                </p>
              </div>
            </div>

            {/* ACCOUNT STATUS */}

            <div
              className="
                mt-4
                flex
                items-center
                gap-4
                p-5
                border
                border-[#EEE6F4]
              "
            >
              <div
                className="
                  w-10
                  h-10
                  bg-[#F7F1FC]
                  flex
                  items-center
                  justify-center
                "
              >
                <ShieldCheck
                  size={17}
                  className="text-[#9B72D0]"
                />
              </div>

              <div>
                <p className="text-[8px] uppercase tracking-[2px] text-[#9B72D0]">
                  Account Status
                </p>

                <p className="mt-1 text-sm text-[#514064]">
                  Active & Secure
                </p>
              </div>
            </div>

            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="
                mt-8
                w-full
                h-14
                border
                border-[#DCCFE8]
                text-[#665875]
                flex
                items-center
                justify-center
                gap-3
                uppercase
                tracking-[3px]
                text-[10px]
                hover:border-[#B48CF0]
                hover:text-[#9B72D0]
                transition
              "
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </motion.div>

          {/* QUICK LINKS */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="uppercase tracking-[5px] text-[10px] text-[#9B72D0]">
              Your Roselle
            </p>

            <h2
              className="
                mt-3
                font-['Cormorant_Garamond']
                text-4xl
                text-[#514064]
              "
            >
              Explore your account
            </h2>

            <div className="mt-8 space-y-4">

              {/* ORDERS */}

              <button
                onClick={() => navigate("/orders")}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-between
                  border
                  border-[#E5DCEA]
                  bg-white
                  p-6
                  text-left
                  hover:border-[#B48CF0]
                  transition
                "
              >
                <div className="flex items-center gap-5">
                  <ShoppingBag
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#9B72D0]"
                  />

                  <div>
                    <h3 className="font-['Cormorant_Garamond'] text-2xl text-[#514064]">
                      My Orders
                    </h3>

                    <p className="mt-1 text-xs text-[#81768D]">
                      View your jewellery orders.
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={17}
                  className="
                    text-[#9B72D0]
                    group-hover:translate-x-1
                    transition
                  "
                />
              </button>

              {/* WISHLIST */}

              <button
                onClick={() => navigate("/wishlist")}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-between
                  border
                  border-[#E5DCEA]
                  bg-white
                  p-6
                  text-left
                  hover:border-[#B48CF0]
                  transition
                "
              >
                <div className="flex items-center gap-5">
                  <Heart
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#9B72D0]"
                  />

                  <div>
                    <h3 className="font-['Cormorant_Garamond'] text-2xl text-[#514064]">
                      Wishlist
                    </h3>

                    <p className="mt-1 text-xs text-[#81768D]">
                      Keep your favourite pieces close.
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={17}
                  className="
                    text-[#9B72D0]
                    group-hover:translate-x-1
                    transition
                  "
                />
              </button>

              {/* SHOP */}

              <button
                onClick={() => navigate("/shop")}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-between
                  border
                  border-[#E5DCEA]
                  bg-white
                  p-6
                  text-left
                  hover:border-[#B48CF0]
                  transition
                "
              >
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl text-[#514064]">
                    Continue Shopping
                  </h3>

                  <p className="mt-1 text-xs text-[#81768D]">
                    Discover your next Roselle piece.
                  </p>
                </div>

                <ArrowRight
                  size={17}
                  className="
                    text-[#9B72D0]
                    group-hover:translate-x-1
                    transition
                  "
                />
              </button>

            </div>
          </motion.div>
        </div>
      </section>

      {/* BRAND STRIP */}

      <section className="border-y border-[#E7DFF0] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <p className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#514064]">
            Jewellery that becomes part of your story.
          </p>

          <p className="mt-3 text-xs text-[#81768D]">
            Roselle — thoughtfully made, beautifully yours.
          </p>
        </div>
      </section>
    </main>
  );
}

