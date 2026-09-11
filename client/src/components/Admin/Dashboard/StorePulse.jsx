import { Sparkles, AlertCircle } from "lucide-react";

const StorePulse = ({ ordersNeedAttention = 12, lowStockCount = 6, newReviews = 3 }) => {
  const hasIssues = ordersNeedAttention > 0 || lowStockCount > 0;

  return (
    <div className="bg-gradient-to-br from-[#F6F0FB] to-[#EFE4F7] rounded-2xl border border-[#E8DCF5] p-6">
      <div className="flex items-center gap-2 mb-4">
        {hasIssues ? (
          <AlertCircle className="w-4 h-4 text-[#7B5EA7]" />
        ) : (
          <Sparkles className="w-4 h-4 text-[#7B5EA7]" />
        )}
        <p className="text-sm font-medium text-[#3B2E4A]">
          {hasIssues ? "A few things need attention" : "Everything looks good"}
        </p>
      </div>

      <ul className="space-y-2 text-sm text-[#6B5D7B]">
        {ordersNeedAttention > 0 && (
          <li>
            <span className="font-medium text-[#3B2E4A]">{ordersNeedAttention}</span> orders need attention
          </li>
        )}
        {lowStockCount > 0 && (
          <li>
            <span className="font-medium text-[#3B2E4A]">{lowStockCount}</span> products are low in stock
          </li>
        )}
        {newReviews > 0 && (
          <li>
            <span className="font-medium text-[#3B2E4A]">{newReviews}</span> new reviews today
          </li>
        )}
      </ul>
    </div>
  );
};

export default StorePulse;