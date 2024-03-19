import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { XStack, YStack } from "components/containers";
import Fetcher from "components/Fetcher";
import { Text } from "components/Text";
import TeamCard from "./components/TeamCard";

type Props = NativeStackScreenProps<MainStackParamList>;

export function OfficialScreen({ navigation }: Props) {
  // const [filters, setFilters] = useState<ActualityFilters>({});

  //TODO: Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Fetcher<any> url="/teams">
      {(teams, mutate) => (
        <ScrollView horizontal>
          <XStack pa="sm" gap="sm">
            {teams?.data &&
              teams?.data.map((team: any) => {
                return <TeamCard key={team.id} navigation={navigation} team={team} />;
              })}
          </XStack>
        </ScrollView>
      )}
    </Fetcher>
  );
}
