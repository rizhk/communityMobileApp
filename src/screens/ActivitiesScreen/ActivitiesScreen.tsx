import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchActivitiesByRegion } from "api/api";
import ActivityFilter from "components/ActivityFilter/ActivityFilter";
import { Button } from "components/Button";
import { Text } from "components/Text";
import { YStack } from "components/containers/Stack/Stack";
import useCurrentPosition from "hooks/useCurrentPosition";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import useSWR from "swr";
import { ActivityFilters } from "types/activity";

import ActivityCard from "./components/ActivityCard";
import CreateActivity from "./components/CreateActivity";
import { useHeaderMenu } from "hooks/useHeaderMenu";
import { Filter } from "assets/svg";
import { MenuType } from "components/Menu/Menu.types";

type Props = NativeStackScreenProps<MainStackParamList, "activities">;

export function ActivitiesScreen({ navigation }: Props) {
  const [openActivity, setOpenActivity] = useState(false);
  const [userRegion] = useCurrentPosition();
  const [maxDistance, setMaxDistance] = useState(50000);

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleApplyFilter = (newFilters: ActivityFilters) => {
    setFilters(newFilters);
    setIsFilterVisible(false);
  };

  const [filters, setFilters] = useState<ActivityFilters>({});

  //Fetch Activities
  const {
    data: activities,
    error,
    isLoading: isLoadingActivities,
    mutate,
  } = useSWR(["activities", userRegion, maxDistance, filters], () =>
    fetchActivitiesByRegion(userRegion, maxDistance, filters)
  );

  const menu: MenuType = {
    type: "element",
    icon: Filter,
    element: <ActivityFilter onApply={handleApplyFilter} currentFilters={filters} />,
  };
  useHeaderMenu({ navigation, ...menu });

  return (
    <YStack full>
      <Text preset="header">{activities?.meta?.pagination?.total} Activities found </Text>
      <CreateActivity open={openActivity} setOpen={setOpenActivity} />
      <Button
        tx="createActivity.button"
        onPress={() => setOpenActivity(true)}
        style={{ alignSelf: "center", bottom: 10, position: "absolute" }}
      />
      {isLoadingActivities ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          {activities?.data?.map((activity: any) => <ActivityCard activity={activity} key={activity?.id} />)}
        </ScrollView>
      )}
      <CreateActivity open={openActivity} setOpen={setOpenActivity} />
      <Button
        tx="createActivity.button"
        onPress={() => setOpenActivity(true)}
        style={{ alignSelf: "center", bottom: 10, position: "absolute" }}
      />
    </YStack>
  );
}
