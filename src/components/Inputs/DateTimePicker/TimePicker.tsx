import { Text } from "components/Text";
import { XStack } from "components/containers/Stack";
import { useState } from "react";
import { TextStyle, View, ViewStyle, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeColorType, spacing } from "theme";
import { inputFieldStyle } from "theme/styles";

import { AndroidDatePicker } from "./components/AndroidDatePicker";
import { IOSDatePicker } from "./components/IODatePicker";
import { DatePickerProps } from "./components/DatePicker.props";

export function TimePicker(props: DatePickerProps) {
  const { minimumDate, maximumDate, date, setDate, color = "primary", txLabel, style } = props;
  const [show, setShow] = useState(false);

  const pickerProps = {
    mode: "time" as const,
    visible: show,
    setVisible: setShow,
    minimumDate,
    maximumDate,
    date,
    setDate,
    color,
    txLabel,
  };

  return (
    <View style={{ width: 100 }}>
      <TouchableOpacity onPress={() => setShow(true)} style={style}>
        <XStack style={container} jc="space-between" ai="center">
          <Text size="sm" preset="bold" text={date.getHours().toString().padStart(2, "0")} style={text} />
          <Text size="sm" preset="bold" text=":" style={text} />
          <Text size="sm" preset="bold" text={date.getMinutes().toString().padStart(2, "0")} style={text} />
        </XStack>
      </TouchableOpacity>
      {Platform.OS === "ios" ? <IOSDatePicker {...pickerProps} /> : <AndroidDatePicker {...pickerProps} />}
    </View>
  );
}

const container = {
  ...inputFieldStyle,
  paddingHorizontal: spacing.sm,
} as ViewStyle;

const text = {
  flex: 1,
  textAlign: "center",
} as TextStyle;
