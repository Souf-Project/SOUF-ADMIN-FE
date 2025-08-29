import TabButton from "./tabButton";

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex space-x-2 mb-4">
      {tabs.map((label) => (
        <TabButton
          key={label}
          label={label}
          isActive={activeTab === label}
          onClick={() => onChange(label)}
        />
      ))}
    </div>
  );
}
