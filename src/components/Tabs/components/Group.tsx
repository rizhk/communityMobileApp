import { PropsWithChildren } from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import { spacing } from "theme";

export function TabsGroup(props: PropsWithChildren<ViewProps>) {
  const { children, style, ...rest } = props;
  return (
    <View style={[group, style]} {...rest}>
      {children}
    </View>
  );
}

const group = {
  display: "flex",
  flexDirection: "row",
  marginVertical: spacing.xs,
  gap: spacing.md,
  marginHorizontal: spacing.md,
} as ViewStyle;
