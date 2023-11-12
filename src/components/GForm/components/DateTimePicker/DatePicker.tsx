import { Button } from "components/Button";
import { getDate, getDaysInMonth, getMonth, getYear } from "date-fns";
import { translate } from "i18n";
import { useEffect, useMemo, useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import { color, inputFieldStyle } from "theme";
import Wheel from "./Wheel";
import { rangedItems } from "utils/formHelper";

const months = [
  { value: "0", label: translate("month.january") },
  { value: "1", label: translate("month.february") },
  { value: "2", label: translate("month.march") },
  { value: "3", label: translate("month.april") },
  { value: "4", label: translate("month.may") },
  { value: "5", label: translate("month.june") },
  { value: "6", label: translate("month.jully") },
  { value: "7", label: translate("month.august") },
  { value: "8", label: translate("month.september") },
  { value: "9", label: translate("month.october") },
  { value: "10", label: translate("month.november") },
  { value: "11", label: translate("month.december") },
];

type DatePickerProps = {
  date: Date;
  setDate: (date: any) => void;
};

export default function DatePicker(props: DatePickerProps) {
  const { date, setDate } = props;
  const now = new Date();
  const [day, setDay] = useState<number>(getDate(date));
  const [month, setMonth] = useState<number>(getMonth(date));
  const [year, setYear] = useState<number>(getYear(date));
  const [key, setKey] = useState(0);
  const dayItems = useMemo(
    () => rangedItems(1, getDaysInMonth(new Date(year, month)), 2),
    [month, year]
  );
  const yearItems = rangedItems(getYear(now), getYear(now) + 3);
  const test = () => {
    const testDate = `Test: ${day} / ${month} / ${year}`;
    return testDate;
  };

  // force to rerender days picker with setKey to handle difference number of days in month
  useEffect(() => {
    const maxDays = getDaysInMonth(new Date(year, month));
    if (day > maxDays) setDay(maxDays);
    setKey((prev) => prev + 1);
  }, [month, year]);

  useEffect(() => {
    console.log("TEEEEEST  ", year, month, day);
    setDate(new Date(year, month, Number(day) + 1));
  }, [day, month, year]);

  return (
    <View style={container}>
      <Text style={{ color: "white" }}>{test()}</Text>
      <View style={{ height: 90 }}>
        <View style={inputContainer}>
          <Wheel value={day} setValue={setDay} items={dayItems} itemWidth={60} key={key} />
          <View style={separator} />
          <Wheel value={month} setValue={setMonth} items={months} itemWidth={150} />
          <View style={separator} />
          <Wheel value={year} setValue={setYear} items={yearItems} itemWidth={80} />
        </View>
      </View>
      <Button text="DatePicker Test" onPress={test} />
    </View>
  );
}

const container = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as ViewStyle;
const inputContainer = {
  ...inputFieldStyle,
  flexDirection: "row",
  borderRadius: 50,
  height: 30,
  paddingTop: 0,
} as ViewStyle;
const separator = {
  width: 2,
  height: 15,
  backgroundColor: color.grey300,
  top: 8,
} as ViewStyle;
