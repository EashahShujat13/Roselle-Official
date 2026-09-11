import { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Trash2, Eye } from "lucide-react";

const ProductActions = ({ onEdit, onDelete, onView }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-1.5 rounded-md hover:bg-[#F3EEF9] text-[#8A7A9B] transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-white border border-[#EFE8F5] rounded-lg shadow-lg py-1 z-20">
          <button
            onClick={() => { onView?.(); setOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#6B5D7B] hover:bg-[#F6F2FA]"
          >
            <Eye className="w-3.5 h-3.5" /> View
          </button>
          <button
            onClick={() => { onEdit?.(); setOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#6B5D7B] hover:bg-[#F6F2FA]"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={() => { onDelete?.(); setOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-500 hover:bg-rose-50"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductActions;