import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { ActualitiesData, ActualityFilters, ActualityItem, ActualityQueryParams, ActualityType } from "types/actuality";
import ActualityCard from "./components/ActualityCard";
import { YStack } from "components/containers";
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
      <YStack pa="sm" gap="sm">
        <Button text="Pilier public" onPress={() => handleFilter("Pilier public")} />
        <Button text="Actualités" onPress={() => handleFilter("Actualités")} />
        <Button text="Emplois" onPress={() => handleFilter("Emplois")} />
      </YStack>
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
