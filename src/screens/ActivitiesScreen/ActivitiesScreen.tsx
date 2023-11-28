import { Text } from "components/Text";
import { MainLayout } from "layouts";
import { useState } from "react";
import CreateActivity from "./components/CreateActivity";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";

type Props = NativeStackScreenProps<MainStackParamList, "activities">;

export default function ActivitiesScreen({ navigation }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <MainLayout>
      <Text>Activity Screen</Text>
      <CreateActivity open={open} setOpen={setOpen} />
    </MainLayout>
  );
}
