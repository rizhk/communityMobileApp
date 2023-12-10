import { XStack } from "components/containers/Stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Text } from "components/Text";
import { ThemeColorType } from "theme";
import { Popup } from "components/Modal";
import { Button } from "components/Button";
import { i18n } from "i18n";

type IOSDatePickerProps = {
  visible: boolean;
  setVisible: (vis: boolean) => void;
  minDate?: Date;
  date: Date;
  setDate: (date: any) => void;
  color?: ThemeColorType;
  mode?: "date" | "time";
};

export function IOSDatePicker(props: IOSDatePickerProps) {
  const { visible, setVisible, minDate, date, setDate, color, mode } = props;
  const [datePick, setDatePick] = useState(date);

  return (
    <Popup visible={visible} setVisible={() => setVisible(false)} color={color}>
      <Text preset="header" tx="datePicker.chooseDate" />
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
