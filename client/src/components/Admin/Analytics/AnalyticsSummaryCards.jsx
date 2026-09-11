import { DollarSign, ShoppingBag, Users, Package } from "lucide-react";
import StatCard from "../Dashboard/StatCard";

const AnalyticsSummaryCards = ({ stats }) => {
  const defaultStats = {
    revenue: { value: "₨1.2M", change: "+22.1%" },
    orders: { value: "412", change: "+9.8%" },
    customers: { value: "1,284", change: "+12.5%" },
    avgOrderValue: { value: "₨5,140", change: "+3.4%" },
  };
  const s = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard label="Revenue (90d)" value={s.revenue.value} change={s.revenue.change} icon={DollarSign} />
      <StatCard label="Orders (90d)" value={s.orders.value} change={s.orders.change} icon={ShoppingBag} />
      <StatCard label="New Customers" value={s.customers.value} change={s.customers.change} icon={Users} />
      <StatCard label="Avg. Order Value" value={s.avgOrderValue.value} change={s.avgOrderValue.change} icon={Package} />
    </div>
  );
};

export default AnalyticsSummaryCards;