import { GFieldProps, useGForm } from "components/GForm/GForm.props";
import { TextStyle, View, ViewStyle } from "react-native";
import { BaseField } from "../BaseField";
import { inputFieldStyle } from "theme";
import DatePicker from "./DatePicker";
import { useState } from "react";
import { Text } from "components/Text";
import TimePicker from "./TimePicker";

export interface DateTimePickerProps extends GFieldProps {
  type?: "date" | "datetime";
  interval?: boolean;
  minDate?: Date;
}
export function DateTimePicker(props: DateTimePickerProps) {
  const { type, interval, minDate, valName, tx, text, containerStyle } = props;
  const { handleChange, setFieldValue, values } = useGForm();
  const [date, setDate] = useState(values[valName]);
  //   console.log("DateTimePicker : ", date);

  return (
    <BaseField style={containerStyle}>
      <BaseField.Label tx={tx} text={text} />
      <DatePicker date={values[valName]} setDate={(date) => setFieldValue(valName, date)} />
      <View style={timeLine}>
        <Text tx="timePicker.from" style={timeLabel} />
        <TimePicker />
        <Text tx="timePicker.to" style={timeLabel} />
        <TimePicker />
      </View>
    </BaseField>
  );
}

const timeLine = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 15,
} as ViewStyle;

const timeLabel = {
  textTransform: "uppercase",
  fontFamily: "",
  fontWeight: "900",
  fontSize: 18,
} as TextStyle;
