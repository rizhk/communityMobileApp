import { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export type BodyProps = {
  style?: StyleProp<ViewStyle>;
};

export function TabsBody({ children, style }: PropsWithChildren<BodyProps>) {
  return <View style={[body, style]}>{children}</View>;
}

const body = {
  flexGrow: 1,
  flexShrink: 1,
  overflow: "scroll",
} as ViewStyle;
