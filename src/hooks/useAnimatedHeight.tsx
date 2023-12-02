import { useRef } from "react";
import { Animated } from "react-native";

function getHeightAnimationConfig(height: number, duration: number) {
  return {
    toValue: height,
    duration,
    useNativeDriver: false,
  };
}

export function useAnimatedHeight(from: number, to: number, duration: number = 100) {
  const heightValue = useRef(new Animated.Value(from)).current;

  const grow = () => {
    Animated.timing(heightValue, getHeightAnimationConfig(to, duration)).start();
  };

  const shrink = () => {
    Animated.timing(heightValue, getHeightAnimationConfig(from, duration)).start();
  };

  return { heightValue, grow, shrink };
}
