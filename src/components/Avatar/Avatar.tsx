import { Text } from "components/Text";
import { Stack } from "components/containers";
import { Image, View } from "react-native";
import { GravityType, ResizeType, cloudinaryUrl } from "utils/helper";

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
  // console.log("source :", source)
  return (
    <View style={containerStyle}>
      
      {source && typeof source == "string" && (
        <Stack>
        <Image
        
        source={{
          uri: cloudinaryUrl(source, SOURCE_SIZE, SOURCE_SIZE, resize, gravity),
        }}
        style={{ ...style, ...sx }}
        />
        <Text>salut</Text>
        </Stack>
      )}
      {/* REPLACE BY NEW ICON */}
      {/* {!source && <Icon icon={icons["default-avatar"]} style={{ ...style, ...sx }} />} */}
    </View>
  );
}

export default Avatar;
