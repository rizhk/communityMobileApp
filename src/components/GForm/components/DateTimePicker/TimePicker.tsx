import { useState } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import Wheel from "./Wheel";
import { rangedItems } from "utils/formHelper";
import { color, inputFieldStyle } from "theme";
import { Text } from "components/Text";

type TimePickerProps = {};

export default function TimePicker() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const hourItems = rangedItems(0, 23, 2);
  const minuteItems = rangedItems(0, 59, 2);
  return (
    <View style={container}>
      <View style={inputContainer}>
        <Wheel value={hours} setValue={setHours} items={hourItems} itemWidth={38} />
        <Text text=":" style={dots} />
        <Wheel value={minutes} setValue={setMinutes} items={minuteItems} />
      </View>
    </View>
  );
}

const container = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as ViewStyle;

const inputContainer = {
  ...inputFieldStyle,
  flexDirection: "row",
  borderRadius: 50,
  height: 30,
  paddingTop: 0,
} as ViewStyle;

const dots = {
  fontFamily: "",
  fontWeight: "900",
  fontSize: 18,
  lineHeight: 25,
  height: 30,
} as TextStyle;
