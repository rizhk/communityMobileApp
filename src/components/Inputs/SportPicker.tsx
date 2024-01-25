//TODO: Discussion intérêt composant SportPicker

import React from "react";
import { Image, StyleSheet } from "react-native";
import useSWR from "swr";
import { SportsData } from "types/sport";

import { DropPicker, DropPickerItem } from "./DropPicker";
import { fetchSports } from "api/sport-request";

interface SportPickerComponentProps {
  items?: SportsData;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function mapSportsDataToDropPickerItems(sportsData: SportsData) {
  return sportsData?.data?.map((sport) => ({
    icon: () => <Image source={{ uri: sport?.icon?.url }} resizeMode="contain" style={styles.pinImage} />,
    label: sport?.name,
    value: String(sport?.name),
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
