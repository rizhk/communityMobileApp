import { Radio as AppRadio } from "components/Inputs";
import { RadioProps } from "components/Inputs/Radio";

import { BaseField } from "./BaseField";
import { GFieldProps, useGForm } from "../GForm.props";

export default function Radio(props: GFieldProps & Omit<RadioProps, "value" | "setValue">) {
  const { containerStyle, valName, tx, text, items, ...rest } = props;
  const { handleChange, values, themeColor } = useGForm();

  return (
    <BaseField style={containerStyle}>
      {(tx !== undefined || text !== undefined) && <BaseField.Label tx={tx} text={text} />}
      <AppRadio value={values[valName]} setValue={handleChange(valName)} items={items} color={themeColor} {...rest} />
      <BaseField.ErrorLabel valName={valName} />
    </BaseField>
  );
}
