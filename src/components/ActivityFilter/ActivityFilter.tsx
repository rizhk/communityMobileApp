import React, { useState, useEffect } from "react";
import { Animated, Modal, View, TouchableOpacity, StyleSheet, Dimensions, ViewStyle, Pressable } from "react-native";

import { color } from "theme";
import { Text } from "components/Text";
import Slider from "@react-native-community/slider";

import { DEFAULT_MAX_DISTANCE } from "constants/global";

import SportPickerComponent from "components/Inputs/SportPicker";
import { Button } from "components/Button";
import { ActivityFilters } from "types/activity";
import { SideSlider } from "components/Modal";
import { DatePicker } from "components/Inputs";

//TODO: Add button create activity s'il y pas de données
//TODO: Pouvoir filter par adresse et rediriger dessus sur la map

interface ActivityFilterProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (newFilters: ActivityFilters) => void;
  currentFilters: ActivityFilters;
}

const ActivityFilter = ({ isVisible, onClose, onApply, currentFilters }: ActivityFilterProps) => {
  const [maxDistance, setMaxDistance] = useState(currentFilters?.maxDistance || DEFAULT_MAX_DISTANCE);
  const [sport, setSport] = useState(currentFilters?.sport?.name || "");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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

        {/* //TODO: Add address Picker */}

        <Text text="Depuis le" />
        <DatePicker date={startDate} setDate={setStartDate} minDate={new Date()} />
        {/* <Text text="Au" />
            <DatePicker date={endDate} setDate={setEndDate} minDate={startDate} /> */}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
        <Button
          text="Apply"
          size="md"
          onPress={() => onApply({ ...currentFilters, ...(sport && { sport: { name: sport } }), maxDistance })}
        />

        <Button text="Cancel" size="md" onPress={onClose} preset="outlined" />
      </View>
    </SideSlider>
  );
};

export default ActivityFilter;
