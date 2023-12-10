import { XStack } from "components/containers/Stack";
import { useState } from "react";
import { inputFieldStyle } from "theme/styles";
import { TextStyle, View, ViewStyle } from "react-native";
import { Text } from "components/Text";
import { t } from "i18n-js";
import { format } from "date-fns";
import { ThemeColorType } from "theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Platform } from "react-native";
import { color as themeColor } from "../../../theme/color";
import { IOSDatePicker } from "./components/IODatePicker";
import { AndroidDatePicker } from "./components/AndroidDatePicker";

export type DatePickerProps = {
  date: Date;
  setDate: (date: any) => void;
  minDate?: Date;
  color?: ThemeColorType;
  style?: ViewStyle;
};

export function DatePicker(props: DatePickerProps) {
  const { minDate, date, setDate, color = "primary", style } = props;
  const [show, setShow] = useState(false);
  const pickerProps = { visible: show, setVisible: setShow, minDate, date, setDate, color };
  return (
    <>
      <TouchableOpacity onPress={() => setShow(true)} style={style}>
        <XStack style={container} jc="space-between" ai="center">
          <Text size="md" preset="bold" text={date.getDate().toString()} style={text} />
          <View style={separatorStyle} />
          <Text
            size="md"
            preset="bold"
            text={t(`month.${format(date, "MMMM").toLowerCase()}`)}
            style={{ flex: 2, textAlign: "center" }}
          />
          <View style={separatorStyle} />
          <Text size="md" preset="bold" text={date.getFullYear().toString()} style={text} />
        </XStack>
      </TouchableOpacity>
      {Platform.OS === "ios" ? <IOSDatePicker {...pickerProps} /> : <AndroidDatePicker {...pickerProps} />}
    </>
  );
}

const container = {
  ...inputFieldStyle,
  paddingHorizontal: 0,
} as ViewStyle;

const text = {
  flex: 1,
  textAlign: "center",
} as TextStyle;

const separatorStyle: ViewStyle = {
  width: 2,
  height: 15,
  backgroundColor: themeColor.grey400,
};
