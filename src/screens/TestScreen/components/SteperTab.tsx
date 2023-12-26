import { DatePicker, TimeInterval, TimePicker } from "components/Inputs/";
import { PSteps, PStep } from "components/PSteps";
import { Text } from "components/Text";
import { YStack } from "components/containers/Stack/Stack";
import { format } from "date-fns";
import { useState } from "react";
import { ThemeColorType } from "theme/color";

import ColorPicker from "./ColorPicker";

export default function SteperTab() {
  const [color, setColor] = useState("primary" as ThemeColorType);
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [time, setTime] = useState(new Date());

  return (
    <>
      <ColorPicker setColor={setColor} />
      <PSteps color={color}>
        <PStep label="First Step">
          <Text>This is the content within step 1!</Text>
          <Text>{date.toString()}</Text>
          <Text>{time.toString()}</Text>
          <YStack borderColor="primary" borderWidth={1} borderRadius="sm" pa="md">
            <DatePicker date={date} setDate={setDate} color="secondary" />
            <TimePicker date={time} setDate={setTime} color="secondary" />
          </YStack>
          <Text>date1: {format(date1, "dd - MMMM - yyyy   HH:mm")}</Text>
          <Text>date2: {format(date2, "dd - MMMM - yyyy   HH:mm")}</Text>
          <TimeInterval start={date1} end={date2} setStart={setDate1} setEnd={setDate2} />
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
