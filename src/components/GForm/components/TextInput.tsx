import { TextInput as AppTextInput } from "components/Inputs/TextInput/TextInput";
import { TextInputPresets, presets } from "components/Inputs/TextInput/TextInput.presets";
import { translate } from "i18n";
import I18n from "i18n-js";
import { StyleProp, ViewStyle, TextInputProps as RnTextInputProps } from "react-native";
import { color } from "theme";

import { BaseField } from "./BaseField";
import { GFieldProps, useGForm } from "../GForm.props";

export interface TextInputProps extends GFieldProps {
  inputStyle?: StyleProp<ViewStyle>;
  placeholderTx?: I18n.Scope;
  preset?: TextInputPresets;
  multineline?: boolean;
}

export default function TextInput(props: TextInputProps & RnTextInputProps) {
  const { containerStyle, valName, tx, text, inputStyle = {}, preset = "default", placeholderTx, ...rest } = props;
  const { values, setFieldValue, errors, validateField, themeColor } = useGForm();
  const inputStyles = [presets[preset].inputField, inputStyle, errors[valName] === undefined ? {} : inputError];
  const containerStyles = [presets[preset].container, containerStyle];

  return (
    <BaseField style={containerStyles}>
      {(tx !== undefined || text !== undefined) && <BaseField.Label tx={tx} text={text} />}
      <AppTextInput
        onChangeText={(text) => {
          setFieldValue(valName, text);
          if (errors[valName]) validateField(valName);
        }}
        value={values[valName]}
        placeholderTextColor={color.placeholder}
        style={inputStyles}
        placeholder={placeholderTx ? translate(placeholderTx) : undefined}
        color={themeColor}
        {...rest}
      />
      <BaseField.ErrorLabel valName={valName} />
    </BaseField>
  );
}

const inputError = {
  borderWidth: 2,
  borderColor: color.primary,
} as ViewStyle;
