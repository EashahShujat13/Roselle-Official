const statusStyles = {
  Paid: "bg-emerald-50 text-emerald-600",
  Shipped: "bg-blue-50 text-blue-600",
  Pending: "bg-amber-50 text-amber-600",
  Cancelled: "bg-rose-50 text-rose-600",
};

const placeholderOrders = [
  { id: "#RS1024", customer: "Sara", amount: "₨4,500", status: "Paid" },
  { id: "#RS1023", customer: "Ayesha", amount: "₨6,200", status: "Shipped" },
  { id: "#RS1022", customer: "Hina", amount: "₨3,800", status: "Pending" },
];

const RecentOrders = ({ orders = placeholderOrders }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-medium text-[#3B2E4A]">Recent Orders</p>
        <button className="text-xs text-[#7B5EA7] font-medium hover:underline">
          View all
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-[#B4A6C4]">
            <th className="font-medium pb-3">Order</th>
            <th className="font-medium pb-3">Customer</th>
            <th className="font-medium pb-3">Amount</th>
            <th className="font-medium pb-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-[#F3EEF9]">
              <td className="py-3 text-[#3B2E4A]">{order.id}</td>
              <td className="py-3 text-[#6B5D7B]">{order.customer}</td>
              <td className="py-3 text-[#3B2E4A]">{order.amount}</td>
              <td className="py-3">
                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyles[order.status]}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;