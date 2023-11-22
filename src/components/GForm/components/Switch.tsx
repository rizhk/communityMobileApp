import { Switch as RNSwitch, ViewStyle } from "react-native";
import { GFieldProps, useGForm } from "../GForm.props";
import { BaseField } from "./BaseField";
import { color } from "theme";

export default function Switch(props: GFieldProps) {
  const { handleChange, values } = useGForm();
  const { tx, text, valName } = props;
  const onChange = (value: boolean) => {
    console.log(value);
    handleChange(valName)(value ? "true" : "false");
  };
  return (
    <BaseField style={container}>
      <BaseField.Label tx={tx} text={text} />
      <RNSwitch
        value={values[valName] === "true"}
        onValueChange={onChange}
        thumbColor={values[valName] === "true" ? color.primary : ""}
        trackColor={{ false: color.grey800, true: color.white }}
        ios_backgroundColor={color.grey800}
      />
    </BaseField>
  );
}

const container = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
} as ViewStyle;
