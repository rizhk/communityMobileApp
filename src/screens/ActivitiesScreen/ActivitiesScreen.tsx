import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ActivityFilter from "components/ActivityFilter/ActivityFilter";
import { Button } from "components/Button";
import { Text } from "components/Text";
import { YStack } from "components/containers/Stack/Stack";
import useCurrentPosition from "hooks/useCurrentPosition";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";
import { ActivityIndicator, FlatList, ScrollView } from "react-native";
import useSWR from "swr";
import { ActivityFilters } from "types/activity";
import ActivityCard from "./components/ActivityCard";
import CreateActivity from "./components/CreateActivity";
import { useHeaderMenu } from "hooks/useHeaderMenu";
import { Filter } from "assets/svg";
import { MenuType } from "components/Menu/Menu.types";
import { fetchActivities } from "api/activity-request";

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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //Fetch Activities
  const { data: activities, isLoading: isLoadingActivities } = useSWR(
    ["activities", userRegion, maxDistance, filters],
    () => fetchActivities({ filters, pagination: { page, pageSize } })
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
      {/* TODO flatList ? */}
      {/* <FlatList data={activities} renderItem={({item}) => <ActivityCard activity={item} key={item?.id} />}/> */}
      {isLoadingActivities ? (
        <ActivityIndicator />
      ) : (
        <>
          {/* <ActivityFilter
            isVisible={isFilterVisible}
            onClose={handleCloseFilter}
            onApply={handleApplyFilter}
            currentFilters={filters}
          /> */}
          <ScrollView>
            <YStack gap={"md"} pa={"md"}>
              {activities?.data?.map((activity: any) => (
                <ActivityCard activity={activity} navigation={navigation} key={activity?.id} />
              ))}
            </YStack>
          </ScrollView>
        </>
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
