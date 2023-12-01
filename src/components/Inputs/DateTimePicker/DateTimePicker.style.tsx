import { inputFieldStyle } from "theme/styles";
import { ViewStyle } from "react-native";

export const outerContainer = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as ViewStyle;

export const inputContainer = {
  ...inputFieldStyle,
  paddingHorizontal: 5,
  flexDirection: "row",
  borderRadius: 50,
  height: 32,
  paddingTop: 2,
} as ViewStyle;
