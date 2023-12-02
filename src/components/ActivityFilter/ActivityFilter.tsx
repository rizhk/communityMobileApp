import { Star } from "assets/svg";
import { Icon } from "components/Icon";
import React, { useState, useEffect } from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "theme";
import { Text } from "components/Text";
import Slider from "@react-native-community/slider";

import { Radio, Switch, NumberPicker, DropPicker, TextInput, DateTimePicker } from "components/Inputs";
import { hexToRGBA } from "utils/helper";
import DatePicker from "components/GForm/components/DateTimePicker/DatePicker";
import { DEFAULT_MAX_DISTANCE } from "constants/global";
import { DropPickerItem } from "components/Inputs/DropPicker";
import { SportItem, SportsData } from "types/sport";
import { SportItemStrapi } from "types/sport";
import SportPickerComponent from "components/Inputs/SportPicker";

interface ActivityFilterProps {
  isVisible: boolean;
  sportItems?: SportsData;
  onClose: () => void;
  onApply: () => void;
}

// const mapSportsDataToDropPickerItems = (sportsData: SportsData) => {
//   const transformedItems = sportsData?.data?.map((sport) => ({
//     icon: () => (
//       <Image source={{ uri: sport.attributes.icon.data.attributes.url }} resizeMode="contain" style={styles.pinImage} />
//     ),
//     label: sport?.attributes?.name,
//     value: String(sport.id),
//   }));
//   return transformedItems as DropPickerItem[];
// };

const ActivityFilter: React.FC<ActivityFilterProps> = ({ isVisible, onClose, onApply, sportItems }) => {
  const [maxDistance, setMaxDistance] = useState(DEFAULT_MAX_DISTANCE);
  const [sport, setSport] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //   const [mappedSportItems, setMappedSportItems] = useState<DropPickerItem[]>([]);

  //   //Tansform sportItems to DropPickerItems
  //   useEffect(() => {
  //     if (sportItems) {
  //       const transformedItems = mapSportsDataToDropPickerItems(sportItems);
  //       setMappedSportItems(transformedItems);
  //     }
  //   }, [sportItems]);

  //   console.log(mappedSportItems, "mappedSportItems2");

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.panel}>
          <View style={{ display: "flex", flexDirection: "column", gap: 16, padding: 20 }}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text>Close</Text>
            </TouchableOpacity>
            <Text text="Sport Picker" />
            {/* <DropPicker items={mappedSportItems} value={sport} setValue={setSport} /> */}
            {/* <SportPickerComponent items={sportItems as SportsData} value={sport} setValue={setSport} /> */}
            <SportPickerComponent value={sport} setValue={setSport} />

            <Text text={"Distance: " + maxDistance + " km"} />
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={20}
              maximumValue={100}
              step={10}
              minimumTrackTintColor={color.primary}
              maximumTrackTintColor={color.primaryDark}
              thumbTintColor={color.primary}
              value={maxDistance}
              onValueChange={setMaxDistance}
            />
            <Text text="Du" />
            <DatePicker date={startDate} setDate={setStartDate} minDate={new Date()} />
            <Text text="Au" />
            <DatePicker date={endDate} setDate={setEndDate} minDate={startDate} />
          </View>

          <TouchableOpacity onPress={onApply} style={styles.button}>
            <Text>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  panel: {
    width: "90%",
    height: "100%",
    backgroundColor: hexToRGBA(color.black, 0.9),
    padding: 24,
  },
  pinImage: {
    width: 24,
    height: 24,
  },
  button: {
    // Style for Apply Button
  },
  closeButton: {
    // Style for Close Button
  },
});
export default ActivityFilter;
