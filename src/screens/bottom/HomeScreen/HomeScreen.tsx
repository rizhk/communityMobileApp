import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { ActualitiesData, ActualityFilters, ActualityItem, ActualityQueryParams, ActualityType } from "types/actuality";
import ActualityCard from "./components/ActualityCard";
import { XStack, YStack } from "components/containers";
import Fetcher from "components/Fetcher";
import { Button } from "components/Button";
import { useSWRConfig } from "swr";
import qs from "qs";

type Props = NativeStackScreenProps<MainStackParamList>;

export function HomeScreen({ navigation }: Props) {
  const [filters, setFilters] = useState<ActualityFilters>({});

  //TODO: Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  //Fetch Activities
  const queryParams: ActualityQueryParams = {
    filters: filters,
    populate: "*",
    sort: "publishedAt:asc",
    pagination: {
      page,
      pageSize,
    },
  };

  const ActualityFilter = () => {
    const handleFilter = (type: ActualityType) => {
      setFilters({ type });
    };

    return (
      <XStack pa="sm" gap="xs">
        <Button size="xs" preset="outlined" text="Pilier public" onPress={() => handleFilter("Pilier public")} />
        <Button size="xs" preset="outlined" text="Actualités" onPress={() => handleFilter("Actualités")} />
        <Button size="xs" preset="outlined" text="Emplois" onPress={() => handleFilter("Emplois")} />
      </XStack>
    );
  };

  return (
    <>
      <ActualityFilter />
      <Fetcher<ActualitiesData> url={`/actualities`} params={queryParams}>
        {(actualities) => (
          <ScrollView>
            <YStack pa="sm" gap="sm">
              {actualities?.data &&
                actualities?.data.map((actuality: ActualityItem) => {
                  return <ActualityCard key={actuality.id} navigation={navigation} actuality={actuality} />;
                })}
            </YStack>
          </ScrollView>
        )}
      </Fetcher>
    </>
  );
}
