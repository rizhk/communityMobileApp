import { GFieldProps, useGForm } from "../GForm.props";
import { BaseField } from "./BaseField";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { color } from "../../../theme/color";
import { inputFieldStyle } from "./styles";
import { radius, spacing } from "theme";
import { GrowingView } from "components/containers/GrowingView";
import { Icon } from "components/Icon";
import { DownArrow, Tick, UpArrow } from "assets/svg";
import { t } from "i18n-js";
import { DropPicker as AppDropPicker } from "components/Inputs";
export type DropPickerItem = {
  icon: () => JSX.Element;
  label: string;
  value: string;
};

interface DropPickerProps extends GFieldProps {
  items: DropPickerItem[];
  placeholder?: string;
  placeholderTx?: string;
  searchPlaceholder?: string;
  searchPlaceholderTx?: string;
  searchable?: boolean;
}

export default function DropPicker(props: DropPickerProps) {
  const { tx, text, valName, items, placeholderTx, searchPlaceholderTx, searchable } = props;
  const { values, setFieldValue, themeColor } = useGForm();
  const [value, setValue] = useState(values[valName]);
  const [open, setOpen] = useState(false);
  const placeholder = (placeholderTx && t(placeholderTx)) || props.placeholder || "";
  const searchPlaceholder = (searchPlaceholderTx && t(searchPlaceholderTx)) || props.searchPlaceholder || "";

  return (
    <BaseField>
      <BaseField.Label tx={tx} text={text} />
      <GrowingView from={35} to={210} open={open}>
        <AppDropPicker
          items={items}
          open={open}
          setOpen={setOpen}
          value={values[valName]}
          setValue={(val: any) => setFieldValue(valName, val)}
          searchable={searchable}
          color={themeColor}
        />
        {/* <DropDownPicker
          searchable={true}
          items={items}
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          onChangeValue={() => setFieldValue(valName, value)}
          style={{
            ...inputFieldStyle,
            minHeight: inputFieldStyle.height,
            borderWidth: 0,
          }}
          placeholderStyle={{ color: color.placeholder }}
          textStyle={{ color: color.text }}
          dropDownContainerStyle={{
            borderWidth: 0,
            backgroundColor: color.inputBackground,
            borderTopWidth: 1,
            borderTopColor: color.grey400,
          }}
          searchPlaceholder={searchPlaceholder}
          searchContainerStyle={{
            borderBottomColor: color.grey400,
            padding: spacing.xxs,
          }}
          searchTextInputStyle={{ color: color.text, borderWidth: 0 }}
          TickIconComponent={() => <Icon icon={Tick} size={15} />}
          tickIconContainerStyle={{
            backgroundColor: color.primary,
            borderRadius: radius.xl,
            padding: spacing.xxs,
          }}
          zIndex={1000}
          placeholder={placeholder}
          ArrowUpIconComponent={() => <Icon icon={UpArrow} size={25} color="white" />}
          ArrowDownIconComponent={() => <Icon icon={DownArrow} size={25} color="white" />}
        /> */}
      </GrowingView>
    </BaseField>
  );
}
