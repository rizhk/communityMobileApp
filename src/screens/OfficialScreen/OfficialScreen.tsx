import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { XStack, YStack } from "components/containers";
import Fetcher from "components/Fetcher";
import { Text } from "components/Text";

type Props = NativeStackScreenProps<MainStackParamList>;

export function OfficialScreen({ navigation }: Props) {
  // const [filters, setFilters] = useState<ActualityFilters>({});

  //TODO: Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //Fetch Activities
  // const queryParams: ActualityQueryParams = {
  //   filters: filters,
  //   populate: "*",
  //   sort: "publishedAt:desc",
  //   pagination: {
  //     page,
  //     pageSize,
  //   },
  // };

  return (
    <Fetcher<any> url="/teams">
      {(teams, mutate) => (
        <ScrollView>
          <YStack pa="sm" gap="sm">
            {teams?.data &&
              teams?.data.map((team: any) => {
                return (
                  <View>
                    <Text>{team.name}</Text>
                  </View>
                );
              })}
          </YStack>
        </ScrollView>
      )}
    </Fetcher>
  );
}
