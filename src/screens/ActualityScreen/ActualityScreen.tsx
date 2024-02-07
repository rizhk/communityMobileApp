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

type Props = NativeStackScreenProps<MainStackParamList, "actuality">;

export function ActualityScreen({ navigation, route }: Props) {
  const { startDate, content, title }: ActualityItem = route.params.actuality;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack flex={1} pa={"md"} mt="xxxl">
          <Button
            onPress={() => {
              navigation.goBack();
              // console.log("ysaad");
            }}
            icon={LeftArrow}
            iconScale={3}
            rounded
          />

          {/* <Stack jc="center" ai="center" h={200}>
            <Image source={{ uri: sport.icon.url }} resizeMode="contain" style={iconStyle} />
          </Stack> */}
          <YStack h={150} jc="space-evenly">
            {/* <YStack jc="center">
              <AddressField
                textProps={{ size: "sm" }}
                coord={coord}
                format={"%city% (%state%), %street% %streetNb%"}
                color="white"
              />
              {distance ? (
                <Text>{distance}</Text>
              ) : (
                <Stack ai="flex-start">
                  <ActualityIndicator animating={true} hidesWhenStopped={true} />
                </Stack>
              )}
            </YStack> */}
            <YStack jc="center">
              <Text color="grey500" preset="bold">
                {formatDateFromToday(startDate, "dd MMMM yyy")}
              </Text>
              <Text color="primary" size="lg" preset="bold">
                {title}
              </Text>
            </YStack>
          </YStack>
          <Stack h={1} bc="grey600"></Stack>

          {content && (
            <YStack mt={10}>
              <Text preset="bold" size="md" style={{ marginBottom: 10 }} text="Info : " />
              <Text style={{ marginBottom: 10 }} color="dim" text={content} />
              <Stack h={1} bc="grey600"></Stack>
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
