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
import ActivityFilter from "components/ActivityFilter/ActivityFilter";
import { ActivityFilters } from "types/activity";
import { INITIAL_REGION_FRIBOURG } from "constants/global";

type Props = NativeStackScreenProps<MainStackParamList, "activities">;

export function ActivitiesScreen({ navigation }: Props) {
  const [openActivity, setOpenActivity] = useState(false);
  const [userRegion, isLocationFetched] = useCurrentPosition();
  const [maxDistance, setMaxDistance] = useState(50000);

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleOpenFilter = () => {
    setIsFilterVisible(true);
  };

  const handleCloseFilter = () => {
    setIsFilterVisible(false);
  };

  const handleApplyFilter = (newFilters: ActivityFilters) => {
    setFilters(newFilters);
    handleCloseFilter();
  };

  // const [region, setRegion] = useState<Region | null>(userRegion);

  const [filters, setFilters] = useState<ActivityFilters>({
    // sport: {
    //   id: 0,
    // },
    // date: "2023-07-19",
  });

  console.log(filters, "filter");

  //Fetch Activities
  const {
    data: activities,
    error,
    isLoading,
    mutate,
  } = useSWR(["activities", INITIAL_REGION_FRIBOURG, maxDistance, filters], () =>
    // } = useSWR(isLocationFetched ? ["activities", userRegion, maxDistance, filters] : null, () =>
    fetchActivitiesByRegion(INITIAL_REGION_FRIBOURG, maxDistance, filters)
  );

  // Add swtich to filter between my activities and all activities
  // TODO: Button to add activity to calendar ?

  return (
    <MainLayout>
      <Text preset="header">Activity Screen</Text>
      {/* TODO Add filter button -> finish setup filter buttons */}
      <Button onPress={handleOpenFilter} text="Filter" />
      <ActivityFilter
        isVisible={isFilterVisible}
        onClose={handleCloseFilter}
        onApply={handleApplyFilter}
        currentFilters={filters}
        // sportItems={dataSports}
        // filters={filters}
        // setFilters={setFilters} // If you want to lift state up
      />
      <ScrollView>
        {activities?.data?.map((activity: any) => (
          //TODO: Create activityCard

          <View key={activity.id}>
            <Text>
              {activity.id} - {activity.attributes.date} - {activity.attributes.sport?.data?.attributes?.name}
            </Text>
          </View>
        ))}
      </ScrollView>
      <CreateActivity open={openActivity} setOpen={setOpenActivity} />
      <Button
        tx="createActivity.button"
        onPress={() => setOpenActivity(true)}
        style={{ alignSelf: "center", bottom: 10, position: "absolute" }}
      />
    </MainLayout>
  );
}
