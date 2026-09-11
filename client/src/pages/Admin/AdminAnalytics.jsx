import AnalyticsSummaryCards from "../../components/Admin/Analytics/AnalyticsSummaryCards";
import CategoryPerformance from "../../components/Admin/Analytics/CategoryPerformance";
import OrdersTrend from "../../components/Admin/Analytics/OrdersTrend";

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-[#3B2E4A]">Analytics</h1>
        <p className="text-sm text-[#9C8AB0] mt-1">Store performance over the last 90 days.</p>
      </div>

      <AnalyticsSummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <OrdersTrend />
        <CategoryPerformance />
      </div>
    </div>
  );
};

export default AdminAnalytics;