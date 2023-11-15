import { useAnimatedHeight } from "hooks/useAnimatedHeight";
import { PropsWithChildren, useEffect } from "react";
import { Animated, ViewStyle } from "react-native";

type GrowingViewProps = {
  open: boolean;
  from: number;
  to: number;
  duration?: number;
  style?: ViewStyle;
};

export function GrowingView(props: PropsWithChildren<GrowingViewProps>) {
  const { open, from, to, duration = 100, style = {}, children } = props;
  const { heightValue, shrink, grow } = useAnimatedHeight(from, to, duration);

  useEffect(() => {
    open ? grow() : shrink();
  }, [open]);

  return <Animated.View style={[{ height: heightValue }, style]}>{children}</Animated.View>;
}
