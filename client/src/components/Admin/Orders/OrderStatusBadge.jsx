const statusStyles = {
  Pending: "bg-amber-50 text-amber-600",
  Paid: "bg-emerald-50 text-emerald-600",
  Shipped: "bg-blue-50 text-blue-600",
  Delivered: "bg-[#F0E9F7] text-[#5B3E85]",
  Cancelled: "bg-rose-50 text-rose-500",
};

const OrderStatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${
        statusStyles[status] || "bg-gray-100 text-gray-500"
      }`}
    >
      {status}
    </span>
  );
};

export default OrderStatusBadge;