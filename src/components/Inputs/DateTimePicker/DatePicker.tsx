import { GrowingView } from "components/containers/GrowingView";
import { getDate, getDaysInMonth, getMonth, getYear, setDate as setDay, setMonth, setYear } from "date-fns";
import { translate } from "i18n";
import { useEffect, useMemo, useState } from "react";
import { View, ViewStyle } from "react-native";
import { color } from "theme";
import { rangedItems } from "utils/formHelper";

import { inputContainer, outerContainer } from "./DateTimePicker.style";
import Wheel from "./Wheel";

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
  enable?: boolean;
  minDate?: Date;
};

export function DatePicker(props: DatePickerProps) {
  const { enable = true, minDate, date, setDate } = props;
  const [day, setNewDay] = useState<number>(getDate(date));
  const [month, setNewMonth] = useState<number>(getMonth(date));
  const [year, setNewYear] = useState<number>(getYear(date));
  const [dayKey, setDayKey] = useState(0);
  const [monthKey, setMonthKey] = useState(0);
  const [yearKey, setYearKey] = useState(0);
  const [maxDays, setMaxDays] = useState(getDaysInMonth(new Date(year, month)));
  const now = new Date();
  const yearItems = rangedItems(getYear(now), getYear(now) + 3);
  const dayItems = useMemo(
    () =>
      Array.from({ length: maxDays }, (_, i) => {
        return { value: (i + 1).toString().padStart(2, "0"), label: (i + 1).toString().padStart(2, "0") };
      }),
    [maxDays]
  );

  // force to rerender days picker with setDayKey to handle difference number of days in month
  useEffect(() => {
    if (day > maxDays) setNewDay(maxDays);
    setDayKey((prev) => prev + 1);
  }, [maxDays]);

  const setDayDate = (day: number) => {
    const newDate = setDay(date, day);
    if (minDate && newDate < minDate) {
      setNewDay(getDate(date));
      setDayKey((prev) => prev + 1);
      return;
    }
    setNewDay(day);
    setDate(newDate);
  };

  const setMonthDate = (month: number) => {
    const newDate = setMonth(date, month);
    if (minDate && newDate < minDate) {
      setNewMonth(getMonth(date));
      setMonthKey((prev) => prev + 1);
      return;
    }
    setNewMonth(month);
    if (getDaysInMonth(newDate) !== maxDays) setMaxDays(getDaysInMonth(newDate));
    setDate(newDate);
  };

  const setYearDate = (year: number) => {
    const newDate = setYear(date, year);
    if (minDate && newDate < minDate) {
      setNewYear(getYear(date));
      setYearKey((prev) => prev + 1);
      return;
    }
    setNewYear(year);
    if (getDaysInMonth(newDate) !== maxDays) setMaxDays(getDaysInMonth(newDate));
    setDate(newDate);
  };

  return (
    <View style={outerContainer}>
      <GrowingView open={enable} from={32} to={80} style={{ overflow: "hidden" }}>
        <View style={inputContainer}>
          <Wheel
            value={day}
            setValue={setDayDate}
            items={dayItems}
            itemWidth={45}
            key={"d" + dayKey}
            scrollEnable={enable}
          />
          <View style={separator} />
          <Wheel
            value={month}
            setValue={setMonthDate}
            items={months}
            itemWidth={150}
            key={"m" + monthKey}
            scrollEnable={enable}
          />
          <View style={separator} />
          <Wheel
            value={year}
            setValue={setYearDate}
            items={yearItems}
            itemWidth={80}
            key={yearKey}
            scrollEnable={enable}
          />
        </View>
      </GrowingView>
    </View>
  );
}

const separator = {
  borderRadius: 2,
  width: 2,
  height: 15,
  backgroundColor: color.grey300,
  top: 8,
  marginHorizontal: 2,
} as ViewStyle;
