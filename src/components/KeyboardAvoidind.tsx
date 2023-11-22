import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform } from "react-native";

export function KeyboardAvoiding({
  children,
  ...props
}: PropsWithChildren<KeyboardAvoidingViewProps>) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 125 : 20}
      style={{ flex: 1 }}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
