import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ActivityFilter from "components/ActivityFilter/ActivityFilter";
import { Button } from "components/Button";
import { Text } from "components/Text";
import { YStack } from "components/containers/Stack/Stack";
import useCurrentPosition from "hooks/useCurrentPosition";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import useSWR from "swr";
import { ActivityFilters, ActivityQueryParams } from "types/activity";
import ActivityCard from "./components/ActivityCard";
import { useHeaderMenu } from "hooks/useHeaderMenu";
import { Filter } from "assets/svg";
import { MenuType } from "components/Menu/Menu.types";
import { fetchActivities, populateActivity } from "api/activity-request";

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

  //TODO: Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //Fetch Activities
  const restQueryParams: ActivityQueryParams = {
    filters: filters,
    populate: populateActivity,
    pagination: {
      page,
      pageSize,
    },
    sort: "startDate:desc",
  };

  const { data: activities, isLoading: isLoadingActivities } = useSWR(["activities", filters], () =>
    fetchActivities(restQueryParams)
  );

  //TODO: Check why filter are not showing in the header
  const menu: MenuType = {
    type: "element",
    icon: Filter,
    element: <ActivityFilter onApply={handleApplyFilter} currentFilters={filters} />,
  };
  useHeaderMenu({ navigation, ...menu });

  return (
    <YStack full>
      <Text preset="header">{activities?.meta?.pagination?.total} Activities found </Text>
      <Button
        tx="createActivity.button"
        onPress={() => setOpenActivity(true)}
        style={{ alignSelf: "center", bottom: 10, position: "absolute" }}
      />
      {isLoadingActivities ? (
        <ActivityIndicator />
      ) : (
        <>
          {/* <ActivityFilter
            isVisible={isFilterVisible}
            // onClose={handleCloseFilter}
            onApply={handleApplyFilter}
            currentFilters={filters}
          /> */}
          {/* <FlatList data={activities} renderItem={({item}) => <ActivityCard activity={item} key={item?.id} />}/> */}
          <ScrollView>
            <YStack gap={"md"} mb={76} pa={"md"}>
              {activities?.data?.map((activity: any) => (
                <ActivityCard activity={activity} navigation={navigation} key={activity?.id} />
              ))}
            </YStack>
          </ScrollView>
        </>
      )}
    </YStack>
  );
}
