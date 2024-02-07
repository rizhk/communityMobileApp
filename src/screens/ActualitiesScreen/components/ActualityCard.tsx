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
  const { title, content, startDate, cover } = actuality;

  return (
    <Stack br="xs" bc="backgroundCard" overflow="hidden">
      <YStack
        padding="md"
        br="md"
        gap="xs"
        // onPress={() => {
        //   navigation.navigate("actuality", {
        //     actuality,
        //   });
        // }}
      >
        <Text text={formatDateFromToday(startDate ?? new Date(), "dd MMM")} size="xs" color="grey400" />
        <Text size="lg" text={title} preset="bold" color="primary" />

        <XStack ai="center" jc="space-between" w={100}>
          {cover && <QuickImage width={240} height={120} source={{ uri: cover.url }} style={{ borderRadius: 16 }} />}
          {content && <Text text={content} />}
        </XStack>
      </YStack>
    </Stack>
  );
}

export default ActualityCard;

const iconStyle = {
  height: "65%",
  width: "65%",
} as StyleProp<ImageStyle>;
