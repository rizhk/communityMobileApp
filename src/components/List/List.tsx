import { View, Text, ViewStyle, TouchableOpacity, TextStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import { styles } from "./styles";

type ListProps = {
  sx?: ViewStyle;
};

type ListItemProps = {
  icon?: JSX.Element;
  label: string;
  onPress: () => void;
  sx?: ViewStyle;
  sxIcon?: ViewStyle;
  sxText?: TextStyle;
};

type ListHeaderProps = {
  label: string;
  sx?: ViewStyle;
  sxText?: TextStyle;
};

export function ListItem({
  icon,
  label,
  onPress,
  sx = {},
  sxText = {},
  sxIcon = {},
}: ListItemProps) {
  return (
    <TouchableOpacity style={{ ...styles.item, ...sx }} onPress={onPress}>
      <View style={{ ...styles.itemIcon, ...sxIcon }}>{icon}</View>
      <View style={{ ...styles.itemTextView, ...sxIcon }}>
        <Text style={{ ...styles.itemText, ...sxText }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function ListHeader({ label, sx = {}, sxText = {} }: ListHeaderProps) {
  return (
    <View style={{ ...styles.header, ...sx }}>
      <Text style={{ ...styles.headerText, ...sxText }}>{label}</Text>
    </View>
  );
}

List.Item = ListItem;
List.Header = ListHeader;

export function List({ children, sx = {} }: PropsWithChildren<ListProps>) {
  return <View style={{ ...styles.container, ...sx }}>{children}</View>;
}
