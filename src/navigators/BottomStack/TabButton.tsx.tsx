import { StyleSheet, View } from "react-native";
import { BottomNavProps, BottomNavPropsType } from "./BottomNavProps";
import { Text } from "components/Text/Text";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { G, Rect, Svg } from "react-native-svg";
import * as Animatable from "react-native-animatable";

export interface TabButtonProps {
  tab: BottomNavPropsType;
  onPress?: any;
  accessibilityState?: any;
}

export default function TabButton({ tab, onPress, accessibilityState }: TabButtonProps) {
  return (
    <View>
      <Text>{tab.label}</Text>
    </View>
  );
}

// Set button icon & animation
