import { PSteps as PPSteps, PStep } from "components/PSteps";
import { Text } from "components/Text";
import { useState } from "react";
import { ThemeColorType } from "theme/color";

import ColorPicker from "./ColorPicker";

export default function SteperTab() {
  const [color, setColor] = useState("primary" as ThemeColorType);
  return (
    <>
      <ColorPicker setColor={setColor} />
      <PPSteps color={color}>
        <PStep label="First Step">
          <Text>This is the content within step 1!</Text>
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
      </PPSteps>
    </>
  );
}
