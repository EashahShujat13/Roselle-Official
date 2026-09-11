import { useState } from "react";
import ReviewCard from "../../components/Admin/Reviews/ReviewCard";

const placeholderReviews = [
  { id: 1, customer: "Sara Khan", product: "Pearl Bracelet", rating: 5, date: "Sep 8, 2026", comment: "Absolutely stunning — better in person!", hidden: false },
  { id: 2, customer: "Ayesha Malik", product: "Aura Necklace", rating: 4, date: "Sep 6, 2026", comment: "Beautiful piece, packaging was lovely too.", hidden: false },
  { id: 3, customer: "Hina Raza", product: "Pearl Ring", rating: 3, date: "Sep 4, 2026", comment: "Nice but sizing ran a little small.", hidden: false },
];

const AdminReviews = () => {
  const [reviews, setReviews] = useState(placeholderReviews);

  const handleToggleVisibility = (review) => {
    // TODO: reviewApi.js — updateReviewVisibility(review.id, !review.hidden)
    setReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, hidden: !r.hidden } : r))
    );
  };

  const handleDelete = (review) => {
    // TODO: reviewApi.js — deleteReview(review.id)
    setReviews((prev) => prev.filter((r) => r.id !== review.id));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-[#3B2E4A]">Reviews</h1>
        <p className="text-sm text-[#9C8AB0] mt-1">Moderate customer feedback.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onToggleVisibility={handleToggleVisibility}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-16 text-[#B4A6C4] text-sm">No reviews yet.</div>
      )}
    </div>
  );
};

export default AdminReviews;