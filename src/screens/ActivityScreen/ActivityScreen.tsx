import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "components/Button";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { View, Text } from "react-native";

type Props = NativeStackScreenProps<MainStackParamList, "activity">;

export function ActivityScreen({ navigation }: Props) {
  return (
    <View>
      <Text>ActivityScreen</Text>
      <Button
        text="go back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}
