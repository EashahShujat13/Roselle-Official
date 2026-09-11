import { Pencil, Trash2 } from "lucide-react";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] p-5 group">
      <div className="w-full h-28 rounded-xl bg-gradient-to-br from-[#E8DCF5] to-[#C9B6E4] mb-4 overflow-hidden">
        {category.image && (
          <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
        )}
      </div>

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#3B2E4A]">{category.name}</p>
          <p className="text-xs text-[#9C8AB0] mt-0.5">{category.productCount} products</p>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit?.(category)}
            className="p-1.5 rounded-md hover:bg-[#F3EEF9] text-[#8A7A9B]"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete?.(category)}
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