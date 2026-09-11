import { useState } from "react";
import { Plus } from "lucide-react";
import CategoryCard from "../../components/Admin/Categories/CategoryCard";
import CategoryForm from "../../components/Admin/Categories/CategoryForm";

const placeholderCategories = [
  { id: 1, name: "Bracelets", productCount: 14, image: null },
  { id: 2, name: "Necklaces", productCount: 9, image: null },
  { id: 3, name: "Rings", productCount: 21, image: null },
  { id: 4, name: "Earrings", productCount: 17, image: null },
];

const AdminCategories = () => {
  const [categories] = useState(placeholderCategories);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleAdd = () => { setEditing(null); setFormOpen(true); };
  const handleEdit = (cat) => { setEditing(cat); setFormOpen(true); };
  const handleDelete = (cat) => console.log("delete category", cat); // TODO: categoryApi.js
  const handleSubmit = (form) => { console.log("submit category", form); setFormOpen(false); }; // TODO: categoryApi.js

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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      <CategoryForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editing}
      />
    </div>
  );
};

export default AdminCategories;