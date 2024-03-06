import { Button } from "components/Button";
import { AddressPicker as AppAddressPicker } from "components/Inputs/AddressPicker";
import I18n from "i18n-js";
import { View } from "react-native";
import { LocationMapType } from "types/global";
import { fetchLocalPosition } from "utils/locationHelper";

import { BaseField } from "./BaseField";
import { GFieldProps, useGForm } from "../GForm.props";

export interface AdressPickerProps extends GFieldProps {
  placeholderTx?: I18n.Scope;
  placeholder?: string;
}

export default function AddressPicker(props: AdressPickerProps) {
  const { valName, tx, containerStyle, placeholderTx, placeholder } = props;
  const { values, setFieldValue, themeColor } = useGForm();
  const TX = tx || "addressPicker.where";

  const currentPocition = async () => {
    const position = await fetchLocalPosition();
    if (position) setFieldValue(valName, { latitude: position.latitude, longitude: position.longitude });
  };

  return (
    <BaseField style={containerStyle}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <BaseField.Label tx={TX} />
        <Button
          size="xs"
          color={themeColor}
          tx="addressPicker.currentPosition"
          onPress={async () => currentPocition()}
        />
      </View>
      <AppAddressPicker
        value={values[valName] as LocationMapType}
        setValue={(val: any) => setFieldValue(valName, val)}
        color={themeColor}
        placeholderTx={placeholderTx}
        placeholder={placeholder}
      />
    </BaseField>
  );
}
