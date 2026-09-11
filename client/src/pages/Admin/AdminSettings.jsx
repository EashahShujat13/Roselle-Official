import { useState } from "react";
import SettingsTabs from "../../components/Admin/Settings/SettingsTabs";
import StoreProfileForm from "../../components/Admin/Settings/StoreProfileForm";
import AccountSettingsForm from "../../components/Admin/Settings/AccountSettingsForm";
import NotificationSettings from "../../components/Admin/Settings/NotificationSettings";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("Store Profile");
  const [storeForm, setStoreForm] = useState({
    storeName: "Roselle Jewellery",
    email: "",
    phone: "",
    currency: "PKR",
    address: "",
  });
  const [accountForm, setAccountForm] = useState({ name: "Admin", email: "" });

  const handleStoreSubmit = (e) => {
    e.preventDefault();
    // TODO: settingsApi.js — updateStoreProfile(storeForm)
    console.log("save store profile", storeForm);
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    // TODO: authApi.js — updateAdminAccount(accountForm)
    console.log("save account", accountForm);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-[#3B2E4A]">Settings</h1>
        <p className="text-sm text-[#9C8AB0] mt-1">Manage your store and account preferences.</p>
      </div>

      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "Store Profile" && (
        <StoreProfileForm form={storeForm} onChange={setStoreForm} onSubmit={handleStoreSubmit} />
      )}
      {activeTab === "Account" && (
        <AccountSettingsForm form={accountForm} onChange={setAccountForm} onSubmit={handleAccountSubmit} />
      )}
      {activeTab === "Notifications" && <NotificationSettings />}
    </div>
  );
};

export default AdminSettings;