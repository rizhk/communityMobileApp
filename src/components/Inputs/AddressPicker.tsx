import { useState } from "react";
import { TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { inputFieldStyle } from "theme/styles";
import I18n, { t } from "i18n-js";
import { Text } from "components/Text";
import { color, spacing } from "theme";
import { Icon } from "components/Icon";
import { Cross, Pin } from "assets/svg";
import { AddressSuggestions, fetchPlaceDetails, fetchSuggestions } from "utils/locationHelper";
import { Button } from "components/Button";
import { LocationType } from "types/global";

type Locationtype = {
  latitude: number;
  longitude: number;
};

export interface AddressPickerProps {
  value: LocationType;
  setValue: (value: LocationType) => void;
  placeholderTx?: I18n.Scope;
  placeholder?: string;
  style?: ViewStyle;
}

export function AddressPicker(props: AddressPickerProps) {
  const { style, placeholderTx, placeholder = "", value, setValue } = props;
  const [address, setAddress] = useState<string>("");
  const [suggestions, setSuggestions] = useState<AddressSuggestions[]>([]);

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
      setValue({ latitude: location.latitude as number, longitude: location.longitude as number });
    });
  };

  return (
    <View style={[suggestionContainer, style]}>
      <View style={inputContainer}>
        <TextInput
          value={address}
          onChangeText={onChangeText}
          style={inputStyle}
          placeholder={placeholderTx !== undefined ? t(placeholderTx) : placeholder}
          placeholderTextColor={color.grey100}
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
