import { X, Mail, ShoppingBag, Wallet } from "lucide-react";

const placeholderOrderHistory = [
  { id: "#RS1024", date: "Sep 10, 2026", total: "₨4,500", status: "Paid" },
  { id: "#RS1019", date: "Aug 22, 2026", total: "₨6,900", status: "Delivered" },
];

const CustomerDetails = ({ open, onClose, customer, orderHistory = placeholderOrderHistory }) => {
  if (!open || !customer) return null;

  return (
    <div className="fixed inset-0 z-30 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#EFE8F5]">
          <h2 className="font-serif text-lg text-[#3B2E4A]">Customer Details</h2>
          <button onClick={onClose} className="text-[#B4A6C4] hover:text-[#5B3E85]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9B6E4] to-[#7B5EA7] flex items-center justify-center text-white font-medium">
              {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="text-[#3B2E4A] font-medium">{customer.name}</p>
              <div className="flex items-center gap-1 text-xs text-[#9C8AB0]">
                <Mail className="w-3 h-3" /> {customer.email}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F6F2FA] rounded-xl p-4">
              <ShoppingBag className="w-4 h-4 text-[#7B5EA7] mb-2" />
              <p className="text-lg font-serif text-[#3B2E4A]">{customer.orders}</p>
              <p className="text-xs text-[#9C8AB0]">Total Orders</p>
            </div>
            <div className="bg-[#F6F2FA] rounded-xl p-4">
              <Wallet className="w-4 h-4 text-[#7B5EA7] mb-2" />
              <p className="text-lg font-serif text-[#3B2E4A]">{customer.spent}</p>
              <p className="text-xs text-[#9C8AB0]">Total Spent</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-[#3B2E4A] mb-3">Order History</p>
            <div className="space-y-2">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#FBF9FD] border border-[#F3EEF9]"
                >
                  <div>
                    <p className="text-sm text-[#3B2E4A]">{order.id}</p>
                    <p className="text-xs text-[#9C8AB0]">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#3B2E4A]">{order.total}</p>
                    <p className="text-xs text-[#7B5EA7]">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;