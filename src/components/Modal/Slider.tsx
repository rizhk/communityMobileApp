import { DownArrow } from "assets/svg";
import { Button } from "components/Button";
import { PropsWithChildren } from "react";
import { Modal, View, ViewStyle } from "react-native";
import { color, radius, spacing } from "theme";

import { ModalProps } from "./modal.props";

export function Slider(props: PropsWithChildren<ModalProps>) {
  const { children, visible, setVisible, color = "primary" } = props;
  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View style={container}>
        <View style={inner}>
          <Button
            icon={DownArrow}
            size="lg"
            onPress={() => setVisible(false)}
            rounded
            iconScale={2.5}
            style={closeBtn}
            color={color}
          />
          {children}
        </View>
      </View>
    </Modal>
  );
}

const container = {
  display: "flex",
  flexDirection: "column-reverse",
  flex: 1,
  position: "relative",
  zIndex: 100,
} as ViewStyle;

const inner = {
  backgroundColor: color.black,
  height: "85%",
  width: "100%",
  padding: spacing.md,
  paddingTop: spacing.xl,
  borderTopLeftRadius: radius.xxl,
  borderTopRightRadius: radius.xxl,
} as ViewStyle;

const closeBtn = {
  alignSelf: "center",
  position: "absolute",
  top: -30,
} as ViewStyle;
