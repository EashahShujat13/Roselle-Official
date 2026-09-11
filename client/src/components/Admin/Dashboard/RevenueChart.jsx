import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Replace with real data from your orders API once wired up
const placeholderData = [
  { month: "Jan", revenue: 142000 },
  { month: "Feb", revenue: 158000 },
  { month: "Mar", revenue: 149000 },
  { month: "Apr", revenue: 171000 },
  { month: "May", revenue: 168000 },
  { month: "Jun", revenue: 190000 },
  { month: "Jul", revenue: 204000 },
  { month: "Aug", revenue: 198000 },
  { month: "Sep", revenue: 248000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#EFE8F5] rounded-lg px-3 py-2 shadow-sm">
      <p className="text-xs text-[#9C8AB0]">{label}</p>
      <p className="text-sm font-medium text-[#3B2E4A]">
        ₨{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

const RevenueChart = ({ data = placeholderData }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-[#3B2E4A]">Revenue</p>
          <p className="text-xs text-[#9C8AB0]">Last 9 months</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B5EA7" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#7B5EA7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#F0E9F7" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#B4A6C4", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#B4A6C4", fontSize: 12 }}
            tickFormatter={(v) => `${v / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#7B5EA7"
            strokeWidth={2}
            fill="url(#revenueFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;