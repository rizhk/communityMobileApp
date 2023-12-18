import { Text } from "components/Text";
import { XStack } from "components/containers/Stack";
import { format } from "date-fns";
import { t } from "i18n-js";
import { useState } from "react";
import { TextStyle, View, ViewStyle, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeColorType } from "theme";
import { inputFieldStyle } from "theme/styles";

import { AndroidDatePicker } from "./components/AndroidDatePicker";
import { IOSDatePicker } from "./components/IODatePicker";
import { color as themeColor } from "../../../theme/color";
import { DatePickerProps } from "./components/DatePicker.props";

export function DatePicker(props: DatePickerProps) {
  const { minimumDate, maximumDate, date, setDate, color = "primary", style, txLabel } = props;
  const [show, setShow] = useState(false);
  const pickerProps = { visible: show, setVisible: setShow, minimumDate, maximumDate, date, setDate, color, txLabel };

  return (
    <>
      {/* <Text text={} */}
      <TouchableOpacity onPress={() => setShow(true)} style={style}>
        <XStack style={container} jc="space-between" ai="center">
          <Text size="sm" preset="bold" text={date.getDate().toString()} style={text} />
          <View style={separatorStyle} />
          <Text
            size="sm"
            preset="bold"
            text={t(`month.${format(date, "MMMM").toLowerCase()}`)}
            style={{ flex: 2, textAlign: "center" }}
          />
          <View style={separatorStyle} />
          <Text size="sm" preset="bold" text={date.getFullYear().toString()} style={text} />
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
