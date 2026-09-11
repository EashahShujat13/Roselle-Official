import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const placeholderData = [
  { category: "Necklaces", revenue: 412000 },
  { category: "Bracelets", revenue: 298000 },
  { category: "Rings", revenue: 265000 },
  { category: "Earrings", revenue: 187000 },
];

const CategoryPerformance = ({ data = placeholderData }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] p-6">
      <p className="text-sm font-medium text-[#3B2E4A] mb-6">Revenue by Category</p>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
          <CartesianGrid horizontal={false} stroke="#F0E9F7" />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#B4A6C4", fontSize: 12 }}
            tickFormatter={(v) => `${v / 1000}k`}
          />
          <YAxis
            type="category"
            dataKey="category"
            axisLine={false}
            tickLine={false}
            width={80}
            tick={{ fill: "#6B5D7B", fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => [`₨${value.toLocaleString()}`, "Revenue"]}
            contentStyle={{ borderRadius: 8, border: "1px solid #EFE8F5", fontSize: 13 }}
          />
          <Bar dataKey="revenue" fill="#7B5EA7" radius={[0, 6, 6, 0]} barSize={22} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPerformance;