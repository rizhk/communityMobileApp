import DateTimePicker from "@react-native-community/datetimepicker";
import { i18n } from "i18n";

import { NativeDatePickerProps } from "./DatePicker.props";

export function AndroidDatePicker(props: NativeDatePickerProps) {
  const { visible, setVisible, minimumDate, maximumDate, date, setDate, mode, txLabel } = props;

  if (!visible) return null;
  return (
    <DateTimePicker
      value={date}
      display="spinner"
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      onChange={(_event, selectedDate) => {
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
