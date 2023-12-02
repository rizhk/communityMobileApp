import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "components/Button";
import { Text } from "components/Text";
import { MainLayout } from "layouts";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";

import CreateActivity from "./components/CreateActivity";

type Props = NativeStackScreenProps<MainStackParamList, "activities">;

export default function ActivitiesScreen({ navigation }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <MainLayout>
      <Text>Activity Screen</Text>
      <CreateActivity open={open} setOpen={setOpen} />
      <Button
        tx="createActivity.button"
        onPress={() => setOpen(true)}
        style={{ alignSelf: "center", bottom: 10, position: "absolute" }}
      />
    </MainLayout>
  );
}
