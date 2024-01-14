import { TouchableOpacity, View } from "react-native";
import { StackProps } from "./Stack.props";
import { getProps } from "./Stack.helper";

export function Stack(props: StackProps) {
  const { styles, rest } = getProps(props);
  if (props.onPress == undefined)
    return (
      <View style={styles} {...rest}>
        {props.children}
      </View>
    );
  return (
    <TouchableOpacity style={styles} {...rest}>
      {props.children}
    </TouchableOpacity>
  );
}

export function XStack(props: Omit<StackProps, "direction">) {
  const { styles, rest } = getProps({ direction: "row", ...props });
  if (props.onPress == undefined)
    return (
      <View style={styles} {...rest}>
        {props.children}
      </View>
    );
  return (
    <TouchableOpacity style={styles} {...rest}>
      {props.children}
    </TouchableOpacity>
  );
}

export function YStack(props: Omit<StackProps, "direction">) {
  const { styles, rest } = getProps({ direction: "column", ...props });
  if (props.onPress == undefined)
    return (
      <View style={styles} {...rest}>
        {props.children}
      </View>
    );
  return (
    <TouchableOpacity style={styles} {...rest}>
      {props.children}
    </TouchableOpacity>
  );
}
