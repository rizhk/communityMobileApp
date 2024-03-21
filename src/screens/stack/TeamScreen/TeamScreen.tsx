import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "components/Button";
import { Stack, XStack, YStack } from "components/containers";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "components/Text";
import { LeftArrow } from "assets/svg";

import { TeamItem } from "types/official";
import { IconForType } from "components/Images/IconType";
import { QuickImage } from "components/Images/QuickImage";

type Props = NativeStackScreenProps<MainStackParamList, "team">;

export function TeamScreen({ route }: Props) {
  const {
    title,
    name,
    surname,
    fonction,
    dicastere,
    avatar,
    phone,
    mail,
    descriptionDicastere,
    suppleant,
    type,
  }: TeamItem = route.params.team;

  return (
    <SafeAreaView>
      <ScrollView>
        <YStack jc="space-evenly">
          <YStack jc="center">
            <XStack gap="md" ai="center">
              {avatar && (
                <QuickImage width={96} height={96} source={{ uri: avatar.url }} imgStyle={{ borderRadius: 75 }} />
              )}
              <Text color="primary" size="lg" preset="bold">
                {title} {name} {surname}
              </Text>
            </XStack>

            <YStack gap="md" mt={16}>
              {fonction && (
                <View>
                  <Text text="Fonction" preset="teamTitle" />
                  <Text text={fonction} size="sm" />
                </View>
              )}

              {dicastere && (
                <View>
                  <Text text="Dicastere" preset="teamTitle" />
                  <Text text={dicastere} size="sm" />
                </View>
              )}

              {phone && (
                <View>
                  <Text text="Téléphone" preset="teamTitle" />
                  <Text text={phone} size="sm" />
                </View>
              )}

              {mail && (
                <View>
                  <Text text="Email" preset="teamTitle" />
                  <Text text={mail} size="sm" />
                </View>
              )}

              {suppleant && (
                <View>
                  <Text text="Suppléant" preset="teamTitle" />
                  <Text text={suppleant} size="sm" />
                </View>
              )}

              {descriptionDicastere && (
                <View>
                  <Text text="Description" preset="teamTitle" />
                  <Text text={descriptionDicastere} size="sm" />
                </View>
              )}
            </YStack>

            {/* <Text text={formatDate(startDate)} size="xs" color="grey400" />
            {endDate && <Text text={` - ${formatDate(endDate)}`} size="xs" color="grey400" />}
            {contentRTE && <EditorJsParser content={contentRTE} />}
            {contentQuill && <RenderHTML contentWidth={width} source={{ html: contentQuill }} />} */}
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
