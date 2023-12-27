import { Tabs } from "components/Tabs";

import GFormTab from "./components/GFormTab";
import GeneralTab from "./components/GeneralTab";
import { InputsTab } from "./components/InputsTab";
import SteperTab from "./components/SteperTab";
import ViewsTab from "./components/ViewsTab";

type TabItem = {
  tab: JSX.Element;
  header: string;
};

const TabsItems: TabItem[] = [
  { tab: <InputsTab />, header: "Inputs" },
  { tab: <GFormTab />, header: "GForm" },
  { tab: <GeneralTab />, header: "General" },
  { tab: <ViewsTab />, header: "Views" },
  { tab: <SteperTab />, header: "Steper" },
];

export default function TestScreen() {
  return (
    <Tabs headers={TabsItems.map((header) => header.header)}>
      {TabsItems.map((item) => (
        <Tabs.Tab key={item.header} header={item.header}>
          {item.tab}
        </Tabs.Tab>
      ))}
    </Tabs>
  );
}
