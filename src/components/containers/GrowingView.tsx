import { useAnimatedSize } from "hooks/useAnimatedHeight";
import { PropsWithChildren, useEffect } from "react";
import { Animated, ViewStyle } from "react-native";

type GrowingViewProps = {
  open: boolean;
  from: number;
  to: number;
  duration?: number;
  style?: ViewStyle;
};
//TODO: TO DELETE after listpicke implemented
export function GrowingView(props: PropsWithChildren<GrowingViewProps>) {
  const { open, from, to, duration = 100, style = {}, children } = props;
  const { sizeValue, shrink, grow } = useAnimatedSize(from, to, duration);

  useEffect(() => {
    if (open) grow();
    else shrink();
  }, [open]);

  return <Animated.View style={[{ height: sizeValue }, style]}>{children}</Animated.View>;
}
