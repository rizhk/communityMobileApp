import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "components/Button";
import { Text } from "components/Text";
import { MainLayout } from "layouts";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";

import CreateActivity from "./components/CreateActivity";
import useSWR from "swr";
import { fetchActivitiesByRegion } from "api/api";
import { Region } from "react-native-maps";
// import { INITIAL_REGION } from "constants/global";
import useCurrentPosition from "hooks/useCurrentPosition";
import { is } from "date-fns/locale";
import { View } from "react-native-animatable";

type Props = NativeStackScreenProps<MainStackParamList, "activities">;

export function ActivitiesScreen({ navigation }: Props) {
  const [open, setOpen] = useState(false);
  const [userRegion, isLocationFetched] = useCurrentPosition();

  const [region, setRegion] = useState<Region | null>(userRegion);

  const [maxDistance, setMaxDistance] = useState(50000);

  const filters = {
    sport: {
      name: "Basketball",
    },
    // date: "2023-07-19",
  };

  //Fetch Activities
  const {
    data: activities,
    error,
    isLoading,
    mutate,
  } = useSWR(isLocationFetched ? ["activities", userRegion, maxDistance, filters] : null, () =>
    fetchActivitiesByRegion(userRegion, maxDistance, filters)
  );

  console.log(activities, "data2");

  // Add filter button -> finish setup filter buttons
  // Create activityCard

  // Add swtich to filter between my activities and all activities
  // TODO: Button to add activity to calendar ?

  return (
    <MainLayout>
      <Text>Activity Screen</Text>
      {/* //maps trough activities */}
      <ScrollView>
        {activities?.data?.map((activity: any) => (
          <View key={activity.id}>
            <Text>
              {activity.id} - {activity.attributes.date} - {activity.attributes.sport?.data?.attributes?.name}
            </Text>
          </View>
        ))}
      </ScrollView>

      <CreateActivity open={open} setOpen={setOpen} />
      <Button
        tx="createActivity.button"
        onPress={() => setOpen(true)}
        style={{ alignSelf: "center", bottom: 10, position: "absolute" }}
      />
    </MainLayout>
  );
}
