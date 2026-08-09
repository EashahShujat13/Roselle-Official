import {
  Heart,
  ShoppingBag,
  Menu,
  X,
  UserRound,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllCategories } from "../../config/apis/categoryApi";

export default function CategoryNav() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [userName, setUserName] = useState("");

  const token = localStorage.getItem("token");

  // Exclude any category coming from the API that duplicates
  // the hardcoded "New Arrivals" link below (case-insensitive),
  // so it only ever renders once.
  const visibleCategories = categories.filter(
    (category) =>
      category?.categoryName?.trim().toLowerCase() !== "new arrivals"
  );

  // ==================================================
  // SCROLL EFFECT
  // ==================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ==================================================
  // FETCH CATEGORIES
  // ==================================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();

        setCategories(response?.categories || []);
      } catch (error) {
        console.error("Category fetch error:", error);

        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // ==================================================
  // GET LOGGED-IN USER
  // ==================================================

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setUserName("");
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      setUserName(
        user?.fullname ||
        user?.fullName ||
        ""
      );
    } catch (error) {
      console.error("User data error:", error);

      setUserName("");
    }
  }, [token]);

  // ==================================================
  // CLOSE MENU ON ROUTE NAVIGATION
  // ==================================================

  const openCategory = (categoryName) => {
    navigate(
      `/shop?category=${encodeURIComponent(categoryName)}`
    );

    setOpen(false);
  };

  const openShop = () => {
    navigate("/shop");

    setOpen(false);
  };

  const openCart = () => {
    navigate("/cart");

    setOpen(false);
  };

  const openAccount = () => {
    navigate(token ? "/profile" : "/auth");

    setOpen(false);
  };

  // ==================================================
  // LOCK BODY WHEN MOBILE MENU OPEN
  // ==================================================

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ==================================================
          SPACER
      ================================================== */}

      {scrolled && (
        <div className="h-[64px] lg:h-[66px]" />
      )}

      {/* ==================================================
          CATEGORY NAV
      ================================================== */}

      <nav
        className={`
          w-full
          z-[60]

          bg-[#FCFAFF]/95
          backdrop-blur-xl

          border-b
          border-[#E8DEEF]

          transition-all
          duration-500

          ${
            scrolled
              ? `
                fixed
                top-0
                left-0
                right-0

                shadow-[0_8px_30px_rgba(81,64,100,0.10)]
              `
              : `
                relative
                shadow-[0_2px_10px_rgba(81,64,100,0.04)]
              `
          }
        `}
      >

        {/* ==================================================
            DESKTOP
        ================================================== */}

        <div
          className="
            hidden
            lg:flex

            h-[66px]

            max-w-7xl
            mx-auto

            px-8

            items-center
            justify-between
          "
        >

          {/* ==================================================
              LEFT SIDE
          ================================================== */}

          <div className="flex items-center gap-6">

            {/* DYNAMIC CATEGORIES */}

            {visibleCategories.map((category, index) => (
              <div
                key={category._id}
                className="
                  flex
                  items-center
                  gap-6
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    openCategory(
                      category.categoryName
                    )
                  }
                  className="
                    relative

                    text-[10px]
                    uppercase
                    tracking-[2px]

                    text-[#655B75]

                    transition-all
                    duration-300

                    hover:text-[#B48CF0]

                    after:absolute
                    after:left-0
                    after:-bottom-2

                    after:h-px
                    after:w-0

                    after:bg-[#B48CF0]

                    after:transition-all
                    after:duration-300

                    hover:after:w-full
                  "
                >
                  {category.categoryName}
                </button>

                {index < visibleCategories.length - 1 && (
                  <span className="text-[#DDD4E5]">
                    |
                  </span>
                )}

              </div>
            ))}

            {/* SEPARATOR */}

            {visibleCategories.length > 0 && (
              <span className="text-[#DDD4E5]">
                |
              </span>
            )}

            {/* NEW ARRIVALS */}

            <button
              type="button"
              onClick={openShop}
              className="
                relative

                text-[10px]
                uppercase
                tracking-[2px]

                text-[#655B75]

                transition-all
                duration-300

                hover:text-[#B48CF0]

                after:absolute
                after:left-0
                after:-bottom-2

                after:h-px
                after:w-0

                after:bg-[#B48CF0]

                after:transition-all
                after:duration-300

                hover:after:w-full
              "
            >
              New Arrivals
            </button>

          </div>

          {/* ==================================================
              RIGHT SIDE
          ================================================== */}

          <div
            className="
              flex
              items-center
              gap-6
            "
          >

            {/* ==================================================
                WISHLIST
            ================================================== */}

            <button
              type="button"
              onClick={() =>
                navigate("/wishlist")
              }
              aria-label="Wishlist"
              className="
                group

                flex
                items-center
                justify-center

                text-[#655B75]

                transition-all
                duration-300

                hover:text-[#B48CF0]
              "
            >

              <Heart
                size={18}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300

                  group-hover:scale-110
                "
              />

            </button>

            {/* ==================================================
                CART
            ================================================== */}

            <button
              type="button"
              onClick={openCart}
              aria-label="Shopping bag"
              className="
                group

                flex
                items-center
                justify-center

                text-[#655B75]

                transition-all
                duration-300

                hover:text-[#B48CF0]
              "
            >

              <ShoppingBag
                size={18}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300

                  group-hover:scale-110
                "
              />

            </button>

            {/* ==================================================
                ACCOUNT
            ================================================== */}

            <button
              type="button"
              onClick={openAccount}
              aria-label={
                token
                  ? "Account"
                  : "Login"
              }
              className="
                group

                flex
                items-center
                gap-2.5

                text-[#655B75]

                transition-all
                duration-300

                hover:text-[#B48CF0]
              "
            >

              <UserRound
                size={18}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300

                  group-hover:scale-110
                "
              />

              {/* LOGGED IN USER NAME */}

              {token && userName && (
                <span
                  className="
                    max-w-[110px]

                    truncate

                    text-[10px]
                    uppercase
                    tracking-[1.5px]

                    text-[#655B75]

                    group-hover:text-[#B48CF0]

                    transition-colors
                    duration-300
                  "
                >
                  {userName}
                </span>
              )}

            </button>

          </div>

        </div>

        {/* ==================================================
            MOBILE NAV
        ================================================== */}

        <div
          className="
            lg:hidden

            relative

            h-[64px]
            w-full

            px-5

            flex
            items-center
            justify-between

            bg-[#FCFAFF]
          "
        >

          {/* MENU */}

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="
              group

              flex
              h-10
              w-10

              items-center
              justify-center

              rounded-full

              text-[#5E4B7A]

              transition-all
              duration-300

              hover:bg-[#F3ECFA]
              hover:text-[#9B72D0]

              active:scale-95
            "
          >

            <Menu
              size={22}
              strokeWidth={1.5}
            />

          </button>

          {/* CENTER DECORATIVE LINE */}

          <div
            className="
              absolute

              left-1/2
              -translate-x-1/2

              h-px
              w-14

              bg-gradient-to-r
              from-transparent
              via-[#D7B7FF]
              to-transparent

              pointer-events-none
            "
          />

          {/* CART */}

          <button
            type="button"
            onClick={openCart}
            aria-label="Shopping bag"
            className="
              group

              flex
              h-10
              w-10

              items-center
              justify-center

              rounded-full

              text-[#5E4B7A]

              transition-all
              duration-300

              hover:bg-[#F3ECFA]
              hover:text-[#9B72D0]

              active:scale-95
            "
          >

            <ShoppingBag
              size={21}
              strokeWidth={1.5}
            />

          </button>

        </div>

      </nav>

      {/* ==================================================
          MOBILE DRAWER
      ================================================== */}

      {open && (
        <div
          className="
            fixed
            inset-0

            z-[100]

            flex
            lg:hidden

            bg-[#3E3150]/35

            backdrop-blur-[3px]
          "
          onClick={() => setOpen(false)}
        >

          {/* ==================================================
              DRAWER
          ================================================== */}

          <aside
            className="
              relative

              h-full

              w-[320px]
              max-w-[88vw]

              bg-[#FCFAFF]

              border-r
              border-[#E7DDED]

              shadow-[15px_0_50px_rgba(60,40,80,0.16)]

              overflow-y-auto

              px-7
              pt-7
              pb-10

              animate-[slideIn_0.35s_ease-out]
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ==================================================
                DRAWER HEADER
            ================================================== */}

            <div
              className="
                flex
                items-center
                justify-between

                pb-6

                border-b
                border-[#E8DDED]
              "
            >

              <div>

                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[4px]

                    text-[#9B72D0]
                  "
                >
                  Roselle
                </p>

                <p
                  className="
                    mt-1

                    font-['Cormorant_Garamond']

                    text-[23px]
                    tracking-[2px]

                    text-[#514064]
                  "
                >
                  Collections
                </p>

              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                aria-label="Close menu"
                className="
                  flex
                  h-10
                  w-10

                  items-center
                  justify-center

                  rounded-full

                  text-[#655B75]

                  transition-all
                  duration-300

                  hover:bg-[#F3ECFA]
                  hover:text-[#9B72D0]

                  active:scale-95
                "
              >

                <X
                  size={20}
                  strokeWidth={1.5}
                />

              </button>

            </div>

            {/* ==================================================
                MAIN MENU
            ================================================== */}

            <div className="mt-9">

              {/* CATEGORIES */}

              <div className="space-y-1">

                {visibleCategories.map(
                  (category) => (
                    <button
                      key={category._id}
                      type="button"
                      onClick={() =>
                        openCategory(
                          category.categoryName
                        )
                      }
                      className="
                        group

                        flex
                        w-full

                        items-center
                        justify-between

                        py-3

                        text-left

                        font-['Cormorant_Garamond']

                        text-[24px]

                        text-[#514064]

                        transition-all
                        duration-300

                        hover:pl-2
                        hover:text-[#9B72D0]
                      "
                    >

                      <span>
                        {
                          category.categoryName
                        }
                      </span>

                      <span
                        className="
                          text-base
                          text-[#B48CF0]

                          opacity-0
                          -translate-x-1

                          transition-all
                          duration-300

                          group-hover:opacity-100
                          group-hover:translate-x-0
                        "
                      >
                        →
                      </span>

                    </button>
                  )
                )}

              </div>

              {/* ==================================================
                  NEW ARRIVALS
              ================================================== */}

              <button
                type="button"
                onClick={openShop}
                className="
                  group

                  mt-5

                  flex
                  w-full

                  items-center
                  justify-between

                  pt-5

                  border-t
                  border-[#EEE7F3]

                  text-left

                  font-['Cormorant_Garamond']

                  text-[24px]

                  text-[#514064]

                  transition-all
                  duration-300

                  hover:text-[#9B72D0]
                "
              >

                <span>
                  New Arrivals
                </span>

                <span
                  className="
                    text-base
                    text-[#B48CF0]

                    opacity-0
                    -translate-x-1

                    transition-all
                    duration-300

                    group-hover:opacity-100
                    group-hover:translate-x-0
                  "
                >
                  →
                </span>

              </button>

            </div>

            {/* ==================================================
                ACCOUNT LINKS
            ================================================== */}

            <div
              className="
                mt-12

                border-t
                border-[#E6DDED]

                pt-7

                space-y-5
              "
            >

              {/* WISHLIST */}

              <button
                type="button"
                onClick={() => {
                  navigate("/wishlist");
                  setOpen(false);
                }}
                className="
                  flex
                  w-full

                  items-center
                  gap-3

                  text-left

                  text-[10px]
                  uppercase
                  tracking-[2px]

                  text-[#655B75]

                  transition-all
                  duration-300

                  hover:text-[#9B72D0]
                "
              >

                <Heart
                  size={16}
                  strokeWidth={1.5}
                />

                Wishlist

              </button>

              {/* ACCOUNT */}

              <button
                type="button"
                onClick={openAccount}
                className="
                  flex
                  w-full

                  items-center
                  gap-3

                  text-left

                  text-[10px]
                  uppercase
                  tracking-[2px]

                  text-[#655B75]

                  transition-all
                  duration-300

                  hover:text-[#9B72D0]
                "
              >

                <UserRound
                  size={16}
                  strokeWidth={1.5}
                />

                {token
                  ? userName || "Account"
                  : "Login"}

              </button>

              {/* SHOPPING BAG */}

              <button
                type="button"
                onClick={openCart}
                className="
                  flex
                  w-full

                  items-center
                  gap-3

                  text-left

                  text-[10px]
                  uppercase
                  tracking-[2px]

                  text-[#655B75]

                  transition-all
                  duration-300

                  hover:text-[#9B72D0]
                "
              >

                <ShoppingBag
                  size={16}
                  strokeWidth={1.5}
                />

                Shopping Bag

              </button>

            </div>

            {/* ==================================================
                BOTTOM BRAND
            ================================================== */}

            <div
              className="
                mt-16

                border-t
                border-[#E6DDED]

                pt-7

                text-center
              "
            >

              <p
                className="
                  font-['Cormorant_Garamond']

                  text-2xl

                  tracking-[5px]

                  text-[#5E4B7A]
                "
              >
                ROSELLE
              </p>

              <p
                className="
                  mt-2

                  text-[8px]
                  uppercase
                  tracking-[3px]

                  text-[#9A8BA6]
                "
              >
                Jewellery with intention
              </p>

            </div>

          </aside>

        </div>
      )}

      {/* ==================================================
          DRAWER ANIMATION
      ================================================== */}

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }

            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}
