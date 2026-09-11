const tabs = ["Store Profile", "Account", "Notifications"];

const SettingsTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-1 bg-[#F6F2FA] rounded-lg p-1 w-fit mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 rounded-md text-sm transition-colors ${
            activeTab === tab
              ? "bg-white text-[#5B3E85] font-medium shadow-sm"
              : "text-[#8A7A9B] hover:text-[#5B3E85]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SettingsTabs;