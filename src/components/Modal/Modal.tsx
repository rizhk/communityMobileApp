import { DownArrow } from "assets/svg";
import { Button } from "components/Button";
import { PropsWithChildren } from "react";
import { Modal as RNModal, View, ViewStyle } from "react-native";
import { color, radius, spacing } from "theme";

export type ModalProps = {
  visible: boolean;
  setVisible: (v: boolean) => void;
};

export function Modal(props: PropsWithChildren<ModalProps>) {
  const { children, visible, setVisible } = props;
  return (
    <RNModal animationType="slide" visible={visible} transparent={true}>
      <View style={container}>
        <View style={inner}>
          <Button
            icon={DownArrow}
            size="md"
            onPress={() => setVisible(false)}
            rounded
            style={closeBtn}
          />
          {children}
        </View>
      </View>
    </RNModal>
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
  borderRadius: radius.xxl,
} as ViewStyle;

const closeBtn = {
  alignSelf: "center",
  position: "absolute",
  top: -30,
} as ViewStyle;
