import ProductActions from "./ProductActions";

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  Out: "bg-rose-50 text-rose-500",
  Low: "bg-amber-50 text-amber-600",
};

const placeholderProducts = [
  { id: 1, name: "Pearl Bracelet", image: null, price: "₨4,500", stock: 18, status: "Active" },
  { id: 2, name: "Aura Necklace", image: null, price: "₨6,200", stock: 7, status: "Low" },
  { id: 3, name: "Pearl Ring", image: null, price: "₨3,800", stock: 0, status: "Out" },
];

const ProductTable = ({ products = placeholderProducts, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-[#B4A6C4] border-b border-[#F3EEF9]">
            <th className="font-medium px-6 py-4">Product</th>
            <th className="font-medium px-6 py-4">Price</th>
            <th className="font-medium px-6 py-4">Stock</th>
            <th className="font-medium px-6 py-4">Status</th>
            <th className="font-medium px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-[#F6F2FA] last:border-0 hover:bg-[#FBF9FD]">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E8DCF5] to-[#C9B6E4] shrink-0 overflow-hidden">
                    {product.image && (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <span className="text-[#3B2E4A]">{product.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-[#3B2E4A]">{product.price}</td>
              <td className="px-6 py-4 text-[#6B5D7B]">{product.stock}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyles[product.status]}`}>
                  {product.status === "Out" ? "Out of Stock" : product.status === "Low" ? "Low Stock" : "Active"}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <ProductActions
                  onEdit={() => onEdit?.(product)}
                  onDelete={() => onDelete?.(product)}
                  onView={() => onView?.(product)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <div className="text-center py-16 text-[#B4A6C4] text-sm">No products found.</div>
      )}
    </div>
  );
};

export default ProductTable;