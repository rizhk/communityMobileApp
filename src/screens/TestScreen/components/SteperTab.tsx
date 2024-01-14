import { Star } from "assets/svg";
import ListPicker from "components/ListPicker/ListPicker";
import { PSteps, PStep } from "components/PSteps";
import { Text } from "components/Text";
import { useState } from "react";

import { useThemeTestContext } from "./TemeContext";

const Items = [
  { icon: <Star color="white" />, text: "drop-item1", value: "drop-item1" },
  { icon: <Star color="white" />, text: "drop-item2", value: "drop-item2" },
  { icon: <Star color="white" />, text: "drop-item3", value: "drop-item3" },
  { icon: <Star color="white" />, text: "drop-item4", value: "drop-item4" },
  { icon: <Star color="white" />, text: "drop-item5", value: "drop-item5" },
  { icon: <Star color="white" />, text: "drop-item6", value: "6" },
  { icon: <Star color="white" />, text: "drop-item7", value: "item7" },
  { icon: <Star color="white" />, text: "drop-item8", value: "drop-item8 dsa  das a" },
  { icon: <Star color="white" />, text: "drop-item1", value: "drop-item1" },
  { icon: <Star color="white" />, text: "drop-item2", value: "drop-item2" },
  { icon: <Star color="white" />, text: "drop-item3", value: "drop-item3" },
  { icon: <Star color="white" />, text: "drop-item4", value: "drop-item4" },
  { icon: <Star color="white" />, text: "drop-item5", value: "drop-item5" },
  { icon: <Star color="white" />, text: "drop-item6", value: "6" },
  { icon: <Star color="white" />, text: "drop-item7", value: "item7" },
  { icon: <Star color="white" />, text: "drop-item8", value: "drop-item8 dsa  das a" },
  { icon: <Star color="white" />, text: "drop-item1", value: "drop-item1" },
  { icon: <Star color="white" />, text: "drop-item2", value: "drop-item2" },
  { icon: <Star color="white" />, text: "drop-item3", value: "drop-item3" },
  { icon: <Star color="white" />, text: "drop-item4", value: "drop-item4" },
  { icon: <Star color="white" />, text: "drop-item5", value: "drop-item5" },
  { icon: <Star color="white" />, text: "drop-item6", value: "6" },
  { icon: <Star color="white" />, text: "drop-item7", value: "item7" },
  { icon: <Star color="white" />, text: "drop-item8", value: "drop-item8 dsa  das a" },
  { icon: <Star color="white" />, text: "drop-item1", value: "drop-item1" },
  { icon: <Star color="white" />, text: "drop-item2", value: "drop-item2" },
  { icon: <Star color="white" />, text: "drop-item3", value: "drop-item3" },
  { icon: <Star color="white" />, text: "drop-item4", value: "drop-item4" },
  { icon: <Star color="white" />, text: "drop-item5", value: "drop-item5" },
  { icon: <Star color="white" />, text: "drop-item6", value: "6" },
  { icon: <Star color="white" />, text: "drop-item7", value: "item7" },
  { icon: <Star color="white" />, text: "drop-item8", value: "drop-item8 dsa  das a" },
];

export default function SteperTab() {
  const [single, setSingle] = useState("drop-item1");
  const [multiple, setMultiple] = useState(["drop-item1", "drop-item2"]);
  const [singleAvatar, setSingleAvatar] = useState("drop-item1");
  const [multipleAvatar, setMultipleAvatar] = useState(["drop-item1", "drop-item2"]);
  const { color } = useThemeTestContext();

  return (
    <>
      <PSteps color={color}>
        <PStep label="First Step">
          <Text>This is the content within step 1!</Text>
          <Text preset="bold" text="Single Picker" />
          <ListPicker
            addText="Choose item..."
            items={Items}
            value={single}
            setSingle={(value: any) => setSingle(value)}
          />
          <Text preset="bold" text="Multi Picker" />
          <ListPicker
            addText="Add item..."
            items={Items}
            value={multiple}
            setMultiple={(value: any) => setMultiple(value)}
            multiple
          />
          <Text preset="bold" text="Single Picker" />
          <ListPicker
            addText="Choose item..."
            items={Items}
            value={singleAvatar}
            setSingle={(value: any) => setSingleAvatar(value)}
            selectedView="avatar"
          />
          <Text preset="bold" text="Multi Picker" />
          <ListPicker
            addText="Add item..."
            items={Items}
            value={multipleAvatar}
            setMultiple={(value: any) => setMultipleAvatar(value)}
            multiple
            selectedView="avatar"
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
