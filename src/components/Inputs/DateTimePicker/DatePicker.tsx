import { Text } from "components/Text";
import { XStack } from "components/containers/Stack";
import { format } from "date-fns";
import { t } from "i18n-js";
import { useState } from "react";
import { TextStyle, View, ViewStyle, Platform, TouchableOpacity } from "react-native";

import { ThemeColorType } from "theme";
import { inputFieldStyle } from "theme/styles";

import { AndroidDatePicker } from "./components/AndroidDatePicker";
import { IOSDatePicker } from "./components/IODatePicker";
import { color as themeColor } from "../../../theme/color";
import { Button } from "components/Button";

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

  const onShow = () => {
    setShow(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={onShow} style={style}>
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
    </View>
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
