import { Copy, Trash2 } from "lucide-react";

const placeholderCoupons = [
  { id: 1, code: "ROSELLE20", type: "Percentage", value: "20%", used: 34, limit: 100, status: "Active", expires: "Oct 31, 2026" },
  { id: 2, code: "WELCOME10", type: "Percentage", value: "10%", used: 212, limit: null, status: "Active", expires: "No expiry" },
  { id: 3, code: "EIDSALE", type: "Fixed", value: "₨500", used: 88, limit: 88, status: "Expired", expires: "Jul 15, 2026" },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  Expired: "bg-gray-100 text-gray-500",
};

const CouponTable = ({ coupons = placeholderCoupons, onDelete }) => {
  const handleCopy = (code) => navigator.clipboard.writeText(code);

  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-[#B4A6C4] border-b border-[#F3EEF9]">
            <th className="font-medium px-6 py-4">Code</th>
            <th className="font-medium px-6 py-4">Discount</th>
            <th className="font-medium px-6 py-4">Usage</th>
            <th className="font-medium px-6 py-4">Expires</th>
            <th className="font-medium px-6 py-4">Status</th>
            <th className="font-medium px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id} className="border-b border-[#F6F2FA] last:border-0 hover:bg-[#FBF9FD]">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#3B2E4A] bg-[#F6F2FA] px-2 py-1 rounded-md text-xs">
                    {coupon.code}
                  </span>
                  <button onClick={() => handleCopy(coupon.code)} className="text-[#B4A6C4] hover:text-[#7B5EA7]">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 text-[#3B2E4A]">{coupon.value}</td>
              <td className="px-6 py-4 text-[#6B5D7B]">
                {coupon.used}{coupon.limit ? ` / ${coupon.limit}` : ""}
              </td>
              <td className="px-6 py-4 text-[#9C8AB0]">{coupon.expires}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyles[coupon.status]}`}>
                  {coupon.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onDelete?.(coupon)}
                  className="p-1.5 rounded-md hover:bg-rose-50 text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponTable;