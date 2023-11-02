import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === "ios" ? 64 : 54,
};
