import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "components/Button";
import { Popup } from "components/Modal";
import { Text } from "components/Text";
import { XStack } from "components/containers/Stack/Stack";
import { i18n } from "i18n";
import { useState } from "react";

import { NativeDatePickerProps } from "./DatePicker.props";

export function IOSDatePicker(props: NativeDatePickerProps) {
  const { visible, setVisible, minimumDate, maximumDate, date, setDate, color, mode = "date", txLabel } = props;
  const [datePick, setDatePick] = useState(date);

  const tx = txLabel ?? `datePicker.${mode == "date" ? "chooseDate" : "chooseTime"}`;
  return (
    <Popup visible={visible} setVisible={() => setVisible(false)} color={color}>
      <Text tx={tx} preset="header" />
      <DateTimePicker
        value={date}
        display="spinner"
        minimumDate={minimumDate}
        maximumDate={maximumDate}
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
