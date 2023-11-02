import React, { Image, View } from "react-native";
import { Icon } from "components/Icon";
import { GravityType, ResizeType, cloudinaryUrl } from "utils/helper";
import { icons } from "components/icon/icons";

type AvatarProps = {
  source: string | number | undefined;
  size?: number;
  sx?: any;
  containerStyle?: any;
  noBorder?: boolean;
  resize?: ResizeType;
  gravity?: GravityType;
};

const SOURCE_SIZE = 150;

function Avatar({
  source = undefined,
  size = 30,
  sx = undefined,
  containerStyle = {},
  resize = "fill",
  gravity = "face",
}: AvatarProps) {
  const style = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  return (
    <View style={containerStyle}>
      {source && typeof source == "string" && (
        <Image
          source={{
            uri: cloudinaryUrl(source, SOURCE_SIZE, SOURCE_SIZE, resize, gravity),
          }}
          style={{ ...style, ...sx }}
        />
      )}
      {!source && <Icon icon={icons["default-avatar"]} style={{ ...style, ...sx }} />}
    </View>
  );
}

export default Avatar;
