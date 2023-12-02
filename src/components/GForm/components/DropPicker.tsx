import { DropPicker as AppDropPicker } from "components/Inputs";
import { GrowingView } from "components/containers/GrowingView";
import { t } from "i18n-js";
import { useState } from "react";

import { BaseField } from "./BaseField";
import { GFieldProps, useGForm } from "../GForm.props";

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
          value={value}
          setValue={setValue}
          onChangeValue={() => setFieldValue(valName, value)}
          searchable={searchable}
          color={themeColor}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
        />
      </GrowingView>
    </BaseField>
  );
}
