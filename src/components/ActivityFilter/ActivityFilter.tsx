import { Star } from "assets/svg";
import { Icon } from "components/Icon";
import React, { useState } from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "theme";
import { Text } from "components/Text";

import { Radio, Switch, NumberPicker, DropPicker, TextInput, DateTimePicker } from "components/Inputs";
import { hexToRGBA } from "utils/helper";
import DatePicker from "components/GForm/components/DateTimePicker/DatePicker";
import { DEFAULT_MAX_DISTANCE } from "constants/global";

interface ActivityFilterProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: () => void; // Update this type as needed based on what onApply does
  // Include other props like filters and setFilters if you have specific filters state
}

const items = [
  { label: "item1", value: "item1" },
  { label: "item2", value: "item2" },
  { label: "item3", value: "item3" },
  { label: "item4", value: "item4" },
];

const dropItems = [
  { icon: () => <Icon icon={Star} />, label: "drop-item1", value: "drop-item1" },
  { icon: () => <Icon icon={Star} />, label: "drop-item2", value: "drop-item2" },
  { icon: () => <Icon icon={Star} />, label: "drop-item3", value: "drop-item3" },
  { icon: () => <Icon icon={Star} />, label: "drop-item4", value: "drop-item4" },
];

const ActivityFilter: React.FC<ActivityFilterProps> = ({ isVisible, onClose, onApply }) => {
  const [radio, setRadio] = useState("item1");
  const [switchValue, setSwitchValue] = useState(false);
  const [maxDistance, setMaxDistance] = useState(DEFAULT_MAX_DISTANCE);
  const [item, setItem] = useState("drop-item1");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.panel}>
          {/* Filter UI Elements */}
          {/* ... */}
          <View style={{ display: "flex", flexDirection: "column", gap: 16, padding: 20 }}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text>Close</Text>
            </TouchableOpacity>
            <Text text="Sport Picker" />
            <DropPicker items={dropItems} value={item} setValue={setItem} />

            <Text text="Distance max" />
            <NumberPicker
              min={10}
              max={100}
              value={maxDistance}
              setValue={setMaxDistance}
              width={120}
              padding={2}
              step={10}
            />
            <Text text="Du" />
            <DatePicker date={startDate} setDate={setStartDate} minDate={new Date()} />
            <Text text="Au" />
            <DatePicker date={endDate} setDate={setEndDate} minDate={startDate} />

            {/* <Radio value={radio} setValue={setRadio} items={items} style={{ marginTop: 20 }} /> */}
            {/* <View
              style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", padding: 10, gap: 20 }}
            >
              <Radio value={radio} setValue={setRadio} items={items} groupDirection="column" color="secondary" />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", padding: 10, gap: 20 }}
            >
              <Switch value={switchValue} onChange={() => setSwitchValue(!switchValue)} />
            </View> */}
            {/* <DateTimePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            /> */}
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
  button: {
    // Style for Apply Button
  },
  closeButton: {
    // Style for Close Button
  },
});
export default ActivityFilter;
