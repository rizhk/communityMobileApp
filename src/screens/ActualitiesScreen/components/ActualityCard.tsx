import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers/Stack/Stack";
import { useState } from "react";
import { Image, ImageBackground, StyleProp, ImageStyle } from "react-native";

import { INFINIT_PARTICIPANTS } from "constants/global";

import { formatDateFromToday } from "utils/Date";
import AddressField from "components/AddressField";
import { ActualityItem } from "types/actuality";

type ActualityCardProps = {
  actuality: ActualityItem;
  navigation: any;
};

export function ActualityCard({ navigation, actuality }: ActualityCardProps) {
  const { title, content, contentRtM, contentRtB, endDate, startDate, cover, document } = actuality;
  // const bidoum = actuality.bidoum;

  const [formatDate, setFormatDate] = useState("");
  const textSize = formatDate.length > 6 ? "md" : "lg";

  return (
    <Stack h={90} br="xs" bc="backgroundLight" overflow="hidden">
      <ImageBackground source={require("assets/image/tileCard/1.png")}>
        <XStack
          pa="xxs"
          br="md"
          gap="xs"
          onPress={() => {
            navigation.navigate("activity", {
              actuality: actuality,
            });
          }}
        >
          <YStack ai="center" jc="space-between" w={100}>
            <Text size={"xl"} text={title} preset="bold" color="primary" />
            {/* <Image source={{ uri: sport?.icon?.url }} resizeMode="contain" style={iconStyle} /> */}
            <Text
              text={formatDateFromToday(startDate ?? new Date(), "dd MMM")}
              preset="bold"
              color="primary"
              size={textSize}
            />
          </YStack>
          <YStack flexGrow jc="space-around">
            {/* <Text text={sport?.name} preset="bold" size="xl" /> */}
            {/* <AddressField coord={{ longitude: longitude, latitude: latitude }} format={"%city%, %state%"} /> */}
            {/* <XStack w="100%" gap="xs">
              <User color={color.white} />
              <Text text={`${participants.length} / ${nbmaxParticipants}`} preset="bold" size="xs" />
            </XStack> */}
          </YStack>
        </XStack>
      </ImageBackground>
    </Stack>
  );
}

export default ActualityCard;

const iconStyle = {
  height: "65%",
  width: "65%",
} as StyleProp<ImageStyle>;
