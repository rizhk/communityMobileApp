import { Icon } from "components/Icon";
import { Stack } from "components/containers";
import { useEffect, useState } from "react";
import { Animated, TouchableOpacity, ViewStyle } from "react-native";
import { buttonSize, color } from "theme";
import { hexToRGBA } from "utils/helper";

import { BottomNavPropsType } from "./BottomNavProps";
import { Text } from "components/Text";

export interface TabButtonProps {
  tab: BottomNavPropsType;
  onPress?: any;
  accessibilityState?: any;
  isLast: boolean;
}

export default function TabButton({ tab, onPress, accessibilityState, isLast }: TabButtonProps) {
  const focused = accessibilityState.selected;
  const [animation] = useState<any>(new Animated.Value(0));

  const handleSelect = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleUnselect = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (focused) {
      handleSelect();
    } else {
      handleUnselect();
    }
  }, [focused]);

  const bgColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0,0,0,0)", hexToRGBA(color.primaryDark, 1)],
  });

  return (
    <Stack position="relative" flex={1} ai="center">
      <TouchableOpacity onPress={onPress} style={button}>
        <Animated.View style={[{ backgroundColor: bgColor }, button]}>
          <Icon icon={tab.icon} color="white" size={30} />
          <Text size="xs" color="white">
            {tab.label}
          </Text>
        </Animated.View>
      </TouchableOpacity>
      {/* {!isLast && <Stack bc="grey600" h={24} w={2} position="absolute" right={-1} top={20} br="sm" />} */}
    </Stack>
  );
}

const button = {
  alignItems: "center",
  justifyContent: "center",
  // height: buttonSize.xxl,
  width: "100%",
  height: "100%",
  // paddingHorizontal: "15%",
  // paddingVertical: 4,
  borderRadius: 8,
} as ViewStyle;
