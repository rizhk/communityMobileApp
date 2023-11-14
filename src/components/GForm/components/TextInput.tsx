import {
  StyleProp,
  ViewStyle,
  TextInput as RNTextInput,
  TextInputProps as RnTextInputProps,
} from "react-native";
import { GFieldProps, useGForm } from "../GForm.props";
import { color } from "theme";
import { BaseField } from "./BaseField";
import { inputFieldStyle } from "theme";
import I18n from "i18n-js";
import { translate } from "i18n";

export interface TextInputProps extends GFieldProps {
  inputStyle?: StyleProp<ViewStyle>;
  placeholderTx?: I18n.Scope;
}

export default function TextInput(props: TextInputProps & RnTextInputProps) {
  const { containerStyle, valName, tx, text, inputStyle = {}, placeholderTx, ...rest } = props;
  const { handleBlur, values, setFieldValue } = useGForm();

  return (
    <BaseField style={containerStyle}>
      {(tx !== undefined || text !== undefined) && <BaseField.Label tx={tx} text={text} />}
      <RNTextInput
        onChangeText={(text) => setFieldValue(valName, text)}
        onBlur={handleBlur(valName)}
        value={values[valName]}
        placeholderTextColor={color.grey100}
        style={[input, inputStyle]}
        placeholder={placeholderTx ? translate(placeholderTx) : undefined}
        {...rest}
      />
      <BaseField.ErrorLabel valName={valName} />
    </BaseField>
  );
}

const input = {
  ...inputFieldStyle,
} as ViewStyle;
