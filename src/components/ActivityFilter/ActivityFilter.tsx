import { Star } from "assets/svg";
import { Icon } from "components/Icon";
import React, { useState, useEffect } from "react";
import { Animated, Modal, View, TouchableOpacity, StyleSheet, Dimensions, ViewStyle } from "react-native";
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

//TODO: Add button create activity s'il y pas de données
//TODO: Pouvoir filter par adresse et rediriger dessus sur la map

interface ActivityFilterProps {
  isVisible: boolean;
  sportItems?: SportsData;
  onClose: () => void;
  onApply: () => void;
}

const screenWidth = Dimensions.get("window").width;
const modalStartOffset = screenWidth; // Départ depuis le côté droit
const modalEndOffset = 20;

const ActivityFilter = ({ isVisible, onClose, onApply, sportItems }: ActivityFilterProps) => {
  const [maxDistance, setMaxDistance] = useState(DEFAULT_MAX_DISTANCE);
  const [sport, setSport] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // console.log(screenWidth, "screenWidth");

  // const [animation] = useState(new Animated.Value(screenWidth)); // Démarre en dehors de l'écran

  // S'arrête à 80px du bord droit

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
        <Animated.View style={modalStyle}>
          <View style={styles.panel}>
            <View style={{ display: "flex", flexDirection: "column", gap: 16, padding: 20 }}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text>Close</Text>
              </TouchableOpacity>
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

            <TouchableOpacity onPress={onApply} style={styles.button}>
              <Text>Apply</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
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
  button: {
    // Style for Apply Button
  },
  closeButton: {
    // Style for Close Button
  },
});
export default ActivityFilter;
