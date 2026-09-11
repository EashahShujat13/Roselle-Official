import { useState } from "react";

const defaultToggles = [
  { key: "newOrder", label: "New order placed", description: "Get notified when a customer places an order." },
  { key: "lowStock", label: "Low stock alert", description: "Get notified when a product falls below stock threshold." },
  { key: "newReview", label: "New review submitted", description: "Get notified when a customer leaves a review." },
];

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-colors ${
      checked ? "bg-[#7B5EA7] justify-end" : "bg-[#E8E1F0] justify-start"
    }`}
  >
    <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
  </button>
);

const NotificationSettings = () => {
  const [settings, setSettings] = useState({ newOrder: true, lowStock: true, newReview: false });

  const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div className="bg-white rounded-2xl border border-[#EFE8F5] p-6 max-w-xl space-y-5">
      {defaultToggles.map(({ key, label, description }) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#3B2E4A]">{label}</p>
            <p className="text-xs text-[#9C8AB0]">{description}</p>
          </div>
          <Toggle checked={settings[key]} onChange={() => toggle(key)} />
        </div>
      ))}
    </div>
  );
};

export default NotificationSettings;