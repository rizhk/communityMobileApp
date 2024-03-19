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

type Props = NativeStackScreenProps<MainStackParamList>;

export function HomeScreen({ navigation }: Props) {
  const [filters, setFilters] = useState<ActualityFilters>({});
  const [type, setType] = useState<ActualityType>("Actualités"); // Initial state for filters

  //TODO: Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { mutate } = useSWRConfig();

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

  //Create component to filter Activity with a radio button

  // const ActualityFilter = ({ data, mutate }: { data: ActualitiesData; mutate: Function }) => {
  const ActualityFilter = () => {
    const handleFilter = (type: ActualityType) => {
      // setFilters({ type });
      setType(type);
      // mutate("/actualities", true);
      // mutate({ ...data, type: type }, false);
      // mutate({ ...data, filters: { type: "Pilier public" } });
      // mutate("/actualities", { ...data, filters: { type: "Pilier public" } });
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
    <Fetcher<ActualitiesData> url={`/actualities?filters[type][$eq]=${type}`} params={queryParams}>
      {/* <Fetcher<ActualitiesData> url="/actualities" params={queryParams}> */}
      {(actualities, mutate) => (
        <View>
          <ActualityFilter />
          <ScrollView>
            <YStack pa="sm" gap="sm">
              {actualities?.data &&
                actualities?.data.map((actuality: ActualityItem) => {
                  return <ActualityCard key={actuality.id} navigation={navigation} actuality={actuality} />;
                })}
            </YStack>
          </ScrollView>
        </View>
      )}
    </Fetcher>
  );
}
