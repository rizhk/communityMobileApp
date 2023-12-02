import { Text } from "components/Text";
import { getDate, getHours, getMinutes, getMonth, getYear } from "date-fns";
import { TextStyle, View, ViewStyle } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";

export interface DateTimePickerProps {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  type?: "date" | "datetime";
  interval?: boolean;
  minDate?: Date;
  //if nested in a Scroll component from components/container/Scroll.tsx
  enable?: boolean;
}

export function DateTimePicker(props: DateTimePickerProps) {
  const { type, interval, minDate = new Date(0), startDate, endDate, setStartDate, setEndDate, enable = true } = props;

  const setDate = (date: Date) => {
    setStartDate(new Date(getYear(date), getMonth(date), getDate(date), getHours(startDate), getMinutes(startDate)));
    setEndDate(new Date(getYear(date), getMonth(date), getDate(date), getHours(endDate), getMinutes(endDate)));
  };

  return (
    <>
      <DatePicker date={startDate} setDate={setDate} minDate={minDate} enable={enable} />
      <View style={timeLine}>
        <Text tx="timePicker.from" style={timeLabel} />
        <TimePicker date={startDate} setDate={setStartDate} minDate={minDate} enable={enable} />
        <Text tx="timePicker.to" style={timeLabel} />
        <TimePicker date={endDate} setDate={setEndDate} minDate={startDate} enable={enable} />
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
