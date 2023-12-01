import { TextStyle, View, ViewStyle } from "react-native";
import { DatePicker } from "./DatePicker";
import { Text } from "components/Text";
import { TimePicker } from "./TimePicker";
import { useScrollContext } from "components/containers/Scroll";
import { useState } from "react";

export interface DateTimePickerProps {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  type?: "date" | "datetime";
  interval?: boolean;
  minDate?: Date;
  //if nested in a Scroll component from components/container/Scroll.tsx
  nestedScrollEnabled?: boolean;
}

export function DateTimePicker(props: DateTimePickerProps) {
  const {
    type,
    interval,
    minDate = new Date(),
    nestedScrollEnabled = false,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = props;
  const { enableScroll, setEnableScroll } = useScrollContext();
  const [minimalDate] = useState(new Date(minDate ?? 0));
  const toggleEnable = () => {
    setEnableScroll(!enableScroll);
  };

  return (
    <>
      <DatePicker
        date={startDate}
        setDate={setStartDate}
        minDate={minimalDate}
        enable={!nestedScrollEnabled || !enableScroll}
      />
      <View style={timeLine}>
        <Text tx="timePicker.from" style={timeLabel} />
        <TimePicker
          date={startDate}
          setDate={setEndDate}
          minDate={minimalDate}
          enable={!nestedScrollEnabled || !enableScroll}
        />
        <Text tx="timePicker.to" style={timeLabel} />
        <TimePicker
          date={endDate}
          setDate={setEndDate}
          minDate={minimalDate}
          enable={!nestedScrollEnabled || !enableScroll}
        />
      </View>
    </>
  );
}

const timeLine = {
  flexDirection: "row",
  justifyContent: "center",
  gap: 10,
} as ViewStyle;

const timeLabel = {
  textTransform: "uppercase",
  fontFamily: "",
  fontWeight: "800",
  fontSize: 16,
  marginTop: 6,
} as TextStyle;
