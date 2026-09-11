import { useState } from "react";
import { Plus } from "lucide-react";
import CouponTable from "../../components/Admin/Coupons/CouponTable";
import CouponForm from "../../components/Admin/Coupons/CouponForm";

const AdminCoupons = () => {
  const [formOpen, setFormOpen] = useState(false);

  const handleSubmit = (form) => {
    // TODO: couponApi.js — createCoupon(form)
    console.log("create coupon", form);
    setFormOpen(false);
  };

  const handleDelete = (coupon) => {
    // TODO: couponApi.js — deleteCoupon(coupon.id)
    console.log("delete coupon", coupon);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-[#3B2E4A]">Coupons</h1>
          <p className="text-sm text-[#9C8AB0] mt-1">Manage discount codes.</p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-1.5 bg-[#7B5EA7] hover:bg-[#6B4E97] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> New Coupon
        </button>
      </div>

      <CouponTable onDelete={handleDelete} />

      <CouponForm open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleSubmit} />
    </div>
  );
};

export default AdminCoupons;