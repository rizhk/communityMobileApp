import { View, ViewProps, ViewStyle } from "react-native";
import { useGForm } from "../GForm.props";
import { Text } from "components/Text";
import { spacing } from "theme";
import { TextProps } from "components/Text/text.props";

function Label(props: TextProps) {
  return <Text preset="fieldLabel" {...props} />;
}

function ErrorLabel({ valName, ...props }: TextProps & { valName: string }) {
  const { errors } = useGForm();
  if (errors[valName] === undefined) return null;
  return <Text color="pink" text={errors[valName]} preset="fieldError" {...props} />;
}

BaseField.Label = Label;
BaseField.ErrorLabel = ErrorLabel;

export function BaseField({ children, style, ...props }: ViewProps) {
  return <View style={[container, style]}>{children}</View>;
}

const container = {
  paddingVertical: spacing.sm,
  gap: spacing.xs,
} as ViewStyle;
