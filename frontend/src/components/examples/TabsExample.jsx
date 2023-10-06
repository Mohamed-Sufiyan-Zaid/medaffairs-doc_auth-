import { useState } from "react";
import TabsContainer from "../common/TabsContainer/TabsContainer";

function TabsExample() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTabIndex(newValue);
  };

  const tabLabels = ["Assets", "Derivatives"];

  // Dummy data for assets and derivatives
  const assets = ["Asset 1", "Asset 2", "Asset 3", "Asset 4", "Asset 5"];
  const derivatives = ["Derivative 1", "Derivative 2", "Derivative 3", "Derivative 4", "Derivative 5"];

  return (
    <div>
      <TabsContainer
        tabLabels={tabLabels}
        tabsAriaLabel="Asset and Derivative Tabs"
        activeTabIndex={activeTabIndex}
        handleChange={handleTabChange}
        isSticky
      />
      <div className="mt-2">
        {activeTabIndex === 0 && (
          <ul style={{ paddingLeft: "2.5rem" }}>
            {assets.map((asset, index) => (
              <li key={index}>{asset}</li>
            ))}
          </ul>
        )}
        {activeTabIndex === 1 && (
          <ul style={{ paddingLeft: "2.5rem" }}>
            {derivatives.map((derivative, index) => (
              <li key={index}>{derivative}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TabsExample;
