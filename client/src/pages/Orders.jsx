import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Loader2,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyOrders } from "../config/apis/orderApi";

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        navigate("/auth");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getMyOrders(token);

        setOrders(response.orders || []);
      } catch (error) {
        console.error("Orders Error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/auth");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Unable to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, navigate]);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-[#EEF7F1] text-[#557A62]";

      case "shipped":
        return "bg-[#F1EAF9] text-[#806298]";

      case "cancelled":
        return "bg-[#FAEEEE] text-[#A56D6D]";

      default:
        return "bg-[#F8F2FC] text-[#9B72D0]";
    }
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
            Loading your orders
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7FD]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#F3ECFA]">

        <div className="absolute -top-32 -right-24 w-80 h-80 rounded-full bg-[#DCC9F4]/40 blur-3xl" />

        <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-[#E7D9F5]/50 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <button
              type="button"
              onClick={() => navigate("/profile")}
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

              Back to account
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
              My Orders
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#81768D]">
              Keep track of your Roselle pieces and follow every
              order from preparation to delivery.
            </p>

          </motion.div>

        </div>
      </section>

      {/* ORDERS */}

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">

        {error && (
          <div className="mb-8 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="
              bg-white
              border
              border-[#E5DCEA]
              px-6
              py-20
              text-center
            "
          >

            <ShoppingBag
              size={38}
              strokeWidth={1}
              className="mx-auto text-[#9B72D0]"
            />

            <p className="mt-7 uppercase tracking-[5px] text-[10px] text-[#9B72D0]">
              Your Roselle
            </p>

            <h2
              className="
                mt-3
                font-['Cormorant_Garamond']
                text-5xl
                text-[#514064]
              "
            >
              No orders yet.
            </h2>

            <p className="mt-4 text-sm text-[#81768D]">
              Your beautiful Roselle pieces will appear here
              after you place an order.
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="
                mt-8
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
              <ArrowRight size={15} />
            </button>

          </motion.div>
        ) : (
          <div className="space-y-6">

            <div className="flex items-end justify-between gap-5 mb-8">

              <div>
                <p className="uppercase tracking-[4px] text-[10px] text-[#9B72D0]">
                  Your history
                </p>

                <h2
                  className="
                    mt-2
                    font-['Cormorant_Garamond']
                    text-4xl
                    md:text-5xl
                    text-[#514064]
                  "
                >
                  Your orders
                </h2>
              </div>

              <span className="text-[10px] uppercase tracking-[2px] text-[#81768D]">
                {orders.length}{" "}
                {orders.length === 1 ? "order" : "orders"}
              </span>

            </div>

            {orders.map((order, index) => {

              const firstItem = order.items?.[0];

              const itemCount =
                order.items?.reduce(
                  (total, item) =>
                    total + Number(item.quantity || 0),
                  0
                ) || 0;

              const additionalItems =
                order.items?.length > 1
                  ? order.items.length - 1
                  : 0;

              return (
                <motion.article
                  key={order._id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="
                    bg-white
                    border
                    border-[#E5DCEA]
                    p-6
                    md:p-8
                  "
                >

                  {/* TOP */}

                  <div
                    className="
                      flex
                      flex-col
                      md:flex-row
                      md:items-center
                      md:justify-between
                      gap-5
                      pb-6
                      border-b
                      border-[#E9E1EF]
                    "
                  >

                    <div>

                      <p className="text-[9px] uppercase tracking-[3px] text-[#9B72D0]">
                        Order
                      </p>

                      <p className="mt-1 text-xs text-[#514064] break-all">
                        #{order._id}
                      </p>

                    </div>

                    <div className="flex flex-wrap items-center gap-4">

                      <div className="flex items-center gap-2 text-[10px] text-[#81768D]">
                        <CalendarDays size={14} />
                        {formatDate(order.createdAt)}
                      </div>

                      <span
                        className={`
                          px-3
                          py-1.5
                          text-[9px]
                          uppercase
                          tracking-[2px]
                          ${getStatusClass(order.status)}
                        `}
                      >
                        {order.status || "Pending"}
                      </span>

                    </div>

                  </div>

                  {/* BODY */}

                  <div className="mt-7 flex flex-col md:flex-row gap-6">

                    {/* IMAGE */}

                    <div className="relative w-24 h-28 shrink-0 overflow-hidden bg-[#EDE5F5]">

                      {firstItem?.image ? (
                        <img
                          src={firstItem.image}
                          alt={firstItem.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#9B72D0]">
                          <Package size={25} strokeWidth={1} />
                        </div>
                      )}

                      {firstItem?.quantity > 1 && (
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
                          {firstItem.quantity}
                        </span>
                      )}

                    </div>

                    {/* PRODUCT INFO */}

                    <div className="flex-1 min-w-0">

                      <p className="text-[9px] uppercase tracking-[2px] text-[#9B72D0]">
                        Roselle Jewellery
                      </p>

                      <h3
                        className="
                          mt-2
                          font-['Cormorant_Garamond']
                          text-3xl
                          text-[#514064]
                        "
                      >
                        {firstItem?.productName || "Roselle Order"}
                      </h3>

                      <p className="mt-2 text-xs text-[#81768D]">
                        {itemCount}{" "}
                        {itemCount === 1 ? "piece" : "pieces"}
                      </p>

                      {additionalItems > 0 && (
                        <p className="mt-1 text-[10px] text-[#9B72D0]">
                          + {additionalItems} more{" "}
                          {additionalItems === 1
                            ? "item"
                            : "items"}
                        </p>
                      )}

                    </div>

                    {/* TOTAL */}

                    <div className="md:text-right md:min-w-[150px]">

                      <p className="text-[9px] uppercase tracking-[2px] text-[#81768D]">
                        Order total
                      </p>

                      <p
                        className="
                          mt-2
                          font-['Cormorant_Garamond']
                          text-4xl
                          text-[#806298]
                        "
                      >
                        Rs.{" "}
                        {Number(order.total || 0).toLocaleString()}
                      </p>

                    </div>

                  </div>

                  {/* FOOTER */}

                  <div
                    className="
                      mt-7
                      pt-6
                      border-t
                      border-[#E9E1EF]
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-4
                    "
                  >

                    <div>
                      <p className="text-[9px] uppercase tracking-[2px] text-[#81768D]">
                        Payment
                      </p>

                      <p className="mt-1 text-xs text-[#514064]">
                        {order.paymentMethod || "Cash on Delivery"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/orders/${order._id}`)
                      }
                      className="
                        group
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        border
                        border-[#DCCFE8]
                        px-6
                        py-3
                        text-[9px]
                        uppercase
                        tracking-[3px]
                        text-[#665875]
                        hover:border-[#B48CF0]
                        hover:text-[#9B72D0]
                        transition
                      "
                    >
                      View Order
                      <ChevronRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>

                  </div>

                </motion.article>
              );
            })}

          </div>
        )}

      </section>

    </main>
  );
}