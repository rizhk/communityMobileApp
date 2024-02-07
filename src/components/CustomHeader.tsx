import React from "react";
import { View, StyleSheet } from "react-native";
import { QuickImage } from "./ImageComponent";

const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <QuickImage source={require("../assets/image/logo-daillens.png")} width={188} height={62} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 48,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  logo: {
    marginLeft: 12,
  },
  headerText: {
    fontWeight: "bold",
  },
});

export default CustomHeader;
