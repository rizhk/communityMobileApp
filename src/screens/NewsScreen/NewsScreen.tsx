import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "components/Text/Text";

import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { View } from "react-native";

type Props = NativeStackScreenProps<MainStackParamList, "news">;

export function NewsScreen({ navigation }: Props) {
  return (
    <View>
      <Text>NewsScreen</Text>
    </View>
  );
}
