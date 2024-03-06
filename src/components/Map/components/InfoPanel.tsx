import EditorJsParser from "components/EditorJsParser";
import { Image } from "expo-image";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Callout } from "react-native-maps";
import { LocationItem } from "types/location";

interface InfoPanelProps {
  location: LocationItem;
  style: any; //TS: Change to style !!!
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ location, style }) => {
  if (!location) {
    return null; // Handle cases where location data is missing
  }

  const { title, address, cover, contentRTE } = location; // Destructure relevant fields

  return (
    <Callout style={[styles.infoPanel, style]}>
      <View>
        {/* {cover && <QuickImage width={120} height={120} source={{ uri: cover.url }} style={{ borderRadius: 16 }} />} */}
        {/* //TODO Fix image width and height ratio */}
        {cover && <Image source={{ uri: cover.url }} style={{ width: 120, height: 120, borderRadius: 16 }} />}

        <Text style={styles.infoPanelTitle}>{title}</Text>

        {contentRTE && <EditorJsParser content={contentRTE} />}

        {/* <Text style={styles.infoPanelItem}>{address}</Text> */}
      </View>
    </Callout>
  );
};

const styles = StyleSheet.create({
  infoPanel: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  infoPanelTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoPanelItem: {
    marginTop: 5,
  },
});
