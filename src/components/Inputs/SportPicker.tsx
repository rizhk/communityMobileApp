import React, { useState, useEffect } from "react";

import { Image, StyleSheet } from "react-native";
import { SportsData } from "types/sport";
import { DropPicker, DropPickerItem } from "./DropPicker";

interface SportPickerComponentProps {
  items: SportsData | undefined;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const mapSportsDataToDropPickerItems = (sportsData: SportsData) => {
  console.log(sportsData, "sportsData");
  return sportsData?.data?.map((sport) => ({
    icon: () => (
      <Image source={{ uri: sport.attributes.icon.data.attributes.url }} resizeMode="contain" style={styles.pinImage} />
    ),
    label: sport?.attributes?.name,
    value: String(sport.id),
  }));
};

const SportPickerComponent: React.FC<SportPickerComponentProps> = ({ items, value, setValue }) => {
  const [mappedSportItems, setMappedSportItems] = useState<DropPickerItem[]>([]);
  useEffect(() => {
    if (items) {
      const transformedItems = mapSportsDataToDropPickerItems(items);
      setMappedSportItems(transformedItems);
    }
  }, [items]);

  if (mappedSportItems.length === 0) {
    return null;
  }

  return <DropPicker items={mappedSportItems} value={value} setValue={setValue} />;
};

const styles = StyleSheet.create({
  pinImage: {
    width: 24,
    height: 24,
  },
  // Ajoutez d'autres styles si nécessaire
});

export default SportPickerComponent;
