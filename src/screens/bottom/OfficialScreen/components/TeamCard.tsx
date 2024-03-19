import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers/Stack/Stack";

import { QuickImage } from "components/Images/QuickImage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";

import { formatDate } from "utils/helper";
import { TeamItem } from "types/official";

type TeamCardProps = {
  team: TeamItem;
  navigation: NativeStackNavigationProp<MainStackParamList>; // Consider using a more specific type for navigation if possible
};

export function TeamCard({ navigation, team }: TeamCardProps) {
  const { title, name, surname, type, avatar } = team;

  return (
    <Stack br="xs" overflow="hidden">
      <YStack
        gap="xs"
        width={124}
        jc="center"
        ai="center"
        onPress={() => {
          navigation.navigate("team", {
            team,
          });
        }}
      >
        {avatar && <QuickImage width={96} height={96} source={{ uri: avatar.url }} style={{ borderRadius: 75 }} />}
        <Text size="lg" text={name + " " + surname} preset="bold" color="primary" />
        <Text size="xs" text={type} color="grey300" />
      </YStack>
    </Stack>
  );
}

export default TeamCard;
