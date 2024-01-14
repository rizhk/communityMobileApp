import { PSteps, PStep } from "components/PSteps";
import { Text } from "components/Text";
import { useState } from "react";

import ListPicker from "components/ListPicker/ListPicker";
import { useThemeTestContext } from "./TemeContext";
import { Star } from "assets/svg";

const Items = [
  { icon: <Star color="white" />, text: "drop-item1", value: "drop-item1" },
  { text: "drop-item2", value: "drop-item2" },
  { text: "drop-item3", value: "drop-item3" },
  { text: "drop-item4", value: "drop-item4" },
  { text: "drop-item5", value: "drop-item5" },
  { text: "drop-item6", value: "6" },
  { text: "drop-item7", value: "item7" },
  { text: "drop-item8", value: "drop-item8 dsa  das a" },
];

export default function SteperTab() {
  const [single, setSingle] = useState("drop-item1");
  const [multiple, setMultiple] = useState(["drop-item1", "drop-item2"]);
  const { color } = useThemeTestContext();

  return (
    <>
      <PSteps color={color}>
        <PStep label="First Step">
          <Text>This is the content within step 1!</Text>
          <Text preset="bold" text="Single Picker" />
          <ListPicker addText="Add item..." items={Items} value={single} setSingle={(value: any) => setSingle(value)} />
          <Text preset="bold" text="Multi Picker" />
          <ListPicker
            addText="Add item..."
            items={Items}
            value={multiple}
            setMultiple={(value: any) => setMultiple(value)}
            multiple
          />
        </PStep>
        <PStep label="Second Step">
          <Text>This is the content within step 2!</Text>
        </PStep>
        <PStep label="third Step">
          <Text>This is the content within step 2!</Text>
        </PStep>
        <PStep label="fourth Step">
          <Text>This is the content within step 2!</Text>
        </PStep>
      </PSteps>
    </>
  );
}
