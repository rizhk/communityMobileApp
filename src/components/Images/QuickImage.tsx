import React from "react";
import { Image, View, StyleSheet, ImageSourcePropType } from "react-native";

type QuickImageProps = {
  source: ImageSourcePropType;
  width?: number;
  height?: number;
  style?: object;
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
    width: "100%",
    height: "100%",
  },
});
