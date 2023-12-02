import { MainLayout } from "layouts";
import { useState } from "react";
import { InputsTab } from "./components/InputsTab";
import GFormTab from "./components/GFormTab";
import { Tabs } from "components/Tabs";
import GeneralTab from "./components/GeneralTab";

export default function MapScreen() {
  const [selected, setSelected] = useState("Inputs");

  return (
    <MainLayout>
      <Tabs selected={selected} handleSelect={(val: any) => setSelected(val)}>
        <Tabs.Group>
          <Tabs.Header value="Inputs" text="Inputs" />
          <Tabs.Header value="GForm" text="GForm" />
          <Tabs.Header value="General" text="General" />
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
      </Tabs>
    </MainLayout>
  );
}
