import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import CategoryCard from "../../components/Admin/Categories/CategoryCard";
import CategoryForm from "../../components/Admin/Categories/CategoryForm";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../config/apis/categoryApi";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllCategories();
      setCategories(data.categories || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setFormOpen(true);
  };

  const handleDelete = async (cat) => {
    const warning =
      cat.productCount > 0
        ? `"${cat.categoryName}" has ${cat.productCount} product(s). Delete anyway?`
        : `Delete "${cat.categoryName}"?`;
    if (!window.confirm(warning)) return;

    try {
      await deleteCategory(cat._id);
      setCategories((prev) => prev.filter((c) => c._id !== cat._id));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete category.");
    }
  };

  const handleSubmit = async (form) => {
    try {
      setSaving(true);
      setError("");
      if (editing) {
        await updateCategory(editing._id, form);
      } else {
        await createCategory(form);
      }
      setFormOpen(false);
      setEditing(null);
      await fetchCategories();
    } catch (err) {
      // Keep the modal open so the user can fix the input
      setError(err?.response?.data?.message || "Failed to save category.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-[#3B2E4A]">Categories</h1>
          <p className="text-sm text-[#9C8AB0] mt-1">Organize your product catalog.</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 bg-[#7B5EA7] hover:bg-[#6B4E97] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {error && (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-rose-50 border border-rose-100 px-4 py-2.5 text-sm text-rose-500">
          <span>{error}</span>
          <button onClick={() => setError("")} className="text-rose-400 hover:text-rose-600">
            Dismiss
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-52 rounded-2xl bg-[#F3EEF9] animate-pulse" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#D9CBEA] py-16 text-center">
          <p className="text-sm text-[#8A7A9B]">No categories yet.</p>
          <button onClick={handleAdd} className="mt-2 text-sm text-[#7B5EA7] hover:underline">
            Create your first category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat._id}
              category={cat}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CategoryForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editing}
        saving={saving}
        error={formOpen ? error : ""}
      />
    </div>
  );
};

export default AdminCategories;