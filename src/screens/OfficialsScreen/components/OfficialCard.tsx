import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers/Stack/Stack";

import { QuickImage } from "components/ImageComponent";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";

import { formatDate } from "utils/helper";
import { UserItem } from "types/user";

type OfficialCardProps = {
  official: UserItem;
  navigation: NativeStackNavigationProp<MainStackParamList>; // Consider using a more specific type for navigation if possible
};

export function OfficialCard({ navigation, official }: OfficialCardProps) {
  const { title, type, startDate, endDate, cover } = official;

  return (
    <Stack br="xs" bc="backgroundCard" overflow="hidden">
      <YStack
        padding="md"
        br="md"
        gap="xs"
        onPress={() => {
          navigation.navigate("official", {
            official,
          });
        }}
      >
        <XStack ai="flex-start" jc="flex-start">
          {cover && <QuickImage width={120} height={120} source={{ uri: cover.url }} style={{ borderRadius: 16 }} />}
          <YStack gap="xs" flex={1} ml="sm">
            <Text size="xs" text={type} color="grey300" />
            <Text size="lg" text={title} preset="bold" color="primary" />
            <XStack>
              {/* //STYLE: Change to badge like figma */}
              <Text text={formatDate(startDate)} size="xs" color="grey400" />
              {endDate && <Text text={` - ${formatDate(endDate)}`} size="xs" color="grey400" />}
            </XStack>
          </YStack>
        </XStack>
      </YStack>
    </Stack>
  );
}

export default OfficialCard;
