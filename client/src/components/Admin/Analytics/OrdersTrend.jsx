import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const placeholderData = [
  { week: "W1", orders: 24 }, { week: "W2", orders: 31 }, { week: "W3", orders: 28 },
  { week: "W4", orders: 39 }, { week: "W5", orders: 35 }, { week: "W6", orders: 47 },
  { week: "W7", orders: 42 }, { week: "W8", orders: 51 },
];

const OrdersTrend = ({ data = placeholderData }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] p-6">
      <p className="text-sm font-medium text-[#3B2E4A] mb-6">Order Volume Trend</p>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#F0E9F7" />
          <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#B4A6C4", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#B4A6C4", fontSize: 12 }} />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #EFE8F5", fontSize: 13 }} />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#C4699C"
            strokeWidth={2}
            dot={{ fill: "#C4699C", r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersTrend;