import { XStack, YStack } from "components/containers/Stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { inputFieldStyle } from "theme/styles";
import { View } from "react-native";

export type DatePickerProps = {
  date: Date;
  setDate: (date: any) => void;
  enable?: boolean;
  minDate?: Date;
};

export function DatePicker2(props: DatePickerProps) {
  const { enable = true, minDate, date, setDate } = props;

  return (
    <YStack>
      <View style={inputFieldStyle} />
      <DateTimePicker
        value={date}
        display="spinner"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || date;
          setDate(currentDate);
        }}
        textColor="white"
        style={{}}
      />
    </YStack>
  );
}
