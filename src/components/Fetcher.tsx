import { defaultQueryParams, fetchAxiosAPI } from "api/request";
import React, { ReactNode } from "react";
import { View } from "react-native";
import useSWR, { KeyedMutator } from "swr";
import { RestQueryParams } from "types/global";
import { Text } from "./Text";

interface FetcherProps<T> {
  url: string;
  params?: RestQueryParams;
  children: (data: T, mutate: KeyedMutator<T>) => ReactNode;
}

function Fetcher<T>({ url, children, params = defaultQueryParams }: FetcherProps<T>): JSX.Element {
  const { data, error, mutate } = useSWR<any>(url, (url: string) => fetchAxiosAPI(url, params), {
    refreshInterval: 60000,
  });

  if (error)
    return (
      <View>
        <Text>Erreur lors du chargement des données...</Text>
      </View>
    );
  if (!data)
    return (
      <View>
        <Text>Chargement...</Text>
      </View>
    );

  console.log(data, "date in fetchesr");

  return <>{children(data, mutate)}</>;
}

export default Fetcher;
