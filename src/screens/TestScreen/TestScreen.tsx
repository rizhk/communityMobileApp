import { Tabs } from "components/Tabs";
import { MainLayout } from "layouts";
import { useState } from "react";

import GFormTab from "./components/GFormTab";
import GeneralTab from "./components/GeneralTab";
import { InputsTab } from "./components/InputsTab";
import ViewsTab from "./components/ViewsTab";
import SteperTab from "./components/SteperTab";

export default function MapScreen() {
  const [selected, setSelected] = useState("Inputs");

  return (
    <MainLayout>
      <Tabs selected={selected} handleSelect={(val: any) => setSelected(val)}>
        <Tabs.Group>
          <Tabs.Header value="Inputs" text="Inputs" />
          <Tabs.Header value="GForm" text="GForm" />
          <Tabs.Header value="General" text="General" />
          <Tabs.Header value="Views" text="Views" />
          <Tabs.Header value="Steper" text="Steper" />
        </Tabs.Group>
        <Tabs.Body value="Inputs">
          <InputsTab />
        </Tabs.Body>
        <Tabs.Body value="GForm">
          <GFormTab />
        </Tabs.Body>
        <Tabs.Body value="General">
          <GeneralTab />
        </Tabs.Body>
        <Tabs.Body value="Views">
          <ViewsTab />
        </Tabs.Body>
        <Tabs.Body value="Steper">
          <SteperTab />
        </Tabs.Body>
      </Tabs>
    </MainLayout>
  );
}
