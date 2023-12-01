import { useState } from "react";
import { GFieldProps, useGForm } from "../../GForm.props";
import { BaseField } from "../BaseField";
import BaseRadio from "../BaseRadio";
import { TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { inputFieldStyle } from "../styles";
import I18n, { t } from "i18n-js";
import { Text } from "components/Text";
import { color, spacing } from "theme";
import { Icon } from "components/Icon";
import { Cross, Pin } from "assets/svg";
import { AddressSuggestions, fetchPlaceDetails, fetchSuggestions } from "utils/locationHelper";
import { Button } from "components/Button";
import { AddressPicker as AppAddressPicker } from "components/Inputs/AddressPicker";
import { LocationType } from "types/global";
export interface AdressPickerProps extends GFieldProps {
  placeholderTx?: I18n.Scope;
}

const addressTypeItems = [
  { label: "addressPicker.currentPosition", value: "local" },
  { label: "addressPicker.choosePosition", value: "custom" },
];

export default function AddressPicker(props: AdressPickerProps) {
  const { valName, tx, containerStyle, placeholderTx } = props;
  const { values, setFieldValue } = useGForm();
  const [addressType, setAddressType] = useState<string>("local");
  const [address, setAddress] = useState<string>("");
  const [suggestions, setSuggestions] = useState<AddressSuggestions[]>([]);
  const TX = tx || "addressPicker.where";

  const onChangeText = (text: string) => {
    setAddress(text);
    fetchSuggestions(text)
      .then((suggestions) => setSuggestions(suggestions))
      .catch((error) => console.error(error));
  };

  const onSelectAddress = (selectedAddress: AddressSuggestions) => {
    console.log(selectedAddress);
    setAddress(selectedAddress.description);
    setSuggestions([]);
    fetchPlaceDetails(selectedAddress.place_id).then((location) => {
      console.log(location);
      setFieldValue(valName, { latitude: location.latitude, longitude: location.longitude });
    });
  };

  return (
    <BaseField style={containerStyle}>
      <BaseField.Label tx={TX} />
      <BaseRadio items={addressTypeItems} value={addressType} setValue={setAddressType} radioStyle={{ flex: 1 }} />
      {addressType === "custom" && (
        <View style={suggestionContainer}>
          <View style={inputContainer}>
            <TextInput
              value={address}
              onChangeText={onChangeText}
              style={inputStyle}
              placeholder={placeholderTx !== undefined ? t(placeholderTx) : ""}
            />
            {address.length > 0 && (
              <Button rounded size="sm" icon={Cross} iconScale={2} color="grey300" onPress={() => setAddress("")} />
            )}
          </View>
          {suggestions.length > 0 && (
            <View style={suggestionList}>
              {suggestions.map((suggestion) => (
                <TouchableOpacity onPress={() => onSelectAddress(suggestion)} style={button}>
                  <Icon icon={Pin} size={15} style={{ marginTop: 3 }} />
                  <Text style={{ flex: 1 }}>{suggestion.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        // <AppAddressPicker
        //   value={values[valName] as LocationType}
        //   setValue={(val: any) => setFieldValue(valName, val)}
        // />
      )}
    </BaseField>
  );
}

const inputContainer = {
  flexDirection: "row",
  position: "relative",
  alignItems: "center",
  paddingHorizontal: inputFieldStyle.paddingHorizontal,
  gap: spacing.xs,
} as ViewStyle;

const inputStyle = {
  height: inputFieldStyle.height,
  color: inputFieldStyle.color,
  flex: 1,
} as TextStyle;

const suggestionContainer = {
  ...inputFieldStyle,
  paddingHorizontal: 0,
  height: "auto",
  minHeight: inputFieldStyle.height,
} as ViewStyle;

const suggestionList = {
  borderTopWidth: 1,
  borderTopColor: color.grey400,
  padding: inputFieldStyle.paddingHorizontal,
  gap: spacing.xs,
  paddingVertica: spacing.xs,
} as ViewStyle;

const button = {
  flexDirection: "row",
  gap: spacing.xs,
} as ViewStyle;
