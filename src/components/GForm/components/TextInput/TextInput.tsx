import {
  StyleProp,
  ViewStyle,
  TextInput as RNTextInput,
  TextInputProps as RnTextInputProps,
} from "react-native";
import { GFieldProps, useGForm } from "../../GForm.props";
import { color } from "theme";
import { BaseField } from "../BaseField";
import I18n from "i18n-js";
import { translate } from "i18n";
import { TextInputPresets, presets } from "./TextInput.presets";

export interface TextInputProps extends GFieldProps {
  inputStyle?: StyleProp<ViewStyle>;
  placeholderTx?: I18n.Scope;
  preset?: TextInputPresets;
}

export default function TextInput(props: TextInputProps & RnTextInputProps) {
  const {
    containerStyle,
    valName,
    tx,
    text,
    inputStyle = {},
    preset = "default",
    placeholderTx,
    ...rest
  } = props;
  const { handleBlur, values, setFieldValue, errors, validateField } = useGForm();

  const inputStyles = [
    presets[preset].inputField,
    inputStyle,
    errors[valName] === undefined ? {} : inputError,
  ];
  const containerStyles = [presets[preset].container, containerStyle];
  console.log(inputStyles);
  return (
    <BaseField style={containerStyles}>
      {(tx !== undefined || text !== undefined) && <BaseField.Label tx={tx} text={text} />}
      <RNTextInput
        onChangeText={(text) => {
          setFieldValue(valName, text);
          if (errors[valName]) validateField(valName);
        }}
        // onBlur={handleBlur(valName)}
        value={values[valName]}
        placeholderTextColor={color.grey100}
        style={inputStyles}
        placeholder={placeholderTx ? translate(placeholderTx) : undefined}
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
