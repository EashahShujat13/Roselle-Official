import { DollarSign, ShoppingBag, Users } from "lucide-react";
import StatCard from "../../components/Admin/Dashboard/StatCard";
import RevenueChart from "../../components/Admin/Dashboard/RevenueChart";
import TopProducts from "../../components/Admin/Dashboard/TopProducts";
import RecentOrders from "../../components/Admin/Dashboard/RecentOrders";
import StorePulse from "../../components/Admin/Dashboard/StorePulse";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-[#3B2E4A]">Good evening, Admin</h1>
        <p className="text-sm text-[#9C8AB0] mt-1">Here's what's happening today. Have a great day!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard label="Revenue" value="₨248,000" change="+18.4%" trend="up" icon={DollarSign} />
        <StatCard label="Orders" value="128" change="+8.2%" trend="up" icon={ShoppingBag} />
        <StatCard label="Customers" value="1,284" change="+12.5%" trend="up" icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <TopProducts />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <StorePulse />
      </div>
    </div>
  );
};

export default AdminDashboard;