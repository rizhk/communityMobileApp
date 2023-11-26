import { GFieldProps, useGForm } from "components/GForm/GForm.props";
import { TextStyle, View, ViewStyle } from "react-native";
import { BaseField } from "../BaseField";
import DatePicker from "./DatePicker";
import { Text } from "components/Text";
import TimePicker from "./TimePicker";
import { Button } from "components/Button";
import { useScrollContext } from "../containers/Scroll";
import { Edit } from "assets/svg";
import { min } from "date-fns";
import { useState } from "react";

export interface DateTimePickerProps extends Omit<GFieldProps, "valName"> {
  type?: "date" | "datetime";
  interval?: boolean;
  minDate?: Date;
  valNames: { start: string; end: string };
}

export function DateTimePicker(props: DateTimePickerProps) {
  const { type, interval, minDate = new Date(), valNames, tx, text, containerStyle } = props;
  const { setFieldValue, values } = useGForm();
  const { enable, setEnable } = useScrollContext();
  const [minimalDate] = useState(new Date(minDate ?? 0));
  const toggleEnable = () => {
    setEnable(!enable);
  };

  return (
    <BaseField style={containerStyle}>
      <Text>Start: {values[valNames.start].toString()}</Text>
      <Text>end: {values[valNames.end].toString()}</Text>

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
      <DatePicker
        date={values[valNames.start]}
        setDate={(date) => setFieldValue(valNames.start, date)}
        minDate={minimalDate}
        enable={!enable}
      />
      <View style={timeLine}>
        <Text tx="timePicker.from" style={timeLabel} />
        <TimePicker
          date={values[valNames.start]}
          setDate={(date) => setFieldValue(valNames.start, date)}
          minDate={minimalDate}
          enable={!enable}
        />
        <Text tx="timePicker.to" style={timeLabel} />
        <TimePicker
          date={values[valNames.end]}
          setDate={(date) => setFieldValue(valNames.end, date)}
          minDate={minimalDate}
          enable={!enable}
        />
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
