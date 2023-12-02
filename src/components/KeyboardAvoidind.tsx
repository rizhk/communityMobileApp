import { PropsWithChildren } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

export function KeyboardAvoiding({ children, ...props }: PropsWithChildren<KeyboardAvoidingViewProps>) {
  // const height = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 125 : 20}
      // keyboardVerticalOffset={height}
      style={{ flex: 1 }}
      {...props}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
