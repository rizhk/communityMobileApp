import React from "react";

import { Image, StyleSheet } from "react-native";
import { SportsData } from "types/sport";
import { DropPicker, DropPickerItem } from "./DropPicker";
import useSWR from "swr";
import { fetchSports } from "api/api";

interface SportPickerComponentProps {
  items?: SportsData;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function mapSportsDataToDropPickerItems(sportsData: SportsData) {
  return sportsData?.data?.map((sport) => ({
    icon: () => (
      <Image source={{ uri: sport.attributes.icon.data.attributes.url }} resizeMode="contain" style={styles.pinImage} />
    ),
    label: sport?.attributes?.name,
    value: String(sport.attributes?.name),
  }));
}

function SportPickerComponent({ value, setValue }: SportPickerComponentProps) {
  const { data: dataSports } = useSWR(["sports"], () => fetchSports());

  if (!dataSports) {
    return null;
  }

  return <DropPicker items={mapSportsDataToDropPickerItems(dataSports)} value={value} setValue={setValue} />;
}

const styles = StyleSheet.create({
  pinImage: {
    width: 24,
    height: 24,
  },
});

export default SportPickerComponent;
