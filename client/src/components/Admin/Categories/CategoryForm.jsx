import { X } from "lucide-react";
import { useState, useEffect } from "react";

const emptyForm = { name: "", description: "" };

const CategoryForm = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(initialData ? { ...emptyForm, ...initialData } : emptyForm);
  }, [initialData, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl">
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#EFE8F5]">
          <h2 className="font-serif text-lg text-[#3B2E4A]">
            {initialData ? "Edit Category" : "New Category"}
          </h2>
          <button onClick={onClose} className="text-[#B4A6C4] hover:text-[#5B3E85]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs text-[#8A7A9B] mb-1 block">Category Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-[#8A7A9B] mb-1 block">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium text-[#6B5D7B] bg-[#F3EEF9] hover:bg-[#EBE3F5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white bg-[#7B5EA7] hover:bg-[#6B4E97]"
            >
              {initialData ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;    