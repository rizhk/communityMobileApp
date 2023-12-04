import { Star } from "assets/svg";
import { Icon } from "components/Icon";
import React, { useState, useEffect } from "react";
import { Animated, Modal, View, TouchableOpacity, StyleSheet, Dimensions, ViewStyle, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "theme";
import { Text } from "components/Text";
import Slider from "@react-native-community/slider";

import { Radio, Switch, NumberPicker, DropPicker, TextInput, DateTimePicker, DatePicker } from "components/Inputs";
import { hexToRGBA } from "utils/helper";
import { DEFAULT_MAX_DISTANCE } from "constants/global";
import { DropPickerItem } from "components/Inputs/DropPicker";
import { SportItem, SportsData } from "types/sport";
import { SportItemStrapi } from "types/sport";
import SportPickerComponent from "components/Inputs/SportPicker";
import { Button } from "components/Button";
import { ActivityFilters } from "types/activity";

//TODO: Add button create activity s'il y pas de données
//TODO: Pouvoir filter par adresse et rediriger dessus sur la map

interface ActivityFilterProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (newFilters: ActivityFilters) => void;
  currentFilters: ActivityFilters;
}

const screenWidth = Dimensions.get("window").width;
const modalStartOffset = screenWidth; // Départ depuis le côté droit
const modalEndOffset = 20;

const ActivityFilter = ({ isVisible, onClose, onApply, currentFilters }: ActivityFilterProps) => {
  const [maxDistance, setMaxDistance] = useState(currentFilters?.maxDistance || DEFAULT_MAX_DISTANCE);
  const [sport, setSport] = useState(currentFilters?.sport?.id || "0");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  console.log(sport, "sport");

  const [animation] = useState(new Animated.Value(modalStartOffset));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animation, {
        toValue: modalEndOffset, // Anime jusqu'à la position 0
        duration: 300, // Durée de l'animation
        useNativeDriver: true, // Améliore les performances
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: modalStartOffset, // Replace le modal hors de l'écran
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, animation]);

  const modalStyle = {
    transform: [{ translateX: animation }],
  } as ViewStyle;

  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        <Pressable style={styles.container} onPress={onClose}>
          <Animated.View style={modalStyle}>
            <View style={styles.panel}>
              <View style={{ display: "flex", flexDirection: "column", gap: 16, padding: 20 }}>
                <Text text="Sport Picker" />
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
                {/* <Text text="Du" />
            <DatePicker date={startDate} setDate={setStartDate} minDate={new Date()} />
            <Text text="Au" />
            <DatePicker date={endDate} setDate={setEndDate} minDate={startDate} /> */}
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                {/* <Button text="Apply" size="md" onPress={onApply} /> */}
                <Button
                  text="Apply"
                  size="md"
                  onPress={() => onApply({ ...currentFilters, sport: { id: sport }, maxDistance })}
                />

                <Button text="Cancel" size="md" onPress={onClose} preset="outlined" />
              </View>
            </View>
          </Animated.View>
        </Pressable>
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
    width: screenWidth - modalEndOffset,
    height: "100%",
    backgroundColor: hexToRGBA(color.black, 0.9),
    padding: 24,
  },
  pinImage: {
    width: 24,
    height: 24,
  },
});
export default ActivityFilter;
