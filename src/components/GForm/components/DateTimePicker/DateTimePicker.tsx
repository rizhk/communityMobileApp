import { GFieldProps, useGForm } from "components/GForm/GForm.props";
import { ViewStyle } from "react-native";
import { BaseField } from "../BaseField";
import { inputFieldStyle } from "theme";
import DatePicker from "./DatePicker";
import { useState } from "react";

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
      {/* <DatePicker date={date} setDate={setDate} /> */}
      <DatePicker date={values[valName]} setDate={(date) => setFieldValue(valName, date)} />
    </BaseField>
  );
}

const test = {
  ...inputFieldStyle,
} as ViewStyle;
