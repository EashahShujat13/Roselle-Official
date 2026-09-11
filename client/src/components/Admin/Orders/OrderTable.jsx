import { useState } from "react";
import { ChevronDown } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";

const placeholderOrders = [
  {
    id: "#RS1024",
    customer: "Sara Khan",
    date: "Sep 10, 2026",
    total: "₨4,500",
    status: "Paid",
    items: [{ name: "Pearl Bracelet", qty: 1, price: "₨4,500" }],
  },
  {
    id: "#RS1023",
    customer: "Ayesha Malik",
    date: "Sep 9, 2026",
    total: "₨6,200",
    status: "Shipped",
    items: [{ name: "Aura Necklace", qty: 1, price: "₨6,200" }],
  },
  {
    id: "#RS1022",
    customer: "Hina Raza",
    date: "Sep 9, 2026",
    total: "₨3,800",
    status: "Pending",
    items: [{ name: "Pearl Ring", qty: 1, price: "₨3,800" }],
  },
];

const statusOptions = ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"];

const OrderTable = ({ orders = placeholderOrders, onStatusChange }) => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-[#B4A6C4] border-b border-[#F3EEF9]">
            <th className="font-medium px-6 py-4">Order</th>
            <th className="font-medium px-6 py-4">Customer</th>
            <th className="font-medium px-6 py-4">Date</th>
            <th className="font-medium px-6 py-4">Total</th>
            <th className="font-medium px-6 py-4">Status</th>
            <th className="font-medium px-6 py-4 w-10"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const isExpanded = expandedId === order.id;
            return (
              <>
                <tr
                  key={order.id}
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  className="border-b border-[#F6F2FA] last:border-0 hover:bg-[#FBF9FD] cursor-pointer"
                >
                  <td className="px-6 py-4 text-[#3B2E4A] font-medium">{order.id}</td>
                  <td className="px-6 py-4 text-[#6B5D7B]">{order.customer}</td>
                  <td className="px-6 py-4 text-[#9C8AB0]">{order.date}</td>
                  <td className="px-6 py-4 text-[#3B2E4A]">{order.total}</td>
                  <td className="px-6 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4">
                    <ChevronDown
                      className={`w-4 h-4 text-[#B4A6C4] transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </td>
                </tr>

                {isExpanded && (
                  <tr className="bg-[#FBF9FD] border-b border-[#F6F2FA]">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          {order.items.map((item, i) => (
                            <p key={i} className="text-sm text-[#6B5D7B]">
                              {item.qty}× {item.name} — {item.price}
                            </p>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#9C8AB0]">Update status:</span>
                          <select
                            value={order.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => onStatusChange?.(order, e.target.value)}
                            className="text-sm px-2 py-1.5 rounded-lg bg-white border border-[#E8E1F0] outline-none"
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className="text-center py-16 text-[#B4A6C4] text-sm">No orders found.</div>
      )}
    </div>
  );
};

export default OrderTable;