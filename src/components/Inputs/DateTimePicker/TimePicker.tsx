import { XStack } from "components/containers/Stack";
import { useState } from "react";
import { inputFieldStyle } from "theme/styles";
import { TextStyle, View, ViewStyle } from "react-native";
import { Text } from "components/Text";
import { ThemeColorType, spacing } from "theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Platform } from "react-native";
import { IOSDatePicker } from "./components/IODatePicker";
import { AndroidDatePicker } from "./components/AndroidDatePicker";

export type DatePickerProps = {
  date: Date;
  setDate: (date: any) => void;
  minDate?: Date;
  color?: ThemeColorType;
  style?: ViewStyle;
};

export function TimePicker(props: DatePickerProps) {
  const { minDate, date, setDate, color = "primary", style } = props;
  const [show, setShow] = useState(false);

  const pickerProps = {
    mode: "time" as "time",
    visible: show,
    setVisible: setShow,
    minDate,
    date,
    setDate,
    color,
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
