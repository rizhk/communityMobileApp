import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { color } from "theme";

interface ActivityFilterProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: () => void; // Update this type as needed based on what onApply does
  // Include other props like filters and setFilters if you have specific filters state
}

const ActivityFilter: React.FC<ActivityFilterProps> = ({ isVisible, onClose, onApply }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.panel}>
          {/* Filter UI Elements */}
          {/* ... */}

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>

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
    width: "80%",
    height: "100%",
    // backgroundColor: color.primary,
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
