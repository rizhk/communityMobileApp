import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers/Stack/Stack";

import { formatDateFromToday } from "utils/Date";

import { ActualityItem } from "types/actuality";
import { QuickImage } from "components/Images/QuickImage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { createEditorJsViewer } from "editorjs-viewer-native";
import { StyleSheet, View } from "react-native";
import EditorJsParser from "components/EditorJsParser";
import { formatDate } from "utils/helper";
import { Image, ImageBackground } from "expo-image";
import { color, palette } from "theme";
import { IconForType } from "components/Images/IconType";
import { X } from "lucide-react-native";

type ActualityCardProps = {
  actuality: ActualityItem;
  navigation: NativeStackNavigationProp<MainStackParamList>; // Consider using a more specific type for navigation if possible
};

export function ActualityCard({ navigation, actuality }: ActualityCardProps) {
  const { title, publishedAt, cover, type } = actuality;
  console.log(type, "type in ActualityCard");

  const isFeatured = false;

  const onPressHandler = () => {
    navigation.navigate("actuality", {
      actuality,
    });
  };

  const featuredCard = (
    <View style={styles.featuredCard}>
      {cover && (
        <ImageBackground source={{ uri: cover.url }} style={styles.background}>
          <View style={styles.overlay}>
            <IconForType type={type} color="white" />
            <Text text={formatDate(publishedAt)} size="xs" color="white" />
            <Text size="lg" text={title} preset="bold" color="white" />
            {/* <Text style={styles.featuredInfoText}>Plus d'informations</Text> */}
          </View>
        </ImageBackground>
      )}
    </View>
  );

  const regularCard = (
    <Stack br="xs" bc="backgroundCard" overflow="hidden">
      <YStack padding="md" br="md" gap="xs" onPress={onPressHandler}>
        <XStack gap="xs" ai="center">
          <IconForType type={type} color={color.grey400} />
          <Text text={formatDate(publishedAt)} size="xs" color="grey400" />
        </XStack>

        <Text size="lg" text={title} preset="bold" color="primary" />
      </YStack>
    </Stack>
  );

  return isFeatured ? featuredCard : regularCard;
}

const styles = StyleSheet.create({
  featuredCard: {
    borderRadius: 8,
    overflow: "hidden",
  },
  background: {
    width: "100%",
    height: 250,
  },
  overlay: {
    padding: 16,
    bottom: 0,
    position: "absolute",
    width: "100%",
    backgroundColor: palette.communityPrimary,
  },
  featuredDateText: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
  },
  featuredTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  featuredInfoText: {
    fontSize: 18,
    color: "white",
  },
});

export default ActualityCard;
