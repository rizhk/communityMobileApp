import * as React from "react";
import { View, ImageStyle } from "react-native";
import { AutoImage as Image } from "components/AutoImage";
import { icons } from "./icons";
import { IconProps } from "./icon.props";

const ROOT: ImageStyle = {
  resizeMode: "contain",
};

function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props;
  // console.log("icon", icon);
  const source = typeof icon === "string" ? icons[icon] : icon;
  // console.log("source", source)

  return (
    <View style={containerStyle}>
      <Image style={[ROOT, styleOverride]} source={source} />
    </View>
  );
}

export default Icon;
