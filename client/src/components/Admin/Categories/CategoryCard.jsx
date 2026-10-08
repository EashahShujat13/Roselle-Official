import { Pencil, Trash2 } from "lucide-react";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const count = category.productCount ?? 0;

  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] p-5 group">
      <div className="w-full h-28 rounded-xl bg-gradient-to-br from-[#E8DCF5] to-[#C9B6E4] mb-4 overflow-hidden">
        {category.image && (
          <img
            src={category.image}
            alt={category.categoryName}
            onError={(e) => (e.currentTarget.style.display = "none")}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#3B2E4A] truncate">{category.categoryName}</p>
          <p className="text-xs text-[#9C8AB0] mt-0.5">
            {count} {count === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit?.(category)}
            aria-label={`Edit ${category.categoryName}`}
            className="p-1.5 rounded-md hover:bg-[#F3EEF9] text-[#8A7A9B]"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete?.(category)}
            aria-label={`Delete ${category.categoryName}`}
            className="p-1.5 rounded-md hover:bg-rose-50 text-rose-400"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;