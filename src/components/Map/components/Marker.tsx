import { PinPlain } from "assets/svg";
import { Text } from "components/Text";
import { Stack } from "components/containers";
import { StyleSheet, Image } from "react-native";
import { color as themeColor } from "theme";

interface CustomMarkerProps {
  participantCount: number | undefined;
  image: string | undefined;
  type?: "activity" | "field" | "tournament";
}

const ICON_SIZE = 60;

export function CustomMarker(props: CustomMarkerProps) {
  const { type, participantCount, image } = props;
  const pinType = type ? `pin-${type}` : "pin-activity";

  return (
    <Stack h={ICON_SIZE} top={-ICON_SIZE / 2}>
      <PinPlain color={themeColor["primary"]} height={ICON_SIZE} width={ICON_SIZE} />
      {/* TODO: Use CLoudinary image ? Or improve function to get image from cloudinary */}
      {image && <Image source={{ uri: image }} resizeMode="contain" style={styles.pinImage} />}
      {/* <Stack position="absolute" bc="white" br="full" w={"25%"} h={"25%"} jc="center" ai="center" left={"70%"}>
          <Text preset="bold" color="black" size={ICON_SIZE/7} text={participantCount?.toString()}/>
        </Stack> */}
    </Stack>
  );
}

const styles = StyleSheet.create({
  pinImage: {
    width: ICON_SIZE / 2,
    height: ICON_SIZE / 2,
    position: "absolute",
    top: "10%",
    left: "25%",
  },
});
