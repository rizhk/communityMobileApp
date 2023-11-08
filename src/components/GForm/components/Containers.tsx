import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  ScrollViewProps,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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

export function Scroll({ children, ...props }: PropsWithChildren<ScrollViewProps>) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} {...props}>
      {children}
    </ScrollView>
  );
}
