import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Lock,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { createOrder } from "../config/apis/orderApi";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    cartTotal,
    clearCart,
  } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  const itemCount = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
      ),
    [cart]
  );

  const delivery = cartTotal > 0 ? 250 : 0;

  const grandTotal = cartTotal + delivery;

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // FORM VALIDATION
  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Delivery address is required.";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!form.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // PLACE ORDER
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Get logged-in user's JWT token
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login before placing your order.");
        navigate("/auth");
        return;
      }

      // Prepare order data according to backend Order model
      const orderData = {
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
        },

        shippingAddress: {
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
        },

        items: cart.map((item) => ({
          product: item._id,
          productName: item.productName,
          price: Number(item.price),
          quantity: Number(item.quantity),
          image: item.images?.[0] || "",
        })),

        subtotal: cartTotal,

        delivery,

        total: grandTotal,

        paymentMethod: "Cash on Delivery",
      };

      // Send order to backend
      const response = await createOrder(
        orderData,
        token
      );

      console.log("Order Created Successfully:", response);

      // Clear cart after successful order
      clearCart();

      // Show success screen
      setOrderPlaced(true);
    } catch (error) {
      console.error("Place Order Error:", error);

      // Token expired / invalid
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert(
          "Your session has expired. Please login again."
        );

        navigate("/auth");

        return;
      }

      alert(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // EMPTY CART
  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen bg-[#FCFAFF]">
        <section className="relative overflow-hidden bg-[#F3ECFA]">
          <div className="absolute -top-32 -right-24 w-80 h-80 rounded-full bg-[#DCC9F4]/40 blur-3xl" />

          <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-[#E7D9F5]/50 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="uppercase tracking-[6px] text-[10px] text-[#9B72D0]">
                Roselle
              </p>

              <h1
                className="
                  mt-5
                  font-['Cormorant_Garamond']
                  text-6xl
                  md:text-8xl
                  leading-[0.85]
                  text-[#514064]
                "
              >
                Checkout
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#81768D]">
                Your bag is waiting for a beautiful piece.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-28 text-center">
          <ShoppingBag
            size={38}
            strokeWidth={1}
            className="mx-auto text-[#9B72D0]"
          />

          <h2
            className="
              mt-7
              font-['Cormorant_Garamond']
              text-5xl
              md:text-6xl
              text-[#514064]
            "
          >
            Nothing to checkout yet.
          </h2>

          <p className="mt-4 text-sm text-[#81768D]">
            Add something beautiful to your Roselle bag first.
          </p>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="
              mt-9
              inline-flex
              items-center
              gap-3
              bg-[#5E4B7A]
              px-8
              py-4
              text-white
              uppercase
              tracking-[3px]
              text-[10px]
              hover:bg-[#806298]
              transition
            "
          >
            Explore Collection
          </button>
        </section>
      </main>
    );
  }

  // SUCCESS
  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-[#FCFAFF] flex items-center justify-center px-6">
        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl text-center"
        >
          <div
            className="
              mx-auto
              w-16
              h-16
              rounded-full
              bg-[#E9DDF5]
              flex
              items-center
              justify-center
              text-[#806298]
            "
          >
            <Check size={27} />
          </div>

          <p className="mt-8 uppercase tracking-[6px] text-[10px] text-[#9B72D0]">
            Roselle
          </p>

          <h1
            className="
              mt-5
              font-['Cormorant_Garamond']
              text-6xl
              md:text-7xl
              text-[#514064]
            "
          >
            Order received.
          </h1>

          <p className="mt-5 text-sm leading-7 text-[#81768D]">
            Thank you for choosing Roselle. Your order details
            have been received and your jewellery is being
            prepared with care.
          </p>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="
              mt-9
              inline-flex
              items-center
              gap-3
              border-b
              border-[#B48CF0]
              pb-2
              text-[10px]
              uppercase
              tracking-[3px]
              text-[#514064]
              hover:text-[#B48CF0]
              transition
            "
          >
            Continue Shopping
            <ArrowLeft size={14} />
          </button>
        </motion.section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFAFF]">
      {/* HERO */}

      <section className="relative overflow-hidden bg-[#F3ECFA]">
        <div className="absolute -top-32 -right-24 w-80 h-80 rounded-full bg-[#DCC9F4]/40 blur-3xl" />

        <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-[#E7D9F5]/50 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="
                group
                inline-flex
                items-center
                gap-2
                text-[9px]
                uppercase
                tracking-[3px]
                text-[#756982]
                hover:text-[#B48CF0]
                transition
              "
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />

              Back to bag
            </button>

            <p className="mt-12 uppercase tracking-[6px] text-[10px] text-[#9B72D0]">
              Roselle
            </p>

            <h1
              className="
                mt-4
                font-['Cormorant_Garamond']
                text-6xl
                md:text-8xl
                leading-[0.85]
                text-[#514064]
              "
            >
              Checkout
            </h1>

            <p className="mt-6 text-sm text-[#81768D]">
              Complete your details and make your Roselle selection yours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-[1fr_390px] gap-14 lg:gap-20">
          {/* FORM */}

          <motion.form
            onSubmit={handlePlaceOrder}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* CONTACT */}

            <div>
              <div className="flex items-end justify-between border-b border-[#E5DCEA] pb-4">
                <div>
                  <p className="uppercase tracking-[4px] text-[10px] text-[#9B72D0]">
                    01
                  </p>

                  <h2
                    className="
                      mt-2
                      font-['Cormorant_Garamond']
                      text-3xl
                      md:text-4xl
                      text-[#514064]
                    "
                  >
                    Contact details
                  </h2>
                </div>

                <Lock
                  size={15}
                  className="text-[#9B72D0]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5 mt-7">
                <InputField
                  label="First name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />

                <InputField
                  label="Last name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />

                <InputField
                  label="Email address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <InputField
                  label="Phone number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
              </div>
            </div>

            {/* DELIVERY */}

            <div className="mt-14">
              <div className="border-b border-[#E5DCEA] pb-4">
                <p className="uppercase tracking-[4px] text-[10px] text-[#9B72D0]">
                  02
                </p>

                <h2
                  className="
                    mt-2
                    font-['Cormorant_Garamond']
                    text-3xl
                    md:text-4xl
                    text-[#514064]
                  "
                >
                  Delivery details
                </h2>
              </div>

              <div className="mt-7 space-y-5">
                <InputField
                  label="Delivery address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  error={errors.address}
                />

                <div className="grid md:grid-cols-2 gap-5">
                  <InputField
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    error={errors.city}
                  />

                  <InputField
                    label="Postal code"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    error={errors.postalCode}
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT */}

            <div className="mt-14">
              <div className="border-b border-[#E5DCEA] pb-4">
                <p className="uppercase tracking-[4px] text-[10px] text-[#9B72D0]">
                  03
                </p>

                <h2
                  className="
                    mt-2
                    font-['Cormorant_Garamond']
                    text-3xl
                    md:text-4xl
                    text-[#514064]
                  "
                >
                  Payment
                </h2>
              </div>

              <div
                className="
                  mt-7
                  border
                  border-[#E5DCEA]
                  bg-white
                  p-5
                  flex
                  items-center
                  justify-between
                  gap-5
                "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                      w-10
                      h-10
                      bg-[#F3ECFA]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <MapPin
                      size={17}
                      className="text-[#806298]"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-[#514064]">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-[10px] text-[#81768D]">
                      Pay when your order arrives.
                    </p>
                  </div>
                </div>

                <span
                  className="
                    w-4
                    h-4
                    rounded-full
                    border-[5px]
                    border-[#9B72D0]
                  "
                />
              </div>
            </div>

            {/* PLACE ORDER */}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-10
                w-full
                h-14
                bg-[#5E4B7A]
                text-white
                uppercase
                tracking-[3px]
                text-[10px]
                hover:bg-[#806298]
                transition
                flex
                items-center
                justify-center
                gap-3
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              <Lock size={14} />

              {loading ? "Placing Order..." : "Place Order"}
            </button>

            <p className="mt-4 text-center text-[10px] leading-5 text-[#9A909F]">
              Your information is handled securely and used only
              to process your Roselle order.
            </p>
          </motion.form>

          {/* SUMMARY */}

          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="
              h-fit
              bg-white
              border
              border-[#E5DCEA]
              p-6
              md:p-8
              lg:sticky
              lg:top-28
            "
          >
            <p className="uppercase tracking-[4px] text-[10px] text-[#9B72D0]">
              Your selection
            </p>

            <div className="mt-3 flex items-end justify-between gap-4">
              <h2
                className="
                  font-['Cormorant_Garamond']
                  text-3xl
                  text-[#514064]
                "
              >
                Order Summary
              </h2>

              <span className="text-[10px] text-[#81768D]">
                {itemCount}{" "}
                {itemCount === 1 ? "piece" : "pieces"}
              </span>
            </div>

            {/* ITEMS */}

            <div className="mt-8 space-y-5">
              {cart.map((item) => {
                const image =
                  item.images?.[0] ||
                  "https://placehold.co/500x600/F0E8F7/5E4B7A?text=Roselle";

                return (
                  <div
                    key={item._id}
                    className="flex gap-4"
                  >
                    <div className="relative w-20 h-24 shrink-0 overflow-hidden bg-[#EDE5F5]">
                      <img
                        src={image}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />

                      <span
                        className="
                          absolute
                          top-1
                          right-1
                          min-w-5
                          h-5
                          px-1
                          bg-white/95
                          flex
                          items-center
                          justify-center
                          text-[9px]
                          text-[#514064]
                        "
                      >
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] uppercase tracking-[2px] text-[#9B72D0]">
                        {item.category || "Roselle"}
                      </p>

                      <h3
                        className="
                          mt-1
                          font-['Cormorant_Garamond']
                          text-xl
                          text-[#514064]
                          truncate
                        "
                      >
                        {item.productName}
                      </h3>

                      <p className="mt-2 text-xs text-[#806298]">
                        Rs.{" "}
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="my-7 h-px bg-[#E5DCEA]" />

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-[#81768D]">
                <span>Subtotal</span>

                <span>
                  Rs. {cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-[#81768D]">
                <span>Delivery</span>

                <span>
                  Rs. {delivery.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="my-7 h-px bg-[#E5DCEA]" />

            <div className="flex items-end justify-between">
              <span className="uppercase tracking-[2px] text-[10px] text-[#514064]">
                Total
              </span>

              <span
                className="
                  font-['Cormorant_Garamond']
                  text-4xl
                  text-[#806298]
                "
              >
                Rs. {grandTotal.toLocaleString()}
              </span>
            </div>

            <div className="mt-7 bg-[#F8F4FC] p-5">
              <div className="flex gap-3">
                <SparkleIcon />

                <div>
                  <p className="text-[10px] uppercase tracking-[2px] text-[#514064]">
                    A Roselle experience
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-[#81768D]">
                    Every piece is carefully prepared
                    before making its way to you.
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}


// INPUT COMPONENT

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          block
          mb-2
          text-[9px]
          uppercase
          tracking-[2px]
          text-[#756982]
        "
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`
          w-full
          h-12
          px-4
          bg-white
          border
          outline-none
          text-sm
          text-[#514064]
          placeholder:text-[#AAA0B3]
          transition
          ${
            error
              ? "border-red-300"
              : "border-[#E4DAED] focus:border-[#B48CF0]"
          }
        `}
      />

      {error && (
        <p className="mt-2 text-[10px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}


// SMALL ICON

function SparkleIcon() {
  return (
    <div
      className="
        w-9
        h-9
        shrink-0
        bg-white
        flex
        items-center
        justify-center
        text-[#9B72D0]
      "
    >
      <span className="text-sm">✦</span>
    </div>
  );
}