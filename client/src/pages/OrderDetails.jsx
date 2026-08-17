import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Loader2,
  MapPin,
  Package,
  Phone,
  ReceiptText,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getSingleOrder } from "../config/apis/orderApi";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token) {
        navigate("/auth");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getSingleOrder(id, token);

        setOrder(response.order);
      } catch (error) {
        console.error("Order Details Error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/auth");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Unable to load this order."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, token, navigate]);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

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
            Loading order
          </p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#FAF7FD] flex items-center justify-center px-6">

        <div className="max-w-md text-center">

          <Package
            size={38}
            strokeWidth={1}
            className="mx-auto text-[#9B72D0]"
          />

          <p className="mt-6 uppercase tracking-[4px] text-[10px] text-[#9B72D0]">
            Roselle
          </p>

          <h1
            className="
              mt-3
              font-['Cormorant_Garamond']
              text-5xl
              text-[#514064]
            "
          >
            Order unavailable.
          </h1>

          <p className="mt-4 text-sm text-[#81768D]">
            {error || "We could not find this order."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              bg-[#5E4B7A]
              px-7
              py-4
              text-white
              uppercase
              tracking-[3px]
              text-[10px]
              hover:bg-[#806298]
              transition
            "
          >
            <ArrowLeft size={15} />
            Back to Orders
          </button>

        </div>

      </main>
    );
  }

  const customer = order.customer || {};
  const shipping = order.shippingAddress || {};

  return (
    <main className="min-h-screen bg-[#FAF7FD]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#F3ECFA]">

        <div className="absolute -top-32 -right-24 w-80 h-80 rounded-full bg-[#DCC9F4]/40 blur-3xl" />

        <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-[#E7D9F5]/50 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-24">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <button
              type="button"
              onClick={() => navigate("/orders")}
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

              Back to orders
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
              Order Details
            </h1>

            <p className="mt-6 text-sm text-[#81768D]">
              Order #{order._id}
            </p>

          </motion.div>

        </div>
      </section>

      {/* CONTENT */}

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">

        {/* STATUS */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            bg-white
            border
            border-[#E5DCEA]
            p-6
            md:p-8
          "
        >

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-center gap-4">

              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-[#F1E8FA]
                  flex
                  items-center
                  justify-center
                  text-[#9B72D0]
                "
              >
                <CheckCircle2 size={22} strokeWidth={1.5} />
              </div>

              <div>

                <p className="text-[9px] uppercase tracking-[3px] text-[#9B72D0]">
                  Order status
                </p>

                <h2
                  className="
                    mt-1
                    font-['Cormorant_Garamond']
                    text-3xl
                    text-[#514064]
                  "
                >
                  {order.status || "Pending"}
                </h2>

              </div>

            </div>

            <div className="flex items-center gap-2 text-xs text-[#81768D]">
              <CalendarDays size={15} />
              Placed on {formatDate(order.createdAt)}
            </div>

          </div>

        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 mt-8">

          {/* LEFT */}

          <div className="space-y-8">

            {/* ITEMS */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="
                bg-white
                border
                border-[#E5DCEA]
                p-6
                md:p-8
              "
            >

              <div className="flex items-center gap-3 pb-5 border-b border-[#E9E1EF]">

                <Package
                  size={18}
                  className="text-[#9B72D0]"
                  strokeWidth={1.5}
                />

                <h2
                  className="
                    font-['Cormorant_Garamond']
                    text-3xl
                    text-[#514064]
                  "
                >
                  Your pieces
                </h2>

              </div>

              <div className="mt-6 space-y-6">

                {order.items?.map((item) => (
                  <div
                    key={item._id}
                    className="
                      flex
                      gap-4
                      pb-6
                      border-b
                      border-[#EEE7F3]
                      last:border-0
                      last:pb-0
                    "
                  >

                    <div className="relative w-20 h-24 shrink-0 overflow-hidden bg-[#EDE5F5]">

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#9B72D0]">
                          <Package size={23} strokeWidth={1} />
                        </div>
                      )}

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
                        Roselle Jewellery
                      </p>

                      <h3
                        className="
                          mt-1
                          font-['Cormorant_Garamond']
                          text-2xl
                          text-[#514064]
                        "
                      >
                        {item.productName}
                      </h3>

                      <p className="mt-2 text-xs text-[#81768D]">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-xs text-[#81768D]">
                        Rs.{" "}
                        {Number(item.price).toLocaleString()}
                      </p>

                      <p
                        className="
                          mt-1
                          font-['Cormorant_Garamond']
                          text-2xl
                          text-[#806298]
                        "
                      >
                        Rs.{" "}
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </motion.div>

            {/* CUSTOMER */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="
                bg-white
                border
                border-[#E5DCEA]
                p-6
                md:p-8
              "
            >

              <div className="flex items-center gap-3 pb-5 border-b border-[#E9E1EF]">

                <User
                  size={18}
                  className="text-[#9B72D0]"
                  strokeWidth={1.5}
                />

                <h2
                  className="
                    font-['Cormorant_Garamond']
                    text-3xl
                    text-[#514064]
                  "
                >
                  Customer details
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-5 mt-6">

                <InfoItem
                  label="Name"
                  value={`${customer.firstName || ""} ${customer.lastName || ""}`.trim()}
                />

                <InfoItem
                  label="Email"
                  value={customer.email}
                />

                <InfoItem
                  label="Phone"
                  value={customer.phone}
                  icon={<Phone size={14} />}
                />

              </div>

            </motion.div>

            {/* SHIPPING */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="
                bg-white
                border
                border-[#E5DCEA]
                p-6
                md:p-8
              "
            >

              <div className="flex items-center gap-3 pb-5 border-b border-[#E9E1EF]">

                <MapPin
                  size={18}
                  className="text-[#9B72D0]"
                  strokeWidth={1.5}
                />

                <h2
                  className="
                    font-['Cormorant_Garamond']
                    text-3xl
                    text-[#514064]
                  "
                >
                  Delivery address
                </h2>

              </div>

              <div className="mt-6">

                <p className="text-sm text-[#514064]">
                  {shipping.address}
                </p>

                <p className="mt-2 text-sm text-[#81768D]">
                  {shipping.city} {shipping.postalCode}
                </p>

              </div>

            </motion.div>

          </div>

          {/* RIGHT SUMMARY */}

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
              Order summary
            </p>

            <div className="mt-6 space-y-4">

              <SummaryRow
                label="Subtotal"
                value={`Rs. ${Number(
                  order.subtotal || 0
                ).toLocaleString()}`}
              />

              <SummaryRow
                label="Delivery"
                value={`Rs. ${Number(
                  order.delivery || 0
                ).toLocaleString()}`}
              />

            </div>

            <div className="my-6 h-px bg-[#E5DCEA]" />

            <div className="flex items-end justify-between gap-4">

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
                Rs.{" "}
                {Number(order.total || 0).toLocaleString()}
              </span>

            </div>

            <div className="my-6 h-px bg-[#E5DCEA]" />

            <div className="flex items-start gap-3">

              <ReceiptText
                size={17}
                className="text-[#9B72D0] shrink-0"
              />

              <div>

                <p className="text-[9px] uppercase tracking-[2px] text-[#9B72D0]">
                  Payment method
                </p>

                <p className="mt-1 text-sm text-[#514064]">
                  {order.paymentMethod || "Cash on Delivery"}
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="
                mt-8
                w-full
                h-12
                border
                border-[#DCCFE8]
                text-[#665875]
                uppercase
                tracking-[3px]
                text-[10px]
                hover:border-[#B48CF0]
                hover:text-[#9B72D0]
                transition
              "
            >
              Back to My Orders
            </button>

          </motion.aside>

        </div>

      </section>

    </main>
  );
}

function InfoItem({ label, value, icon }) {
  return (
    <div className="bg-[#FAF7FD] border border-[#EEE6F4] p-4">

      <p className="text-[8px] uppercase tracking-[2px] text-[#9B72D0]">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2 text-sm text-[#514064]">
        {icon}
        <span>{value || "—"}</span>
      </div>

    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">

      <span className="text-[#81768D]">
        {label}
      </span>

      <span className="text-[#514064]">
        {value}
      </span>

    </div>
  );
}