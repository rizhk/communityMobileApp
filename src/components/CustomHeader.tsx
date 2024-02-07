import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      {/* <Image
        source={require("./path-to-your-logo.png")} // Update with the path to your logo image
        style={styles.logo}
      /> */}
      <Text style={styles.headerText}>Your App Name</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // Add more styling as needed
  },
  logo: {
    width: 50, // Adjust according to your logo's size
    height: 50, // Adjust according to your logo's size
    marginRight: 10,
  },
  headerText: {
    fontWeight: "bold",
    // Add more styling as needed
  },
});

export default CustomHeader;
