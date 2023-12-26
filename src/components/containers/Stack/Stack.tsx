import { View } from "react-native";
import { StackProps } from "./Stack.props";
import { getProps } from "./Stack.helper";

export function Stack(props: StackProps) {
  const { styles, rest } = getProps(props);
  return (
    <View style={styles} {...rest}>
      {props.children}
    </View>
  );
}

export function XStack(props: Omit<StackProps, "direction">) {
  const { styles, rest } = getProps({ direction: "row", ...props });
  return (
    <View style={styles} {...rest}>
      {props.children}
    </View>
  );
}

export function YStack(props: Omit<StackProps, "direction">) {
  const { styles, rest } = getProps({ direction: "column", ...props });
  return (
    <View style={styles} {...rest}>
      {props.children}
    </View>
  );
}
