import React from "react";
import { Image, View, StyleSheet, ImageSourcePropType } from "react-native";

type QuickImageProps = {
  source: ImageSourcePropType;
  width: number;
  height: number;
  style?: object;
  imgStyle?: object;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
};

export const QuickImage: React.FC<QuickImageProps> = ({
  source,
  width,
  height,
  imgStyle,
  style,
  resizeMode = "cover",
}) => {
  return (
    <View style={[styles.container, style, { width, height }]}>
      <Image source={source} style={[styles.image, imgStyle]} resizeMode={resizeMode} />
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
