import { LeftArrow, RightArrow } from "assets/svg";
import { Button } from "components/Button";
import { BlurView } from "expo-blur";
import { useState, useEffect, PropsWithChildren } from "react";
import { Animated, Modal, Dimensions, ViewStyle, Pressable } from "react-native";
import { radius, spacing } from "theme";
import { shadowStyle } from "theme/styles";

import { ModalProps } from "./modal.props";
import { ThemeColorType, color as themeColor } from "../../theme/color";

interface SideSliderProps extends ModalProps {
  onClose?: () => void;
  blur?: number;
  left?: boolean;
  right?: boolean;
  color?: ThemeColorType;
  width?: number;
}

const screenWidth = Dimensions.get("window").width;

export function SideSlider(props: PropsWithChildren<SideSliderProps>) {
  const [animation] = useState(new Animated.Value(0));
  const {
    visible,
    setVisible,
    blur = 10,
    onClose = () => {},
    color = "primary",
    left = false,
    right = true,
    width = 0.9,
    children,
  } = props;

  const isRight = !left && right;
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (visible) {
      setModal(true);
      Animated.timing(animation, {
        toValue: isRight ? (1 - width) * screenWidth : 0, // Anime jusqu'à la position 0
        duration: 300, // Durée de l'animation
        useNativeDriver: true, // Améliore les performances
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: isRight ? screenWidth : -screenWidth, // Replace le modal hors de l'écran
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModal(false));
    }
  }, [visible, animation]);

  const close = () => {
    setVisible(false);
    onClose();
  };

  return (
    <Modal visible={modal} transparent animationType="fade">
      <Pressable onPress={() => setVisible(false)} style={{ height: "100%" }}>
        <BlurView intensity={blur} tint="dark" style={blurStyle}>
          <Animated.View
            style={{
              width: width * screenWidth,
              height: "100%",
              justifyContent: "center",
              transform: [{ translateX: animation }],
            }}
          >
            <Pressable style={{ ...container, width: width * screenWidth }} onPress={() => {}}>
              <Button
                icon={isRight ? RightArrow : LeftArrow}
                size="md"
                onPress={close}
                rounded
                iconScale={2.5}
                color={color}
                style={{ position: "absolute", [isRight ? "left" : "right"]: -15 }}
              />
              {children}
            </Pressable>
          </Animated.View>
        </BlurView>
      </Pressable>
    </Modal>
  );
}

const blurStyle = {
  flex: 1,
  height: "100%",
  position: "relative",
} as ViewStyle;

const container = {
  padding: spacing.md,
  borderRadius: radius.md,
  backgroundColor: themeColor.grey700,
  ...shadowStyle,
  shadowRadius: 10,
  justifyContent: "center",
} as ViewStyle;
