import { Eye } from "lucide-react";

const placeholderCustomers = [
  { id: 1, name: "Sara Khan", email: "sara.khan@email.com", orders: 5, spent: "₨28,400", joined: "Jan 2026" },
  { id: 2, name: "Ayesha Malik", email: "ayesha.m@email.com", orders: 12, spent: "₨74,900", joined: "Nov 2025" },
  { id: 3, name: "Hina Raza", email: "hina.raza@email.com", orders: 2, spent: "₨9,100", joined: "Jun 2026" },
];

const CustomerTable = ({ customers = placeholderCustomers, onView }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-[#B4A6C4] border-b border-[#F3EEF9]">
            <th className="font-medium px-6 py-4">Customer</th>
            <th className="font-medium px-6 py-4">Orders</th>
            <th className="font-medium px-6 py-4">Total Spent</th>
            <th className="font-medium px-6 py-4">Joined</th>
            <th className="font-medium px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-b border-[#F6F2FA] last:border-0 hover:bg-[#FBF9FD]"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9B6E4] to-[#7B5EA7] flex items-center justify-center text-white text-xs font-medium shrink-0">
                    {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-[#3B2E4A]">{customer.name}</p>
                    <p className="text-xs text-[#9C8AB0]">{customer.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-[#6B5D7B]">{customer.orders}</td>
              <td className="px-6 py-4 text-[#3B2E4A] font-medium">{customer.spent}</td>
              <td className="px-6 py-4 text-[#9C8AB0]">{customer.joined}</td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onView?.(customer)}
                  className="p-1.5 rounded-md hover:bg-[#F3EEF9] text-[#8A7A9B] transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {customers.length === 0 && (
        <div className="text-center py-16 text-[#B4A6C4] text-sm">No customers found.</div>
      )}
    </div>
  );
};

export default CustomerTable;