import {
  View,
  StyleProp,
  ViewStyle,
  TextInput as RNTextInput,
  TextInputProps as RnTextInputProps,
} from "react-native";
import { GFieldProps, useGForm } from "../GForm.props";
import { Text } from "components/Text";
import { color, radius, spacing } from "theme";

export interface TextInputProps extends GFieldProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
}

export default function TextInput({
  containerStyle,
  valName,
  tx,
  text,
  inputStyle = {},
  ...props
}: TextInputProps & RnTextInputProps) {
  const { handleBlur, values, errors, setFieldValue } = useGForm();

  return (
    <View style={[container, containerStyle]}>
      <Text tx={tx} text={text} preset="inputLabel" />
      <RNTextInput
        onChangeText={(text) => setFieldValue(valName, text)}
        onBlur={handleBlur(valName)}
        value={values[valName]}
        placeholderTextColor={color.grey100}
        style={[input, inputStyle]}
        {...props}
      />
      {errors[valName] !== undefined && <Text text={errors[valName]} preset="fieldError" />}
    </View>
  );
}

const container = {
  paddingVertical: spacing.sm,
  gap: spacing.xs,
} as ViewStyle;

const input = {
  backgroundColor: color.grey600,
  padding: spacing.sm,
  borderRadius: radius.md,
  color: color.white,
} as ViewStyle;
