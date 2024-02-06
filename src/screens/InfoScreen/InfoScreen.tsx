import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "components/Text/Text";

import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { View } from "react-native";

type Props = NativeStackScreenProps<MainStackParamList, "info">;

export function InfoScreen({ navigation }: Props) {
  return (
    <View>
      <Text>InfoScreen</Text>
    </View>
  );
}
