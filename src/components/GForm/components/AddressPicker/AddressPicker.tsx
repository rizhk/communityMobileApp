import { useState } from "react";
import { GFieldProps, useGForm } from "../../GForm.props";
import { BaseField } from "../BaseField";
import { View } from "react-native";

import I18n from "i18n-js";

import { fetchLocalPosition } from "utils/locationHelper";
import { Button } from "components/Button";
import { AddressPicker as AppAddressPicker } from "components/Inputs/AddressPicker";
import { LocationType } from "types/global";
import { Radio } from "components/Inputs";
export interface AdressPickerProps extends GFieldProps {
  placeholderTx?: I18n.Scope;
  placeholder?: string;
}

const addressTypeItems = [
  { label: "addressPicker.currentPosition", value: "local" },
  { label: "addressPicker.choosePosition", value: "custom" },
];

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
        value={values[valName] as LocationType}
        setValue={(val: any) => setFieldValue(valName, val)}
        color={themeColor}
        placeholderTx={placeholderTx}
        placeholder={placeholder}
      />
    </BaseField>
  );
}
