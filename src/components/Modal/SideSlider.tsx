import { useState, useEffect, PropsWithChildren } from "react";
import { Animated, Modal, StyleSheet, Dimensions, ViewStyle, Pressable, TouchableOpacity } from "react-native";
import { Stack, YStack } from "components/containers/Stack";
import { BlurView } from "expo-blur";
import { ModalProps } from "./modal.props";
import { Button } from "components/Button";
import { LeftArrow, RightArrow } from "assets/svg";
import { ThemeColorType, color as themeColor } from "../../theme/color";
import { radius, spacing } from "theme";
import { shadowStyle } from "theme/styles";
//TODO: Add button create activity s'il y pas de données
//TODO: Pouvoir filter par adresse et rediriger dessus sur la map

interface SideSliderProps extends ModalProps {
  onClose?: () => void;
  blur?: number;
  left?: boolean;
  right?: boolean;
  color?: ThemeColorType;
  width?: number;
}

const screenWidth = Dimensions.get("window").width;
const modalStartOffset = screenWidth; // Départ depuis le côté droit
const modalEndOffset = screenWidth * 0.1; // Arrivée à 10% de l'écran

export function SideSlider(props: PropsWithChildren<SideSliderProps>) {
  const [animation] = useState(new Animated.Value(modalStartOffset));
  const {
    visible,
    setVisible,
    blur = 10,
    onClose = () => {},
    color = "primary",
    left = false,
    right = false,
    width = 0.9,
    children,
  } = props;
  const isLeft = left || !right;
  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: (1 - width) * screenWidth, // Anime jusqu'à la position 0
        duration: 300, // Durée de l'animation
        useNativeDriver: true, // Améliore les performances
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: modalStartOffset, // Replace le modal hors de l'écran
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, animation]);

  const close = () => {
    setVisible(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable onPress={() => setVisible(false)} style={{ height: "100%" }}>
        <BlurView intensity={blur} tint="dark" style={blurStyle}>
          <Animated.View
            style={{
              //   width: width * screenWidth,
              height: "100%",
              justifyContent: "center",
              transform: [{ translateX: animation }],
              backgroundColor: "#8008",
            }}
          >
            <Pressable style={{ ...container, width: width * screenWidth }} onPress={() => {}}>
              <Button
                icon={isLeft ? RightArrow : LeftArrow}
                size="lg"
                onPress={close}
                rounded
                iconScale={2.5}
                color={color}
                style={{ position: "absolute", left: -22 }}
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
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
} as ViewStyle;

const container = {
  padding: spacing.md,
  borderRadius: radius.md,
  backgroundColor: themeColor.grey700,
  ...shadowStyle,
  shadowRadius: 10,
} as ViewStyle;
