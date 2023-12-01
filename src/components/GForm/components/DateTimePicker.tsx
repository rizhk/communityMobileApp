import { GFieldProps, useGForm } from "components/GForm/GForm.props";
import { View, ViewStyle } from "react-native";
import { BaseField } from "./BaseField";
import { Button } from "components/Button";
import { useScrollContext } from "components/containers/Scroll";
import { Edit } from "assets/svg";
import { useState } from "react";
import { DateTimePicker as AppDateTimePicker, DateTimePickerProps as AppDateTimePickerProps } from "components/Inputs";
import { Text } from "components/Text";
import { format } from "date-fns";
export interface DateTimePickerProps extends Omit<GFieldProps, "valName"> {
  valNames: { start: string; end: string };
  nestedScrollEnabled?: boolean;
}

export default function DateTimePicker(
  props: DateTimePickerProps & Omit<AppDateTimePickerProps, "startDate" | "endDate" | "setStartDate" | "setEndDate">
) {
  const { type, interval, minDate, valNames, tx, text, containerStyle, nestedScrollEnabled = false, ...rest } = props;
  const { setFieldValue, values, themeColor } = useGForm();
  const { enableScroll, setEnableScroll } = useScrollContext();
  const [minimalDate] = useState(new Date(minDate ?? 0));
  const toggleEnable = () => {
    setEnableScroll(!enableScroll);
  };

  return (
    <BaseField style={containerStyle}>
      <View style={header}>
        <BaseField.Label tx={tx} text={text} />
        {nestedScrollEnabled && (
          <Button
            onPress={toggleEnable}
            text={enableScroll ? "edit" : "save"}
            size="xs"
            icon={enableScroll ? Edit : undefined}
            iconScale={2}
            iconPosition="left"
            color={themeColor}
          />
        )}
      </View>
      <AppDateTimePicker
        startDate={values[valNames.start]}
        endDate={values[valNames.end]}
        minDate={minimalDate}
        setStartDate={(date) => setFieldValue(valNames.start, date)}
        setEndDate={(date) => setFieldValue(valNames.end, date)}
        enable={!nestedScrollEnabled || !enableScroll}
        {...rest}
      />
    </BaseField>
  );
}

const header = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
} as ViewStyle;
