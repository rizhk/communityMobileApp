import { View, Text } from "react-native";
import { ThemeColorType } from "theme";

type IconType = {
  icon: JSX.Element;
  size: number;
  color: ThemeColorType;
};
export default function Icon() {
  return (
    <View>
      <Text>Icon</Text>
    </View>
  );
}
