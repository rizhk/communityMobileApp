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
  const { children, ...rest } = props;

  return (
    <Stack direction="row" {...rest}>
      {children}
    </Stack>
  );
}

export function YStack(props: Omit<StackProps, "direction">) {
  const { children, ...rest } = props;

  return (
    <Stack direction="column" {...rest}>
      {children}
    </Stack>
  );
}
