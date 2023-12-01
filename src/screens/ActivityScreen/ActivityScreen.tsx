import { Button } from "components/Button";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";

type Props = NativeStackScreenProps<MainStackParamList, "activity">;

export default function ActivityScreen({ navigation }: Props) {
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
