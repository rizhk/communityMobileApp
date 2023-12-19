import { Tabs } from "components/Tabs";
import { useState } from "react";

import GFormTab from "./components/GFormTab";
import GeneralTab from "./components/GeneralTab";
import { InputsTab } from "./components/InputsTab";
import SteperTab from "./components/SteperTab";
import ViewsTab from "./components/ViewsTab";

type TabItem = {
  tab: JSX.Element;
  value: string;
};

const TabsItems: TabItem[] = [
  { tab: <InputsTab />, value: "Inputs" },
  { tab: <GFormTab />, value: "GForm" },
  { tab: <GeneralTab />, value: "General" },
  { tab: <ViewsTab />, value: "Views" },
  { tab: <SteperTab />, value: "Steper" },
];

export default function MapScreen() {
  const [selected, setSelected] = useState("Inputs");

  return (
    <Tabs selected={selected} handleSelect={(val: any) => setSelected(val)}>
      <Tabs.Group>
        {TabsItems.map((item) => (
          <Tabs.Header key={item.value} value={item.value} text={item.value} />
        ))}
      </Tabs.Group>
      {TabsItems.map((item) => (
        <Tabs.Body key={item.value} value={item.value}>
          {item.tab}
        </Tabs.Body>
      ))}
    </Tabs>
  );
}
