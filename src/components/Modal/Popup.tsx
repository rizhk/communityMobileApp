import { Cross } from "assets/svg";
import { Button } from "components/Button";
import { BlurView } from "expo-blur";
import { PropsWithChildren } from "react";
import { Modal, Pressable, TouchableOpacity, ViewStyle } from "react-native";
import { color, radius, spacing } from "theme";
import { shadowStyle } from "theme/styles";

import { ModalProps } from "./modal.props";

interface PopupProps extends ModalProps {
  blur?: number;
}

export function Popup(props: PropsWithChildren<PopupProps>) {
  const { children, visible, setVisible, color = "primary", blur = 10 } = props;
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity onPress={() => setVisible(false)} style={modalStyle}>
        <BlurView intensity={blur} tint="dark" style={blurStyle}>
          <Pressable style={container} onPress={() => {}}>
            <Button
              rounded
              size="sm"
              icon={Cross}
              iconScale={2}
              color={color}
              onPress={() => setVisible(false)}
              style={{ top: spacing.xs, right: spacing.xs, position: "absolute" }}
            />
            {children}
          </Pressable>
        </BlurView>
      </TouchableOpacity>
    </Modal>
  );
}

const modalStyle = {
  flex: 1,
  width: "100%",
} as ViewStyle;

const blurStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
} as ViewStyle;

const container = {
  padding: spacing.md,
  borderRadius: radius.md,
  backgroundColor: color.grey700,
  ...shadowStyle,
  shadowRadius: 10,
  width: "80%",
} as ViewStyle;
