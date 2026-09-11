import { Star, Trash2, Eye, EyeOff } from "lucide-react";

const ReviewCard = ({ review, onToggleVisibility, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9B6E4] to-[#7B5EA7] flex items-center justify-center text-white text-xs font-medium">
            {review.customer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <p className="text-sm text-[#3B2E4A] font-medium">{review.customer}</p>
            <p className="text-xs text-[#9C8AB0]">{review.product} · {review.date}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < review.rating ? "fill-[#E5B94E] text-[#E5B94E]" : "text-[#E8E1F0]"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-[#6B5D7B] leading-relaxed mb-4">{review.comment}</p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleVisibility?.(review)}
          className="flex items-center gap-1.5 text-xs text-[#8A7A9B] hover:text-[#5B3E85] px-2.5 py-1.5 rounded-md hover:bg-[#F3EEF9]"
        >
          {review.hidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          {review.hidden ? "Show" : "Hide"}
        </button>
        <button
          onClick={() => onDelete?.(review)}
          className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-500 px-2.5 py-1.5 rounded-md hover:bg-rose-50"
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;