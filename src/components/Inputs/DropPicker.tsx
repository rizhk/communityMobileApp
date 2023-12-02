import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import { ThemeColorType, color as themeColor } from "theme";
import { inputFieldStyle } from "theme/styles";
import { radius, spacing } from "theme";
import { Icon } from "components/Icon";
import { DownArrow, Tick, UpArrow } from "assets/svg";
import { t } from "i18n-js";

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
  searchable?: boolean;
  searchPlaceholder?: string;
  searchPlaceholderTx?: string;
  color?: ThemeColorType;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DropPicker(props: DropPickerProps) {
  const {
    placeholderTx,
    searchPlaceholderTx,
    value,
    setValue,
    color = "primary",
    searchable = false,
    open,
    setOpen,
  } = props;
  const openState = useState<boolean>(false);
  const placeholder = (placeholderTx && t(placeholderTx)) || props.placeholder || "";

  const searchPlaceholder =
    (searchPlaceholderTx && t(searchPlaceholderTx)) || props.searchPlaceholder || "Search item...";
  const [items, setItems] = useState<DropPickerItem[]>(props.items);

  return (
    <DropDownPicker
      searchable={searchable}
      items={items}
      setItems={setItems}
      open={open !== undefined && setOpen !== undefined ? open : openState[0]}
      setOpen={open !== undefined && setOpen !== undefined ? setOpen : openState[1]}
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
