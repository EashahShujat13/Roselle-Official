import { useState, useEffect } from "react";
import ProductFilters from "../../components/Admin/Products/ProductFilters";
import ProductTable from "../../components/Admin/Products/ProductTable";
import ProductForm from "../../components/Admin/Products/ProductForm";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../config/apis/productApi";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getAllProducts();
      setProducts(res.products);
    } catch (e) {
      console.log("Failed to fetch products:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  // THIS was the missing piece — your old version only had a console.log here.
  const handleSubmit = async (formData) => {
    const token = localStorage.getItem("token");
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData, token);
      } else {
        await addProduct(formData, token);
      }
      setFormOpen(false);
      fetchProducts(); // reload the table with real data from the server
    } catch (e) {
      console.log("Failed to save product:", e);
      alert(e.response?.data?.message || "Failed to save product");
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(`Delete "${product.productName}"? This can't be undone.`);
    if (!confirmed) return;

    const token = localStorage.getItem("token");
    try {
      await deleteProduct(product._id, token);
      fetchProducts();
    } catch (e) {
      console.log("Failed to delete product:", e);
      alert(e.response?.data?.message || "Failed to delete product");
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.productName.toLowerCase().includes(search.toLowerCase());
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Active" && p.stock > 5) ||
      (activeTab === "Out of Stock" && p.stock === 0) ||
      (activeTab === "Low Stock" && p.stock > 0 && p.stock <= 5);
    return matchesSearch && matchesTab;
  });

  const tableRows = filteredProducts.map((p) => ({
    id: p._id,
    name: p.productName,
    image: p.images?.[0] || null,
    price: `Rs${p.price.toLocaleString()}`,
    stock: p.stock,
    status: p.stock === 0 ? "Out" : p.stock <= 5 ? "Low" : "Active",
    _raw: p,
  }));

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

      {loading ? (
        <div className="text-sm text-[#9C8AB0] py-8 text-center">Loading products...</div>
      ) : (
        <ProductTable
          products={tableRows}
          onEdit={(row) => handleEdit(row._raw)}
          onDelete={(row) => handleDelete(row._raw)}
        />
      )}

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