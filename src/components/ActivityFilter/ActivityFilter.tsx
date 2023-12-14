import { Star } from "assets/svg";
import { Icon } from "components/Icon";
import React, { useState, useEffect } from "react";
import { Animated, Modal, View, TouchableOpacity, StyleSheet, Dimensions, ViewStyle, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "theme";
import { Text } from "components/Text";
import Slider from "@react-native-community/slider";

import { Radio, Switch, NumberPicker, DropPicker, TextInput, DatePicker } from "components/Inputs";
import { hexToRGBA } from "utils/helper";
import { DEFAULT_MAX_DISTANCE } from "constants/global";
import { DropPickerItem } from "components/Inputs/DropPicker";
import { SportItem, SportsData } from "types/sport";
import { SportItemStrapi } from "types/sport";
import SportPickerComponent from "components/Inputs/SportPicker";
import { Button } from "components/Button";
import { ActivityFilters } from "types/activity";
import { SideSlider } from "components/Modal";

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
  const [sport, setSport] = useState(currentFilters?.sport?.name || "");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [rightSlider, setRightSlider] = useState(false);

  const [animation] = useState(new Animated.Value(modalStartOffset));

  return (
    <SideSlider transparent={true} visible={isVisible} setVisible={onClose} width={0.8} right>
      <View style={{ gap: 16, padding: 8 }}>
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
        <Button
          text="Apply"
          size="md"
          onPress={() => onApply({ ...currentFilters, sport: { name: sport }, maxDistance })}
        />

        <Button text="Cancel" size="md" onPress={onClose} preset="outlined" />
      </View>
    </SideSlider>
  );
};

export default ActivityFilter;
