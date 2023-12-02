import { Text } from "components/Text";
import { GrowingView } from "components/containers/GrowingView";
import { getHours, getMinutes, setHours as setHoursFns, setMinutes as setMinutesFns } from "date-fns";
import { useState } from "react";
import { TextStyle, View } from "react-native";
import { rangedItems } from "utils/formHelper";

import { inputContainer, outerContainer } from "./DateTimePicker.style";
import Wheel from "./Wheel";

type TimePickerProps = {
  date: Date;
  setDate: (date: any) => void;
  minDate?: Date;
  enable?: boolean;
};

export function TimePicker(props: TimePickerProps) {
  const { date, setDate, enable = true, minDate } = props;
  const [hours, setHours] = useState(getHours(date));
  const [minutes, setMinutes] = useState(getMinutes(date));
  const [minKey, setMinKey] = useState(0);
  const [hourKey, setHourKey] = useState(0);
  const hourItems = rangedItems(0, 23, 2);
  const minuteItems = rangedItems(0, 59, 2);

  const setHourDate = (hour: number) => {
    const newDate = setHoursFns(date, hour);
    if (minDate && newDate < minDate) {
      setHours(getHours(date));
      setHourKey((prev) => prev + 1);
      return;
    }
    setDate(newDate);
  };

  const setMinuteDate = (minute: number) => {
    const newDate = setMinutesFns(date, minute);
    if (minDate && newDate < minDate) {
      setMinutes(getMinutes(date));
      setMinKey((prev) => prev + 1);
      return;
    }
    setDate(newDate);
  };
  return (
    <View style={outerContainer}>
      <GrowingView open={enable} from={32} to={80} style={{ overflow: "hidden" }}>
        <View style={inputContainer}>
          <Wheel
            value={hours}
            setValue={setHourDate}
            items={hourItems}
            itemWidth={38}
            scrollEnable={enable}
            key={"h" + hourKey}
          />
          <Text text=":" style={dots} />
          <Wheel
            value={minutes}
            setValue={setMinuteDate}
            items={minuteItems}
            scrollEnable={enable}
            key={"m" + minKey}
          />
        </View>
      </GrowingView>
    </View>
  );
}

const dots = {
  fontFamily: "",
  fontWeight: "900",
  fontSize: 18,
  lineHeight: 25,
  height: 30,
} as TextStyle;
