import { ColorValue, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { color as colors, palette, radius, spacing } from "theme";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { Text } from "react-native";

export type ButtonIconProps = {
  iconName: string;
  iconType: IconType;
  iconSize?: number;
  size?: number;
  scale?: number;
};

export type ButtonIconElementProps = {
  icon: JSX.Element;
};

export type ButtonProps = {
  label: string;
  iconPosition?: "left" | "right";
  sxText?: TextStyle;
};

export type BaseProps = {
  onPress: () => void | Promise<void>;
  color?: string;
  bgColor?: string;
  circle?: boolean;
  sx?: ViewStyle;
  outlined?: boolean;
  disabled?: boolean;
};

export function GButtonCustom(props: ButtonIconElementProps & BaseProps) {
  return <GBaseButton {...props} />;
}

export function GButtonIcon(props: ButtonIconProps & BaseProps) {
  return <GBaseButton {...props} circle />;
}

export function GButton(props: ButtonProps & Partial<ButtonIconElementProps> & BaseProps) {
  return <GBaseButton {...props} />;
}

function GBaseButton({
  onPress,
  label = "",
  iconName = undefined,
  iconType = undefined,
  icon = undefined,
  iconPosition = "left",
  iconSize = 32,
  size = 50,
  scale = 1,
  color = "white",
  bgColor = "primary",
  sx = {},
  sxText = {},
  circle = undefined,
  outlined = undefined,
  disabled = undefined,
}: BaseProps & Partial<ButtonIconProps & ButtonProps & ButtonIconElementProps>) {
  const backColor = bgColor in colors ? colors[bgColor as keyof typeof colors] : bgColor;
  const contentColor = color in colors ? colors[color as keyof typeof colors] : color;

  const circleStyle = { width: size * scale, height: size * scale, padding: 0 };
  const backgroundStyle = { backgroundColor: backColor as ColorValue };
  const contentColorStyle = { color: contentColor as ColorValue };
  const outlinedStyle = {
    borderWidth: 3,
    borderColor: contentColor as ColorValue,
    backgroundColor: "transparent",
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        ...backgroundStyle,
        ...styles.container,
        ...(circle ? circleStyle : {}),
        ...(outlined ? outlinedStyle : {}),
        ...sx,
      }}
      onPress={onPress}
    >
      {icon !== undefined && iconPosition === "left" && icon}
      {iconName !== undefined && iconType !== undefined && (
        <Icon
          name={iconName}
          type={iconType}
          color={contentColor as string}
          size={iconSize * scale}
        />
      )}
      {label !== "" && (
        <Text style={{ ...styles.label, ...contentColorStyle, ...sxText }}>{label}</Text>
      )}
      {icon !== undefined && iconPosition === "right" && icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: radius.xxxl,
  },
  label: {
    color: palette.white,
    fontWeight: "bold",
    fontSize: 20,
  },
  circle: {
    width: "unset",
    flexShrink: 1,
  },
});
