import { Bell, Search } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="h-20 flex items-center justify-between px-8 border-b border-[#E8E1F0] bg-white/70 backdrop-blur sticky top-0 z-10">
      <div className="relative w-72 max-w-full">
        <Search className="w-4 h-4 text-[#B4A6C4] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search orders, products, customers..."
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[#F6F2FA] border border-transparent focus:border-[#D9CBEA] focus:bg-white outline-none transition-colors placeholder:text-[#B4A6C4]"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-[#6B5D7B] hover:text-[#5B3E85] transition-colors">
          <Bell className="w-5 h-5" strokeWidth={1.75} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C4699C]" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-[#E8E1F0]">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9B6E4] to-[#7B5EA7] flex items-center justify-center text-white text-sm font-medium">
            A
          </div>
          <div className="leading-tight hidden sm:block">
            <p className="text-sm font-medium text-[#3B2E4A]">Admin</p>
            <p className="text-xs text-[#9C8AB0]">Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;