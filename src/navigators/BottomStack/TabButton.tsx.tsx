import { Icon } from "components/Icon";
import { useEffect, useState } from "react";
import { Animated, TouchableOpacity, View, ViewStyle } from "react-native";
import { buttonSize, color } from "theme";

import { BottomNavPropsType } from "./BottomNavProps";
import { hexToRGBA } from "utils/helper";

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

  var bgColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0,0,0,0)", hexToRGBA(color.secondary, 1)],
  });

  return (
    <View style={container}>
      <TouchableOpacity onPress={onPress} style={button}>
        <Animated.View style={[{ backgroundColor: bgColor }, button]}>
          <Icon icon={tab.icon} color="white" size={30} />
        </Animated.View>
      </TouchableOpacity>
      {!isLast && <View style={separator} />}
    </View>
  );
}

const container = {
  position: "relative",
  flex: 1,
  alignItems: "center",
} as ViewStyle;

const button = {
  alignItems: "center",
  justifyContent: "center",
  height: buttonSize.xxl,
  width: buttonSize.xxl,
  borderBottomLeftRadius: 25,
  borderBottomRightRadius: 25,
} as ViewStyle;

const separator = {
  backgroundColor: color.grey600,
  height: 24,
  width: 2,
  position: "absolute",
  right: -1,
  top: 20,
  borderRadius: 5,
} as ViewStyle;
