
import { useState } from "react";
import { Search } from "lucide-react";
import CustomerTable from "../../components/Admin/Customers/CustomerTable";
import CustomerDetails from "../../components/Admin/Customers/CustomerDetails";

const AdminCustomers = () => {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setDetailsOpen(true);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-[#3B2E4A]">Customers</h1>
          <p className="text-sm text-[#9C8AB0] mt-1">View and manage your customers.</p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-[#B4A6C4] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="pl-9 pr-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none transition-colors w-64 placeholder:text-[#B4A6C4]"
          />
        </div>
      </div>

      <CustomerTable onView={handleView} />

      <CustomerDetails
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default AdminCustomers;