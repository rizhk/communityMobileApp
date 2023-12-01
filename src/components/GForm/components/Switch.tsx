import { ViewStyle } from "react-native";
import { GFieldProps, useGForm } from "../GForm.props";
import { BaseField } from "./BaseField";
import { Switch as AppSwitch } from "components/Inputs";

export default function Switch(props: GFieldProps) {
  const { handleChange, values, themeColor } = useGForm();
  const { tx, text, valName } = props;
  const onChange = (value: boolean) => {
    handleChange(valName)(value ? "true" : "false");
  };
  return (
    <BaseField style={container}>
      <BaseField.Label tx={tx} text={text} />
      <AppSwitch value={values[valName] === "true"} onValueChange={onChange} color={themeColor} />
    </BaseField>
  );
}

const container = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
} as ViewStyle;
