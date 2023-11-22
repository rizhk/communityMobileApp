import { useEffect, useState } from "react";
import { TextStyle, View } from "react-native";
import Wheel from "./Wheel";
import { rangedItems } from "utils/formHelper";
import { Text } from "components/Text";
import { inputContainer, outerContainer } from "./DateTimePicker.style";
import { GrowingView } from "../containers/GrowingView";
import { getHours, getMinutes } from "date-fns";

type TimePickerProps = {
  enable?: boolean;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

export default function TimePicker(props: TimePickerProps) {
  const { enable = true, date, setDate } = props;
  const [hours, setHours] = useState(getHours(date));
  const [minutes, setMinutes] = useState(getMinutes(date));

  const hourItems = rangedItems(0, 23, 2);
  const minuteItems = rangedItems(0, 59, 2);

  return (
    <View style={outerContainer}>
      <GrowingView open={enable} from={32} to={80} style={{ overflow: "hidden" }}>
        <View style={inputContainer}>
          <Wheel value={hours} setValue={setHours} items={hourItems} itemWidth={38} scrollEnable={enable} />
          <Text text=":" style={dots} />
          <Wheel value={minutes} setValue={setMinutes} items={minuteItems} scrollEnable={enable} />
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
