import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import { ThemeColorType, color as themeColor } from "theme";
import { inputFieldStyle } from "./styles";
import { radius, spacing } from "theme";
import { Icon } from "components/Icon";
import { DownArrow, Tick, UpArrow } from "assets/svg";
import { t } from "i18n-js";
import { View, ViewStyle } from "react-native";

export type DropPickerItem = {
  icon: () => JSX.Element;
  label: string;
  value: string;
};

interface DropPickerProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: DropPickerItem[];
  placeholder?: string;
  placeholderTx?: string;
  searchPlaceholder?: string;
  searchPlaceholderTx?: string;
  color?: ThemeColorType;
}

export function DropPicker(props: DropPickerProps) {
  const { placeholderTx, searchPlaceholderTx, value, setValue, color = "primary" } = props;
  const [open, setOpen] = useState(false);
  const placeholder = (placeholderTx && t(placeholderTx)) || props.placeholder || "";
  const searchPlaceholder =
    (searchPlaceholderTx && t(searchPlaceholderTx)) || props.searchPlaceholder || "Search item...";
  const [items, setItems] = useState<DropPickerItem[]>(props.items);
  return (
    <DropDownPicker
      searchable={true}
      items={items}
      setItems={setItems}
      open={open}
      setOpen={setOpen}
      value={value}
      setValue={setValue}
      style={{
        ...inputFieldStyle,
        minHeight: inputFieldStyle.height,
        borderWidth: 0,
      }}
      placeholderStyle={{ color: themeColor.placeholder }}
      textStyle={{ color: themeColor.text }}
      dropDownContainerStyle={{
        borderWidth: 0,
        backgroundColor: themeColor.inputBackground,
        borderTopWidth: 1,
        borderTopColor: themeColor.grey400,
      }}
      searchPlaceholder={searchPlaceholder}
      searchContainerStyle={{
        borderBottomColor: themeColor.grey400,
        padding: spacing.xxs,
      }}
      searchTextInputStyle={{ color: themeColor.text, borderWidth: 0 }}
      TickIconComponent={() => <Icon icon={Tick} size={12} />}
      tickIconContainerStyle={{
        backgroundColor: themeColor[color],
        borderRadius: radius.xl,
        padding: spacing.xxs,
      }}
      zIndex={1000}
      placeholder={placeholder}
      ArrowUpIconComponent={() => <Icon icon={UpArrow} size={25} color="white" />}
      ArrowDownIconComponent={() => <Icon icon={DownArrow} size={25} color="white" />}
    />
  );
}
