const placeholderProducts = [
  { name: "Pearl Bracelet", sold: 84, revenue: "₨378,000" },
  { name: "Aura Necklace", sold: 61, revenue: "₨378,200" },
  { name: "Lavender Studs", sold: 55, revenue: "₨159,500" },
];

const TopProducts = ({ products = placeholderProducts }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] p-6 h-full">
      <p className="text-sm font-medium text-[#3B2E4A] mb-5">Top Products</p>

      <div className="space-y-4">
        {products.map((product, i) => (
          <div key={product.name} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E8DCF5] to-[#C9B6E4] flex items-center justify-center text-[#5B3E85] text-xs font-medium shrink-0">
              {i + 1}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-[#3B2E4A] truncate">{product.name}</p>
              <p className="text-xs text-[#9C8AB0]">{product.sold} sold</p>
            </div>
            <p className="text-sm font-medium text-[#3B2E4A] shrink-0">
              {product.revenue}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;