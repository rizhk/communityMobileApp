import { PinOutline } from "assets/svg";
import { Button } from "components/Button";
import { Text } from "components/Text";
import { MainLayout } from "layouts";
import { useState } from "react";
import CreateActivity from "./components/CreateActivity";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { ScrollView } from "react-native";

type Props = NativeStackScreenProps<MainStackParamList, "activities">;

export default function ActivitiesScreen({ navigation }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <MainLayout>
      <ScrollView>
        <Text>MapScreen</Text>
        <Text>{new Date(2002, 1, 1).toDateString()}</Text>
        <Text>{new Date(2002, 3, 1).toDateString()}</Text>
        <Text>{new Date(2002, 1, 1).toDateString()}</Text>
        <Text>{new Date(2002, 1, 1).toDateString()}</Text>
        <Button
          text="test"
          icon={PinOutline}
          onPress={() => setOpen(true)}
          style={{ width: 150, alignSelf: "center" }}
        />
        <Button text="go To activity" onPress={() => navigation.navigate("activity", { activityId: 0 })} />
        <Button text="go To activity" onPress={() => navigation.navigate("activity", { activityId: 0 })} />
        <Button text="go To activity" onPress={() => navigation.navigate("activity", { activityId: 0 })} />
        <Button text="go To activity" onPress={() => navigation.navigate("activity", { activityId: 0 })} />
        <Button text="go To activity" onPress={() => navigation.navigate("activity", { activityId: 0 })} />
        <Button text="go To activity" onPress={() => navigation.navigate("activity", { activityId: 0 })} />
        <Button text="go To activity" onPress={() => navigation.navigate("activity", { activityId: 0 })} />
        <Button text="go To activity" onPress={() => navigation.navigate("activity", { activityId: 0 })} />
        <Button text="go To activity" onPress={() => navigation.navigate("activity", { activityId: 0 })} />
        <Button text="go To activity" onPress={() => navigation.navigate("activity", { activityId: 0 })} />
        <CreateActivity open={open} setOpen={setOpen} />
      </ScrollView>
    </MainLayout>
  );
}
