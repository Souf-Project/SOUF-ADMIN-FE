import React, { useMemo, useState } from "react";
import TabButton from "./tabButton";

export default function Tabs({tab}) {
  const [activeTab, setActiveTab] = useState("");
  useMemo(() => {
    setActiveTab(tab[0]?.label);
  },[tab]);
  return (
    <div>
      <div className="flex space-x-2 mb-4">
        {tab.map((data) => (
          <TabButton
          label={data.label}
          isActive={activeTab === data.label}
          onClick={() => setActiveTab(data.label)}
          />
        ))}
      </div>
    </div>
  );
}
