import { GFieldProps, useGForm } from "../GForm.props";
import { BaseField } from "./BaseField";
import { Radio as AppRadio } from "components/Inputs";
import { RadioProps } from "components/Inputs/Radio";

export default function Radio(props: GFieldProps & Omit<RadioProps, "value" | "setValue">) {
  const { containerStyle, valName, tx, text, items, ...rest } = props;
  const { handleChange, values } = useGForm();

  return (
    <BaseField style={containerStyle}>
      {(tx !== undefined || text !== undefined) && <BaseField.Label tx={tx} text={text} />}
      <AppRadio value={values[valName]} setValue={handleChange(valName)} items={items} {...rest} />
      <BaseField.ErrorLabel valName={valName} />
    </BaseField>
  );
}
