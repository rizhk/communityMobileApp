import { PropsWithChildren } from "react";
import { Modal, Pressable, TouchableOpacity, ViewStyle } from "react-native";
import { color, radius, spacing } from "theme";
import { shadowStyle } from "theme/styles";
import { ModalProps } from "./modal.props";
import { BlurView } from "expo-blur";

export function Popup(props: PropsWithChildren<ModalProps>) {
  const { children, visible, setVisible } = props;
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableOpacity onPress={() => setVisible(false)} style={modalStyle}>
        <BlurView intensity={10} tint="dark" style={modalStyle}>
          <Pressable style={container} onPress={() => {}}>
            {children}
          </Pressable>
        </BlurView>
      </TouchableOpacity>
    </Modal>
  );
}

const modalStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
} as ViewStyle;

const container = {
  padding: spacing.md,
  borderRadius: radius.md,
  backgroundColor: color.grey700,
  ...shadowStyle,
  shadowRadius: 10,
  width: "80%",
} as ViewStyle;
