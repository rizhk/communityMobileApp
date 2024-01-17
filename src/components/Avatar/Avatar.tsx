import { Stack } from "components/containers";
import { StackProps } from "components/containers/Stack/Stack.props";
import { IMAGE_SIZE, ImagesSizeTypes, RadiusTypes, ThemeColorType, color } from "theme";
import { Image } from "expo-image";
import { ImageStyle, StyleProp } from "react-native";

type AvatarProps = {
  url: string;
  size?: ImagesSizeTypes | number;
  borderWidth?: number;
  borderRadius?: RadiusTypes | number;
  color?: ThemeColorType;
  containerSx?: StackProps;
};

function Avatar(props: AvatarProps) {
  const { url, size = "md", borderWidth = 3, color = "primary", borderRadius = "full", containerSx } = props;
  const avatarSize = typeof size === "number" ? size : IMAGE_SIZE[size];

  return (
    <Stack
      h={avatarSize}
      w={avatarSize}
      jc="center"
      ai="center"
      overflow="hidden"
      br={borderRadius}
      borderWidth={borderWidth}
      borderColor={color}
      {...containerSx}
    >
      <Image source={url} style={imageStyle} />
    </Stack>
  );
}

export default Avatar;

const imageStyle = {
  flex: 1,
  width: "100%",
  backgroundColor: color.backgroundLight,
} as StyleProp<ImageStyle>;
