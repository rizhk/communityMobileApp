import { PSteps, PStep } from "components/PSteps";
import { Text } from "components/Text";
import { useState } from "react";
import { ThemeColorType } from "theme/color";
import { Star } from "assets/svg";
import { Icon } from "components/Icon";

import ColorPicker from "./ColorPicker";
import ListPicker from "components/ListPicker/ListPicker";

const Items = [
  { icon: () => <Icon icon={Star} />, text: "drop-item1", value: "drop-item1" },
  { icon: () => <Icon icon={Star} />, text: "drop-item2", value: "drop-item2" },
  { icon: () => <Icon icon={Star} />, text: "drop-item3", value: "drop-item3" },
];

export default function SteperTab() {
  const [color, setColor] = useState("primary" as ThemeColorType);

  return (
    <>
      <ColorPicker setColor={setColor} />
      <PSteps color={color}>
        <PStep label="First Step">
          <Text>This is the content within step 1!</Text>
          <ListPicker items={Items} />
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
