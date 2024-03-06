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

export function HomeScreen({ navigation }: Props) {
  const [filters, setFilters] = useState<ActualityFilters>({});

  //TODO: Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //Fetch Activities
  const RestQueryParams: ActualityQueryParams = {
    filters: filters,
    populate: "*",
    sort: "publishedAt:desc",
    pagination: {
      page,
      pageSize,
    },
  };

  const {
    data: actualities,
    error,
    isLoading: isLoadingActivities,
    mutate: refetchActualities,
  } = useSWR("/actualities", () => fetchAxiosAPI("/actualities", RestQueryParams), {
    refreshInterval: 60000, // 60 seconds
  });

  // console.log(actualities, "actualities");

  if (isLoadingActivities) {
    return <Text>Loading...</Text>;
  }

  if (error) return <Text>Erreur lors du chargement des données...</Text>;

  return (
    <ScrollView>
      <YStack pa="sm" gap="sm">
        {/* TODO: Component Search based on useSwr to refresh the data correctly */}
        {/* <SearchBar /> */}
        {/* <FilterComponent onApply={handleApplyFilter} currentFilters={filters} /> */}

        {/* TODO: Replace by a component FlatList */}
        {actualities?.data &&
          actualities?.data.map((actuality: ActualityItem) => {
            return <ActualityCard key={actuality.id} navigation={navigation} actuality={actuality} />;
          })}
      </YStack>
    </ScrollView>
  );
}
