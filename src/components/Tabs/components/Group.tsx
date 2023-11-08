import { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export type GroupProps = {
  style?: StyleProp<ViewStyle>;
};

export function TabsGroup({ children, style }: PropsWithChildren<GroupProps>) {
  return <View style={[group, style]}>{children}</View>;
}

const group = {
  display: "flex",
  flexDirection: "row",
  marginVertical: 10,
  gap: 20,
  marginHorizontal: 20,
} as ViewStyle;
