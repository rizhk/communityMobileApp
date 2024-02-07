import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchAxiosAPI } from "api/request";
import { Text } from "components/Text/Text";

import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import useSWR from "swr";
import { ActualityFilters, ActualityItem, ActualityQueryParams } from "types/actuality";
import ActualityCard from "./components/ActualityCard";
import { XStack, YStack } from "components/containers";

type Props = NativeStackScreenProps<MainStackParamList>;

export function ActualitiesScreen({ navigation }: Props) {
  const [filters, setFilters] = useState<ActualityFilters>({});

  //TODO: Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //Fetch Activities
  const restQueryParams: ActualityQueryParams = {
    filters: filters,
    populate: "*",
    pagination: {
      page,
      pageSize,
    },
    sort: "startDate:desc",
  };

  const { data: actualities, isLoading: isLoadingActivities } = useSWR(["actualities", filters], () =>
    fetchAxiosAPI("/actualities", restQueryParams)
  );

  console.log(actualities, "actualities");

  if (isLoadingActivities) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <YStack pa="sm" gap="sm">
        {/* TODO: Header avec logo */}
        {/* Component Search based on useSwr to refresh the data correctly */}
        {/* <SearchBar /> */}
        {/* <FilterComponent onApply={handleApplyFilter} currentFilters={filters} /> */}

        {actualities?.data.map((actuality: ActualityItem) => {
          return <ActualityCard key={actuality.id} navigation={navigation} actuality={actuality} />;
        })}
      </YStack>
    </ScrollView>
  );
}
