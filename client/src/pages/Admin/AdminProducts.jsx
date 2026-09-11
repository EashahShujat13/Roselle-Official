import { useState } from "react";
import ProductFilters from "../../components/Admin/Products/ProductFilters";
import ProductTable from "../../components/Admin/Products/ProductTable";
import ProductForm from "../../components/Admin/Products/ProductForm";

const AdminProducts = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleSubmit = (formData) => {
    // TODO: wire to productApi.js — createProduct(formData) / updateProduct(id, formData)
    console.log("submit", formData);
    setFormOpen(false);
  };

  const handleDelete = (product) => {
    // TODO: wire to productApi.js — deleteProduct(product.id)
    console.log("delete", product);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-[#3B2E4A]">Products</h1>
        <p className="text-sm text-[#9C8AB0] mt-1">Manage your product catalog.</p>
      </div>

      <ProductFilters
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={search}
        onSearchChange={setSearch}
        onAddProduct={handleAddProduct}
      />

      <ProductTable onEdit={handleEdit} onDelete={handleDelete} />

      <ProductForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingProduct}
      />
    </div>
  );
};

export default AdminProducts;