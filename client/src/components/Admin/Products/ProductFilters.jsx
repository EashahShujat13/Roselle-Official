import { Search, Plus } from "lucide-react";

const tabs = ["All", "Active", "Out of Stock", "Low Stock"];

const ProductFilters = ({ activeTab, onTabChange, search, onSearchChange, onAddProduct }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-1 bg-[#F6F2FA] rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-3.5 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === tab
                ? "bg-white text-[#5B3E85] font-medium shadow-sm"
                : "text-[#8A7A9B] hover:text-[#5B3E85]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#B4A6C4] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="pl-9 pr-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none transition-colors w-56 placeholder:text-[#B4A6C4]"
          />
        </div>

        <button
          onClick={onAddProduct}
          className="flex items-center gap-1.5 bg-[#7B5EA7] hover:bg-[#6B4E97] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;