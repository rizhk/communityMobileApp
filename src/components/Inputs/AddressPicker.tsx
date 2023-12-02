import { Cross, Pin } from "assets/svg";
import { Button } from "components/Button";
import { Icon } from "components/Icon";
import { Text } from "components/Text";
import I18n, { t } from "i18n-js";
import { useState } from "react";
import { TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { ThemeColorType, color as themeColor, spacing } from "theme";
import { inputFieldStyle } from "theme/styles";
import { LocationType } from "types/global";
import { AddressSuggestions, fetchPlaceDetails, fetchSuggestions } from "utils/locationHelper";

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
  color?: ThemeColorType;
}

export function AddressPicker(props: AddressPickerProps) {
  const { style, placeholderTx, placeholder = "", value, setValue, color } = props;
  const [suggestions, setSuggestions] = useState<AddressSuggestions[]>([]);
  const [address, setAddress] = useState<string>("");

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
      setValue({ latitude: location.lat as number, longitude: location.lng as number });
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
          placeholderTextColor={themeColor.grey100}
        />
        {address.length > 0 && (
          <Button rounded size="sm" icon={Cross} iconScale={2} color={color} onPress={() => setAddress("")} />
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
  paddingLeft: inputFieldStyle.paddingHorizontal,
  paddingRight: spacing.xxs,
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
  borderTopColor: themeColor.grey400,
  padding: inputFieldStyle.paddingHorizontal,
  gap: spacing.xs,
  paddingVertica: spacing.xs,
} as ViewStyle;

const button = {
  flexDirection: "row",
  gap: spacing.xs,
} as ViewStyle;
