import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ label, value, change, trend = "up", icon: Icon }) => {
  const isUp = trend === "up";

  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[#9C8AB0]">{label}</p>
        {Icon && (
          <div className="w-9 h-9 rounded-lg bg-[#F3EEF9] flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#7B5EA7]" strokeWidth={1.75} />
          </div>
        )}
      </div>

      <p className="text-2xl font-serif text-[#3B2E4A]">{value}</p>

      {change && (
        <div
          className={`flex items-center gap-1 mt-2 text-xs font-medium ${
            isUp ? "text-emerald-600" : "text-rose-500"
          }`}
        >
          {isUp ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          {change}
          <span className="text-[#B4A6C4] font-normal ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;