import { useRef } from "react";
import { Animated } from "react-native";

const FAD_IN_ANIMATION_CONFIG = {
  toValue: 0.7,
  duration: 100,
  useNativeDriver: true,
};

const FAD_OUT_ANIMATION_CONFIG = {
  toValue: 0.7,
  duration: 100,
  useNativeDriver: true,
};

export function useAnimatedOpacity() {
  const opacityValue = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacityValue, FAD_IN_ANIMATION_CONFIG).start();
  };

  const fadeOut = () => {
    Animated.timing(opacityValue, FAD_OUT_ANIMATION_CONFIG).start();
  };

  return { opacityValue, fadeIn, fadeOut };
}
