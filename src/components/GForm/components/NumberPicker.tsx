import { NumberPicker } from "components/Inputs";
import { NumberPickerProps } from "components/Inputs/NumberPicker";

import { BaseField } from "./BaseField";
import { GFieldProps, useGForm } from "../GForm.props";
import { XStack } from "components/containers/Stack";

export type GFieldItemType = {
  value: string;
  label: string;
};

export default function Picker(props: GFieldProps & Omit<NumberPickerProps, "value" | "setValue">) {
  const { containerStyle, valName, tx, text, ...rest } = props;
  const { handleChange, values, themeColor } = useGForm();

  return (
    <BaseField style={containerStyle}>
      <XStack ai="center" jc="space-between">
        <BaseField.Label tx={tx} text={text} />
        <NumberPicker
          {...rest}
          value={values[valName] as number}
          setValue={(val) => handleChange(valName)(val.toString())}
          visible={0}
          color={themeColor}
        />
      </XStack>
    </BaseField>
  );
}
