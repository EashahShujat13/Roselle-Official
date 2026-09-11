import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tags,
  Star,
  BarChart3,
  Ticket,
  Settings,
  LogOut,
  Gem,
} from "lucide-react";

const navSections = [
  {
    label: "General",
    items: [
      { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
      { name: "Products", path: "/admin/products", icon: Package },
      { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
      { name: "Customers", path: "/admin/customers", icon: Users },
    ],
  },
  {
    label: "Store",
    items: [
      { name: "Categories", path: "/admin/categories", icon: Tags },
    //   { name: "Reviews", path: "/admin/reviews", icon: Star },
    ],
  },
  {
    label: "Business",
    items: [
      { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
      { name: "Coupons", path: "/admin/coupons", icon: Ticket },
    ],
  },
  {
    label: "System",
    items: [{ name: "Settings", path: "/admin/settings", icon: Settings }],
  },
];

const AdminSidebar = () => {
  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col bg-[#FAF8FC] border-r border-[#E8E1F0]">
      {/* Brand */}
      <div className="flex items-center gap-2 px-6 h-20 border-b border-[#E8E1F0]">
        <Gem className="w-5 h-5 text-[#7B5EA7]" strokeWidth={1.5} />
        <div className="leading-tight">
          <p className="font-serif text-[15px] tracking-wide text-[#3B2E4A]">
            Roselle
          </p>
          <p className="text-[10px] tracking-[0.2em] text-[#9C8AB0] uppercase">
            Jewellery
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-7">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-3 mb-2 text-[10px] font-medium tracking-[0.15em] text-[#B4A6C4] uppercase">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map(({ name, path, icon: Icon, end }) => (
                <NavLink
                  key={name}
                  to={path}
                  end={end}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "text-[#5B3E85] bg-[#F0E9F7] font-medium"
                        : "text-[#6B5D7B] hover:bg-[#F3EEF9] hover:text-[#5B3E85]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="admin-nav-active"
                          className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-[#7B5EA7]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                      {name}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer / logout */}
      <div className="border-t border-[#E8E1F0] p-4">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8A7A9B] hover:bg-[#F3EEF9] hover:text-[#5B3E85] transition-colors">
          <LogOut className="w-4 h-4" strokeWidth={1.75} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;