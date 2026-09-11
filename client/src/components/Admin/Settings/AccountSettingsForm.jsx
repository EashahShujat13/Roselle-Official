const AccountSettingsForm = ({ form, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-[#EFE8F5] p-6 max-w-xl space-y-4">
      <div>
        <label className="text-xs text-[#8A7A9B] mb-1 block">Admin Name</label>
        <input
          value={form.name}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none"
        />
      </div>

      <div>
        <label className="text-xs text-[#8A7A9B] mb-1 block">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => onChange({ ...form, email: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none"
        />
      </div>

      <div className="pt-2 border-t border-[#F3EEF9]">
        <p className="text-sm font-medium text-[#3B2E4A] mb-3 mt-4">Change Password</p>
        <div className="space-y-3">
          <input
            type="password"
            placeholder="Current password"
            className="w-full px-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none"
          />
          <input
            type="password"
            placeholder="New password"
            className="w-full px-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none"
          />
        </div>
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

export default AccountSettingsForm;