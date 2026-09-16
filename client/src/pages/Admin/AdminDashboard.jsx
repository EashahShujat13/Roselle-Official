import { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Users } from "lucide-react";
import StatCard from "../../components/Admin/Dashboard/StatCard";
import RevenueChart from "../../components/Admin/Dashboard/RevenueChart";
import TopProducts from "../../components/Admin/Dashboard/TopProducts";
import RecentOrders from "../../components/Admin/Dashboard/RecentOrders";
import StorePulse from "../../components/Admin/Dashboard/StorePulse";
import { getDashboardStats } from "../../config/apis/adminApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getDashboardStats(token);
        setStats(res.stats);
      } catch (e) {
        console.log("Failed to load dashboard stats:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []); // empty array = "run this once, when the page first loads"

  if (loading) {
    return <div className="text-sm text-[#9C8AB0]">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="text-sm text-rose-400">Failed to load dashboard data.</div>;
  }

  // Format numbers for display, e.g. 248000 -> "Rs248,000"
  const formatRs = (num) => `Rs${num.toLocaleString()}`;

  // Reshape recent orders + top products into the exact prop shape
  // your existing components (RecentOrders, TopProducts) already expect.
  const recentOrdersForTable = stats.recentOrders.map((o) => ({
    id: o.id,
    customer: o.customer,
    amount: formatRs(o.amount),
    status: o.status,
  }));

  const topProductsForCard = stats.topProducts.map((p) => ({
    name: p.name,
    sold: p.sold,
    revenue: formatRs(p.revenue),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-[#3B2E4A]">Good evening, Admin</h1>
        <p className="text-sm text-[#9C8AB0] mt-1">Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard label="Revenue" value={formatRs(stats.totalRevenue)} icon={DollarSign} />
        <StatCard label="Orders" value={stats.totalOrders} icon={ShoppingBag} />
        <StatCard label="Customers" value={stats.totalCustomers} icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RevenueChart data={stats.monthlyRevenue} />
        </div>
        <TopProducts products={topProductsForCard} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RecentOrders orders={recentOrdersForTable} />
        </div>
        <StorePulse
          ordersNeedAttention={stats.recentOrders.filter((o) => o.status === "Pending").length}
          lowStockCount={0}
          newReviews={0}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;