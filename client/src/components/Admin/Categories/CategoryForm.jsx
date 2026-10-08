import { X } from "lucide-react";
import { useState, useEffect } from "react";

const emptyForm = { categoryName: "", image: "" };

const CategoryForm = ({ open, onClose, onSubmit, initialData, saving = false, error = "" }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(
      initialData
        ? {
            categoryName: initialData.categoryName ?? "",
            image: initialData.image ?? "",
          }
        : emptyForm
    );
  }, [initialData, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({
      categoryName: form.categoryName.trim(),
      image: form.image.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={saving ? undefined : onClose} />

      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl">
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#EFE8F5]">
          <h2 className="font-serif text-lg text-[#3B2E4A]">
            {initialData ? "Edit Category" : "New Category"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="text-[#B4A6C4] hover:text-[#5B3E85]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <p className="text-xs text-rose-500 bg-rose-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <div>
            <label className="text-xs text-[#8A7A9B] mb-1 block">Category Name</label>
            <input
              value={form.categoryName}
              onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
              required
              autoFocus
              className="w-full px-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-[#8A7A9B] mb-1 block">Image URL (optional)</label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none"
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                onError={(e) => (e.currentTarget.style.display = "none")}
                onLoad={(e) => (e.currentTarget.style.display = "block")}
                className="mt-2 h-24 w-full rounded-lg object-cover"
              />
            )}
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium text-[#6B5D7B] bg-[#F3EEF9] hover:bg-[#EBE3F5] disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white bg-[#7B5EA7] hover:bg-[#6B4E97] disabled:opacity-60"
            >
              {saving ? "Saving..." : initialData ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;