import DateTimePicker from "@react-native-community/datetimepicker";
import { i18n } from "i18n";
import { useState } from "react";
import { ThemeColorType } from "theme";

type AndroidDatePickerProps = {
  visible: boolean;
  setVisible: (vis: boolean) => void;
  minDate?: Date;
  date: Date;
  setDate: (date: any) => void;
  color?: ThemeColorType;
  mode?: "date" | "time";
};

export function AndroidDatePicker(props: AndroidDatePickerProps) {
  const { visible, setVisible, minDate, date, setDate, mode } = props;
  if (!visible) return null;
  return (
    <DateTimePicker
      value={date}
      display="spinner"
      minimumDate={minDate}
      onChange={(_event, selectedDate) => {
        const currentDate = selectedDate || date;
        setVisible(false);
        setDate(selectedDate);
      }}
      onPointerCancel={() => setVisible(false)}
      // onPointerEnter={() => {
      //   setVisible(false);
      //   setDate(datePick);
      // }}
      mode={mode}
      locale={i18n.locale}
    />
  );
}
