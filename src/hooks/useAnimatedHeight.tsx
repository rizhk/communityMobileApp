import { useRef } from "react";
import { Animated } from "react-native";

function getSizeAnimationConfig(size: number, duration: number) {
  return {
    toValue: size,
    duration,
    useNativeDriver: false,
  };
}

export function useAnimatedSize(from: number, to: number, duration: number = 100) {
  const sizeValue = useRef(new Animated.Value(from)).current;

  const grow = () => {
    Animated.timing(sizeValue, getSizeAnimationConfig(to, duration)).start();
  };

  const shrink = () => {
    Animated.timing(sizeValue, getSizeAnimationConfig(from, duration)).start();
  };

  return { sizeValue, grow, shrink };
}
