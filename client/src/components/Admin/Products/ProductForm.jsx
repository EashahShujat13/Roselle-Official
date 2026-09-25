import { X, ImagePlus, Sparkles, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const emptyForm = {
  productName: "",
  price: "",
  stock: "",
  category: "",
  description: "",
  isFeatured: false,
};

const ProductForm = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    setForm(
      initialData
        ? {
            productName: initialData.productName || "",
            price: initialData.price || "",
            stock: initialData.stock || "",
            category: initialData.category || "",
            description: initialData.description || "",
            isFeatured: initialData.isFeatured || false,
          }
        : emptyForm
    );
    setImageFiles([]);
    setPreviewUrls(initialData?.images || []);
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const merged = [...imageFiles, ...files].slice(0, 5);
    setImageFiles(merged);
    setPreviewUrls(merged.map((file) => URL.createObjectURL(file)));
    e.target.value = ""; // allows picking the same file again if removed
  };

  const removeImage = (index) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);
    setPreviewUrls(updatedFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("productName", form.productName);
    data.append("price", form.price);
    data.append("stock", form.stock);
    data.append("category", form.category);
    data.append("description", form.description);
    data.append("isFeatured", form.isFeatured);
    imageFiles.forEach((file) => data.append("images", file));
    onSubmit(data);
  };

  const inputClass =
    "w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9FD] border border-[#EBE2F2] text-[#2A1F38] placeholder:text-[#B4A6C4] outline-none transition-all duration-200 focus:border-[#B48CF0] focus:bg-white focus:ring-4 focus:ring-[#B48CF0]/10";

  const labelClass = "mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#8A7A9B]";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-30 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-[#2A1F38]/30 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="relative w-full max-w-lg bg-[#FEFCFF] h-full shadow-[-20px_0_60px_rgba(80,55,100,0.15)] flex flex-col"
          >
            {/* Header */}
            <div className="relative px-8 pt-8 pb-6 border-b border-[#EFE6F5] overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#E8D9F7] to-transparent blur-2xl" />

              <div className="relative flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.3em] text-[#B48CF0] font-medium mb-2">
                    <Sparkles className="w-3 h-3" />
                    Roselle Catalog
                  </div>
                  <h2 className="font-serif text-[26px] leading-tight text-[#2A1F38]">
                    {initialData ? "Edit Product" : "New Product"}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="mt-1 p-2 rounded-full text-[#B4A6C4] hover:text-[#5B3E85] hover:bg-[#F3EEF9] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-7 space-y-7">
              {/* Images */}
              <div>
                <label className={labelClass}>Product Images</label>

                <div className="grid grid-cols-4 gap-2.5">
                  {previewUrls.map((url, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden group border border-[#EFE6F5]"
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute inset-0 bg-[#2A1F38]/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}

                  {previewUrls.length < 5 && (
                    <label className="aspect-square rounded-xl border-2 border-dashed border-[#DFCEEF] flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#B48CF0] hover:bg-[#FAF6FE] transition-colors">
                      <ImagePlus className="w-4 h-4 text-[#B48CF0]" strokeWidth={1.75} />
                      <span className="text-[9px] text-[#B4A6C4] uppercase tracking-wide">Add</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <p className="text-[11px] text-[#B4A6C4] mt-2.5">
                  {initialData
                    ? "Upload new photos to replace the current ones, or leave as is to keep them."
                    : "Up to 5 photos — the first will be used as the primary image."}
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-[#EFE6F5] via-[#DFCEEF] to-[#EFE6F5]" />

              {/* Name */}
              <div>
                <label className={labelClass}>Product Name</label>
                <input
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                  placeholder="e.g. Rose Quartz Drop Earrings"
                  required
                  className={inputClass}
                />
              </div>

              {/* Price + Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#B4A6C4]">₨</span>
                    <input
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0"
                      required
                      className={`${inputClass} pl-8`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Stock</label>
                  <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="0"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className={labelClass}>Category</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. Earrings"
                  required
                  className={inputClass}
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the piece — materials, finish, what makes it special..."
                  required
                  rows={4}
                  className={`${inputClass} resize-none leading-relaxed`}
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#FAF6FE] to-[#F6EEFA] border border-[#EFE6F5]">
                <div>
                  <p className="text-sm text-[#2A1F38] font-medium">Featured Product</p>
                  <p className="text-[11px] text-[#9C8AB0] mt-0.5">Highlight this piece on the homepage</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, isFeatured: !form.isFeatured })}
                  className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors shrink-0 ${
                    form.isFeatured ? "bg-[#7B5EA7] justify-end" : "bg-[#E1D5EB] justify-start"
                  }`}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-5 h-5 rounded-full bg-white shadow-sm"
                  />
                </button>
              </div>
            </form>

            {/* Footer actions */}
            <div className="px-8 py-6 border-t border-[#EFE6F5] flex gap-3 bg-white">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-[#6B5D7B] bg-[#F3EEF9] hover:bg-[#EBE3F5] transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                onClick={handleSubmit}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#7B5EA7] to-[#6B4595] hover:shadow-[0_8px_24px_rgba(107,69,149,0.35)] transition-shadow"
              >
                {initialData ? "Save Changes" : "Add Product"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductForm;