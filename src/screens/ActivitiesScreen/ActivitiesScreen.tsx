import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "components/Button";
import { Text } from "components/Text";
import { MainLayout } from "layouts";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";

import CreateActivity from "./components/CreateActivity";
import useSWR from "swr";
import { fetchActivitiesByRegion } from "api/api";
import { Region } from "react-native-maps";
// import { INITIAL_REGION } from "constants/global";
import useCurrentPosition from "hooks/useCurrentPosition";
import { is } from "date-fns/locale";

type Props = NativeStackScreenProps<MainStackParamList, "activities">;

export function ActivitiesScreen({ navigation }: Props) {
  const [open, setOpen] = useState(false);
  const [userRegion, isLocationFetched] = useCurrentPosition();

  const [region, setRegion] = useState<Region | null>(userRegion);

  console.log(userRegion, "userRegion2");
  const [maxDistance, setMaxDistance] = useState(50000);

  const filters = {
    sport: {
      name: "Basketball",
    },
    // date: "2023-07-19",
  };

  //Fetch Activities
  const { data, error, isLoading, mutate } = useSWR(["activities", region, maxDistance, filters], () =>
    fetchActivitiesByRegion(region, maxDistance, filters)
  );

  console.log(data, "data");

  // Add filter button -> finis setup filter buttons
  // Create activityCard

  // Add swtich to filter between my activities and all activities
  // TODO: Button to add activity to calendar ?

  return (
    <MainLayout>
      <Text>Activity Screen</Text>
      {/* //maps trough activities */}

      <CreateActivity open={open} setOpen={setOpen} />
      <Button
        tx="createActivity.button"
        onPress={() => setOpen(true)}
        style={{ alignSelf: "center", bottom: 10, position: "absolute" }}
      />
    </MainLayout>
  );
}
