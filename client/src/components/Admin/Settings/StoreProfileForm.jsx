const StoreProfileForm = ({ form, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-[#EFE8F5] p-6 max-w-xl space-y-4">
      <div>
        <label className="text-xs text-[#8A7A9B] mb-1 block">Store Name</label>
        <input
          value={form.storeName}
          onChange={(e) => onChange({ ...form, storeName: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none"
        />
      </div>

      <div>
        <label className="text-xs text-[#8A7A9B] mb-1 block">Support Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => onChange({ ...form, email: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none"
        />
      </div>

      <div>
        <label className="text-xs text-[#8A7A9B] mb-1 block">Contact Number</label>
        <input
          value={form.phone}
          onChange={(e) => onChange({ ...form, phone: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none"
        />
      </div>

      <div>
        <label className="text-xs text-[#8A7A9B] mb-1 block">Currency</label>
        <select
          value={form.currency}
          onChange={(e) => onChange({ ...form, currency: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none"
        >
          <option value="PKR">PKR (₨)</option>
          <option value="USD">USD ($)</option>
        </select>
      </div>

      <div>
        <label className="text-xs text-[#8A7A9B] mb-1 block">Store Address</label>
        <textarea
          value={form.address}
          onChange={(e) => onChange({ ...form, address: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-[#7B5EA7] hover:bg-[#6B4E97]"
      >
        Save Changes
      </button>
    </form>
  );
};

export default StoreProfileForm;