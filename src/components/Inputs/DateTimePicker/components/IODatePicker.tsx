import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "components/Button";
import { Popup } from "components/Modal";
import { XStack } from "components/containers/Stack";
import { i18n } from "i18n";
import { useState } from "react";
import { ThemeColorType } from "theme";

type IOSDatePickerProps = {
  visible: boolean;
  setVisible: (vis: boolean) => void;
  minDate?: Date;
  date: Date;
  setDate: (date: any) => void;
  color?: ThemeColorType;
  mode?: "date" | "time";
  label?: i18n.Scope;
};

export function IOSDatePicker(props: IOSDatePickerProps) {
  const { visible, setVisible, minDate, date, setDate, color, mode } = props;
  const [datePick, setDatePick] = useState(date);

  return (
    <Popup visible={visible} setVisible={() => setVisible(false)} color={color}>
      <DateTimePicker
        value={date}
        display="spinner"
        minimumDate={minDate}
        onChange={(_event, selectedDate) => {
          const currentDate = selectedDate || date;
          setDatePick(currentDate);
        }}
        textColor="white"
        mode={mode}
        locale={i18n.locale}
      />
      <XStack jc="space-between" gap="sm">
        <Button
          tx="common.cancel"
          size="xs"
          preset="plainText"
          color={color}
          onPress={() => setVisible(false)}
          style={{ flex: 1 }}
        />
        <Button
          tx="common.ok"
          size="xs"
          color={color}
          onPress={() => {
            setDate(datePick);
            setVisible(false);
          }}
          style={{ flex: 1 }}
        />
      </XStack>
    </Popup>
  );
}
