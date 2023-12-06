import { PSteps as PPSteps, PStep } from "components/PSteps";
import { Text } from "components/Text";
import { useState } from "react";
import { ThemeColorType } from "theme/color";

import ColorPicker from "./ColorPicker";
import { DatePicker2 } from "components/Inputs";
import { YStack } from "components/containers/Stack";

export default function SteperTab() {
  const [color, setColor] = useState("primary" as ThemeColorType);
  const [date, setDate] = useState(new Date());
  return (
    <>
      <ColorPicker setColor={setColor} />
      <PPSteps color={color}>
        <PStep label="First Step">
          <Text>This is the content within step 1!</Text>
          <Text>{date.toString()}</Text>
          <YStack borderColor="grey500" borderWidth={1} borderRadius="sm">
            <DatePicker2 date={date} setDate={setDate} />
          </YStack>
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
