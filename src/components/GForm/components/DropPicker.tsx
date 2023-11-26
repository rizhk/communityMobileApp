import { View, Text, ViewStyle } from "react-native";
import { GFieldItemType, GFieldProps, useGForm } from "../GForm.props";
import { BaseField } from "./BaseField";
import DropDownPicker from "react-native-dropdown-picker";
import { Button } from "components/Button";
import { set } from "date-fns";
import { useState } from "react";
import { color } from "../../../theme/color";
import { inputFieldStyle } from "./styles";
import { radius, spacing } from "theme";
import { GrowingView } from "./containers/GrowingView";
import { Icon } from "components/Icon";
import { Tick } from "assets/svg";

type DropPickerItem = {
  element: JSX.Element;
  label: string;
  value: string;
};

interface DropPickerProps extends GFieldProps {
  items: DropPickerItem[];
}

export default function DropPicker(props: DropPickerProps) {
  const { tx, text, valName, items } = props;
  const { values, setFieldValue } = useGForm();
  const [value, setValue] = useState(values[valName]);
  const [open, setOpen] = useState(false);

  return (
    <BaseField>
      <BaseField.Label tx={tx} text={text} />
      <GrowingView from={35} to={210} open={open}>
        <DropDownPicker
          searchable={true}
          items={items}
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          onChangeValue={() => setFieldValue(valName, value)}
          style={dropPicker}
          listItemLabelStyle={{ color: color.text }}
          placeholderStyle={{ color: color.placeholder }}
          //   categorySelectable={true}
          dropDownContainerStyle={{
            borderWidth: 0,
            backgroundColor: color.inputBackground,
            borderTopWidth: 1,
            borderTopColor: color.grey400,
            zIndex: 1000,
          }}
          searchContainerStyle={{
            borderBottomColor: color.grey400,
          }}
          searchTextInputStyle={{ color: color.text, borderWidth: 0 }}
          TickIconComponent={() => <Icon icon={Tick} size={15} />}
          tickIconContainerStyle={{
            backgroundColor: color.primary,
            borderRadius: radius.xl,
            padding: spacing.xxs,
          }}
          zIndex={1000}
        />
      </GrowingView>
    </BaseField>
  );
}

const dropPicker = {
  ...inputFieldStyle,
  minHeight: 35,
  borderWidth: 0,
} as ViewStyle;
