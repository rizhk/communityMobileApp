import { GFieldProps, useGForm } from "components/GForm/GForm.props";
import { TextStyle, View, ViewStyle } from "react-native";
import { BaseField } from "../BaseField";
import DatePicker from "./DatePicker";
import { useState } from "react";
import { Text } from "components/Text";
import TimePicker from "./TimePicker";
import { Button } from "components/Button";
import { useScrollContext } from "../containers/Scroll";
import { Edit } from "assets/svg";

export interface DateTimePickerProps extends Omit<GFieldProps, "valName"> {
  type?: "date" | "datetime";
  interval?: boolean;
  minDate?: Date;
  valNames: { start: string; end: string };
}

export function DateTimePicker(props: DateTimePickerProps) {
  const { type, interval, minDate, valNames, tx, text, containerStyle } = props;
  const { handleChange, setFieldValue, values } = useGForm();
  const [date, setDate] = useState(values[valNames.start]);
  const [startDate, setStartDate] = useState(values[valNames.start]);
  const [endDate, setEndDate] = useState(values[valNames.end]);
  const { enable, setEnable } = useScrollContext();

  const toggleEnable = () => {
    setEnable(!enable);
  };

  return (
    <BaseField style={containerStyle}>
      <View style={header}>
        <BaseField.Label tx={tx} text={text} />
        <Button
          onPress={toggleEnable}
          text={enable ? "edit" : "save"}
          preset="small"
          icon={enable ? Edit : undefined}
          iconScale={1.2}
          iconPosition="left"
        />
      </View>
      <DatePicker date={date} setDate={(date) => setFieldValue(date, date)} enable={!enable} />
      <View style={timeLine}>
        <Text tx="timePicker.from" style={timeLabel} />
        <TimePicker date={startDate} setDate={setEndDate} enable={!enable} />
        <Text tx="timePicker.to" style={timeLabel} />
        <TimePicker date={endDate} setDate={setEndDate} enable={!enable} />
      </View>
    </BaseField>
  );
}

const header = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
} as ViewStyle;

const timeLine = {
  flexDirection: "row",
  justifyContent: "center",
  gap: 10,
} as ViewStyle;

const timeLabel = {
  textTransform: "uppercase",
  fontFamily: "",
  fontWeight: "800",
  fontSize: 16,
  marginTop: 6,
} as TextStyle;
