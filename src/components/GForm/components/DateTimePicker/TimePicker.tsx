import { useEffect, useState } from "react";
import { TextStyle, View } from "react-native";
import Wheel from "./Wheel";
import { rangedItems } from "utils/formHelper";
import { Text } from "components/Text";
import { inputContainer, outerContainer } from "./DateTimePicker.style";
import { GrowingView } from "../containers/GrowingView";
import { getHours, getMinutes, set } from "date-fns";

type TimePickerProps = {
  date: Date;
  setDate: (date: any) => void;
  minDate?: Date;
  enable?: boolean;
};

export default function TimePicker(props: TimePickerProps) {
  const { date, setDate, enable = true, minDate } = props;
  const [hours, setHours] = useState(getHours(date));
  const [minutes, setMinutes] = useState(getMinutes(date));
  const [minKey, setMinKey] = useState(0);
  const [hourKey, setHourKey] = useState(0);
  const hourItems = rangedItems(0, 23, 2);
  const minuteItems = rangedItems(0, 59, 2);

  useEffect(() => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
    if (minDate && newDate < minDate) {
      setMinutes(getMinutes(date));
      setHours(getHours(date));
      setMinKey((prev) => prev + 1);
      setHourKey((prev) => prev + 1);
      return;
    }
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes));
  }, [hours, minutes]);

  return (
    <View style={outerContainer}>
      <GrowingView open={enable} from={32} to={80} style={{ overflow: "hidden" }}>
        <View style={inputContainer}>
          <Wheel
            value={hours}
            setValue={setHours}
            items={hourItems}
            itemWidth={38}
            scrollEnable={enable}
            key={"h" + hourKey}
          />
          <Text text=":" style={dots} />
          <Wheel
            value={minutes}
            setValue={setMinutes}
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
