import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers/Stack/Stack";
import { useState } from "react";
import { Image, ImageBackground, StyleProp, ImageStyle } from "react-native";
import { formatDateFromToday } from "utils/Date";
import AddressField from "components/AddressField";
import { ActualityItem } from "types/actuality";
import { QuickImage } from "components/ImageComponent";

type ActualityCardProps = {
  actuality: ActualityItem;
  navigation: any; // Consider using a more specific type for navigation if possible
};

export function ActualityCard({ navigation, actuality }: ActualityCardProps) {
  const { title, content, endDate, startDate, cover } = actuality;

  const [formatDate, setFormatDate] = useState("");
  const textSize = formatDate.length > 6 ? "md" : "lg";

  return (
    <Stack br="xs" bc="backgroundLight" overflow="hidden">
      {/* <ImageBackground source={cover ? { uri: cover.url } : require("assets/image/tileCard/1.png")}> */}
      <XStack
        pa="xxs"
        br="md"
        gap="xs"
        onPress={() => {
          navigation.navigate("actuality", {
            actuality,
          });
        }}
      >
        <YStack ai="center" jc="space-between" w={100}>
          {cover && <QuickImage width={240} height={120} source={{ uri: cover.url }} style={{ borderRadius: 16 }} />}

          <Text size="xl" text={title} preset="bold" color="primary" />
          <Text
            text={formatDateFromToday(startDate ?? new Date(), "dd MMM")}
            preset="bold"
            color="primary"
            size={textSize}
          />
        </YStack>
        <YStack flexGrow jc="space-around">
          {content && <Text text={content} />}
          {endDate && (
            <Text text={`Ends: ${formatDateFromToday(endDate, "dd MMM")}`} preset="bold" color="secondary" size="sm" />
          )}
          {/* Additional details like address or participants can be added here */}
        </YStack>
      </XStack>
      {/* </ImageBackground> */}
    </Stack>
  );
}

export default ActualityCard;

const iconStyle = {
  height: "65%",
  width: "65%",
} as StyleProp<ImageStyle>;
