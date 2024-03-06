import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "components/Button";
import { Stack, YStack } from "components/containers";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { ImageStyle, SafeAreaView, StyleProp, Touchable, TouchableOpacity, View } from "react-native";
import { Text } from "components/Text";
import { LeftArrow } from "assets/svg";

import { formatDateFromToday } from "utils/Date";
import { ScrollView } from "react-native-gesture-handler";

import { UserItem } from "types/user";
import { ActualityItem } from "types/actuality";
import CustomScreen from "components/CustomScreen";
import { createEditorJsViewer } from "editorjs-viewer-native";

type Props = NativeStackScreenProps<MainStackParamList, "actuality">;

export function ActualityScreen({ navigation, route }: Props) {
  const { startDate, content, title, contentRTE }: ActualityItem = route.params.actuality;

  const EditorJsViewerNative = createEditorJsViewer();

  const JsonOK = {
    time: 1709571835167,
    blocks: [
      { id: "h-qdcv2w4q", type: "paragraph", data: { text: "Woow du texte" } },
      {
        id: "isiSitF5ip",
        type: "image",
        data: {
          file: { url: "https://res.cloudinary.com/communityappch/image/upload/v1709571803/DSC_4707_484d5256ac.jpg" },
          caption: "",
          withBorder: false,
          stretched: false,
          withBackground: false,
        },
      },
    ],
    version: "2.29.0",
  };

  const JsonTest = {
    time: 1709602991086,
    blocks: [
      { id: "Jvjr-jhhkM", type: "header", data: { text: "Crèche Les P'tits Tartreux", level: 4 } },
      {
        id: "bVAE6ZPeJc",
        type: "paragraph",
        data: { text: "Une nouvelle crèche à Penthaz, dès le 24 août 2020.&nbsp;" },
      },
      {
        id: "2puCVtP9Ot",
        type: "paragraph",
        data: {
          text: 'GARDERIE Les P\'tits Tartreux<br>Rue du Bornalet 1<br>1303 Penthaz<br>021 862 71 91<br><a href="http://facebook.com/Lesptitstartreux" target="_blank" rel="noopener">Facebook.com/Lesptitstartreux</a><br><a href="http://www.petits-tartreux.ch/" target="_blank" rel="noopener">www.petits-tartreux.ch</a>',
        },
      },
      {
        id: "fhDJ1oe917",
        type: "image",
        data: {
          file: { url: "https://res.cloudinary.com/communityappch/image/upload/v1709602905/image_df45cc9c90.png" },
          caption: "",
          withBorder: false,
          stretched: false,
          withBackground: false,
        },
      },
    ],
    version: "2.29.0",
  };

  console.log(contentRTE, "contentRTE");
  console.log(typeof contentRTE, "typeof contentRTE");

  return (
    <CustomScreen navigation={navigation}>
      {/* <YStack h={150} jc="space-evenly">
        <YStack jc="center">
          <Text color="grey500" preset="bold">
            {formatDateFromToday(startDate, "dd MMMM yyy")}
          </Text>
          <Text color="primary" size="lg" preset="bold">
            {title}
          </Text>
        </YStack>
      </YStack> */}
      <Stack h={1} bc="grey600"></Stack>

      {/* {contentRTE && <EditorJsViewerNative data={contentRTE} />} */}
      {/* {contentRTE && <EditorJsViewerNative data={JSON.parse(contentRTE)} />} */}
      {contentRTE && (
        <View>
          <Text>Meeemamsadmqamd </Text>
        </View>
      )}

      {content && (
        <YStack mt={10}>
          <Text preset="bold" size="md" style={{ marginBottom: 10 }} text="Info : " />
          <Text style={{ marginBottom: 10 }} color="dim" text={content} />
          <Stack h={1} bc="grey600"></Stack>
        </YStack>
      )}
    </CustomScreen>
  );
}
