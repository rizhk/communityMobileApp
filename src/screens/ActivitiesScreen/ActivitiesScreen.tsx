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
import useCurrentPosition from "hooks/useCurrentPosition";
import ActivityFilter from "components/ActivityFilter/ActivityFilter";
import { ActivityFilters } from "types/activity";
import ActivityCard from "./components/ActivityCard";

type Props = NativeStackScreenProps<MainStackParamList, "activities">;

export function ActivitiesScreen({ navigation }: Props) {
  const [openActivity, setOpenActivity] = useState(false);
  const [userRegion] = useCurrentPosition();
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

  const [filters, setFilters] = useState<ActivityFilters>({});

  //Fetch Activities
  const { data: activities, isLoading: isLoadingActivities } = useSWR(
    ["activities", userRegion, maxDistance, filters],
    () => fetchActivitiesByRegion(userRegion, maxDistance, filters)
  );

  return (
    <MainLayout>
      <Text preset="header">{activities?.meta?.pagination?.total} Activities found </Text>

      <Button onPress={handleOpenFilter} text="Filter" />
      <CreateActivity open={openActivity} setOpen={setOpenActivity} />
      <Button
        tx="createActivity.button"
        onPress={() => setOpenActivity(true)}
        style={{ alignSelf: "center", bottom: 10, position: "absolute" }}
      />
      {isLoadingActivities ? (
        <ActivityIndicator />
      ) : (
        <>
          <ActivityFilter
            isVisible={isFilterVisible}
            onClose={handleCloseFilter}
            onApply={handleApplyFilter}
            currentFilters={filters}
          />
          <ScrollView>
            {activities?.data?.map((activity: any) => <ActivityCard activity={activity} key={activity?.id} />)}
          </ScrollView>
        </>
      )}
      <CreateActivity open={openActivity} setOpen={setOpenActivity} />
      <Button
        tx="createActivity.button"
        onPress={() => setOpenActivity(true)}
        style={{ alignSelf: "center", bottom: 10, position: "absolute" }}
      />
    </MainLayout>
  );
}
