import React from "react";
import { Image, View, StyleSheet, ImageSourcePropType } from "react-native";

type QuickImageProps = {
  source: ImageSourcePropType; // This allows for both local and network images
  width?: number; // Optional width prop
  height?: number; // Optional height prop
  style?: object; // Optional custom styling
};

export const QuickImage: React.FC<QuickImageProps> = ({ source, width = 100, height = 100, style }) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image source={source} style={[styles.image, style]} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%", // Make image fill the container
    height: "100%", // Make image fill the container
  },
});
