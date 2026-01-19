import React, { useState } from "react";
import { toast } from "react-toastify";
import Switch from "react-switch";

export default function Settings() {

  const [notifications, setNotifications] = useState({
    lowStock: true,
    expiry: true,
    purchase: true,
    sales: false,
  });

  const toggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });

    const labels = {
      lowStock: "Low stock alerts",
      expiry: "Expiry alerts",
      purchase: "Purchase order notifications",
      sales: "Sales reports",
    };

    toast.info(
      `${labels[key]} ${!notifications[key] ? "enabled" : "disabled"}`
    );
  };

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="bg-slate-100 min-h-screen space-y-6 px-3 sm:px-6 py-4">
      {/* HEADER */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
        <p className="text-slate-500 text-sm sm:text-base">
          Configure your pharmacy management system
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* GENERAL SETTINGS */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <h2 className="font-semibold mb-4">General Settings</h2>
            <div className="space-y-4">
              <Input label="Pharmacy Name" defaultValue="PharmaCare+ Pharmacy" />
              <Textarea
                label="Pharmacy Address"
                defaultValue="123 Medical Street, Health City, HC 123456"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Phone Number" defaultValue="+91 12345 67890" />
                <Input
                  label="Email Address"
                  defaultValue="contact@pharmacareplus.com"
                />
              </div>
            </div>
          </div>

          {/* NOTIFICATION SETTINGS */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <h2 className="font-semibold mb-4">Notification Settings</h2>
            <ToggleSwitch
              title="Low Stock Alerts"
              desc="Get notified when stock is low"
              enabled={notifications.lowStock}
              onChange={() => toggle("lowStock")}
            />
            <ToggleSwitch
              title="Expiry Alerts"
              desc="Get notified before medicines expire"
              enabled={notifications.expiry}
              onChange={() => toggle("expiry")}
            />
            <ToggleSwitch
              title="Purchase Order Updates"
              desc="Get notified about PO status changes"
              enabled={notifications.purchase}
              onChange={() => toggle("purchase")}
            />
            <ToggleSwitch
              title="Sales Reports"
              desc="Receive daily sales reports via email"
              enabled={notifications.sales}
              onChange={() => toggle("sales")}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* USER PROFILE */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto text-xl font-bold">
              PM
            </div>
            <h3 className="font-semibold mt-3">Dr. Sarah Johnson</h3>
            <p className="text-sm text-slate-500 mb-4">Pharmacy Manager</p>
            <div className="space-y-3">
              <Input label="Full Name" defaultValue="Dr. Sarah Johnson" />
              <Input
                label="Email"
                defaultValue="sarah.johnson@pharmacareplus.com"
              />
              <Input label="Phone" defaultValue="+91 98765 43210" />
            </div>
          </div>

          {/* SYSTEM INFO */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <h2 className="font-semibold mb-4">Supply Chain</h2>
            <InfoRow label="Active Suppliers" value="24" />
            <InfoRow label="Pending Orders" value="8" />
            <InfoRow label="Avg. Delivery Time" value="2.5 days" />
            <InfoRow label="Return Rate" value="1.2%" />
            <InfoRow label="Inventory Value" value="₹18.7L" />

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Next Order Due</p>
              <div className="flex items-center justify-between">
                <span className="font-medium">Medical Supplies Co.</span>
                <span className="text-sm text-blue-600">Tomorrow</span>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

const Input = ({ label, defaultValue }) => (
  <div>
    <label className="block text-sm text-slate-600 mb-1">{label}</label>
    <input
      defaultValue={defaultValue}
      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Textarea = ({ label, defaultValue }) => (
  <div>
    <label className="block text-sm text-slate-600 mb-1">{label}</label>
    <textarea
      defaultValue={defaultValue}
      rows={3}
      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// NEW TOGGLE SWITCH USING react-switch
const ToggleSwitch = ({ title, desc, enabled, onChange }) => (
  <div className="flex justify-between items-center py-3 border-b last:border-none">
    <div className="pr-4">
      <p className="font-medium text-sm sm:text-base">{title}</p>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>

    <Switch
      onChange={onChange}
      checked={enabled}
      height={24}
      width={48}
      handleDiameter={20}
      uncheckedIcon={false}
      checkedIcon={false}
      onColor="#2563eb" // blue-600
      offColor="#cbd5e1" // slate-300
      activeBoxShadow="0 0 2px 3px #bfdbfe" // blue-200
      className="react-switch"
    />
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm py-2">
    <span className="text-slate-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);