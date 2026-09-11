import { useState } from "react";
import OrderFilters from "../../components/Admin/Orders/OrderFilters";
import OrderTable from "../../components/Admin/Orders/OrderTable";

const AdminOrders = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const handleStatusChange = (order, newStatus) => {
    // TODO: wire to orderApi.js — updateOrderStatus(order.id, newStatus)
    console.log("status change", order.id, newStatus);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-[#3B2E4A]">Orders</h1>
        <p className="text-sm text-[#9C8AB0] mt-1">Track and manage customer orders.</p>
      </div>

      <OrderFilters
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={search}
        onSearchChange={setSearch}
      />

      <OrderTable onStatusChange={handleStatusChange} />
    </div>
  );
};

export default AdminOrders;