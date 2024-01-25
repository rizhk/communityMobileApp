import { DownArrow, Tick, UpArrow } from "assets/svg";
import { Icon } from "components/Icon";
import { t } from "i18n-js";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { ThemeColorType, color as themeColor, radius, spacing } from "theme";
import { inputFieldStyle } from "theme/styles";

export interface DropPickerItem {
  icon: () => JSX.Element;
  label: string;
  value: string;
}

interface DropPickerProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: ItemType<string>[];
  placeholder?: string;
  placeholderTx?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchPlaceholderTx?: string;
  color?: ThemeColorType;
  open?: boolean;
  style?: StyleProp<ViewStyle>;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeValue?: (value: any) => void;
}

export function DropPicker(props: DropPickerProps) {
  const {
    items,
    placeholderTx,
    searchPlaceholderTx,
    value,
    setValue,
    color = "primary",
    searchable = false,
    open,
    style,
    setOpen,
    onChangeValue,
  } = props;
  const openState = useState<boolean>(false);
  const placeholder = (placeholderTx && t(placeholderTx)) || props.placeholder || "";
  const searchPlaceholder =
    (searchPlaceholderTx && t(searchPlaceholderTx)) || props.searchPlaceholder || "Search item...";
  const [itemsSet, setItemsSet] = useState<ItemType<string>[]>(items);

  const pickerStyle = [inputFieldStyle, style, { minHeight: inputFieldStyle.height }, { borderWidth: 0 }];

  return (
    <DropDownPicker
      searchable={searchable}
      items={itemsSet}
      setItems={setItemsSet}
      open={open !== undefined && setOpen !== undefined ? open : openState[0]}
      setOpen={open !== undefined && setOpen !== undefined ? setOpen : openState[1]}
      value={value}
      setValue={setValue}
      onChangeValue={onChangeValue}
      style={pickerStyle}
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
