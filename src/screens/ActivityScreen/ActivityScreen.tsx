import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "components/Button";
import { Stack, YStack } from "components/containers";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { Image, ImageStyle, SafeAreaView, StyleProp, View } from "react-native";
import { Text } from "components/Text";
import { LeftArrow } from "assets/svg";
import { color } from "theme";
import AddressField from "components/AddressField";
import { formatDateFromToday } from "utils/Date";
import { Avatar } from "components/Avatar";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { useEffect } from "react";
import { useDistance } from "hooks/useDistance";
import { LocationType } from "types/global";

type Props = NativeStackScreenProps<MainStackParamList, "activity">;

export function ActivityScreen({ navigation, route }: Props) {

  const activity = route.params.activity.attributes;
  const icon = activity.sport.data.attributes.icon.data.attributes.url;
  const sportName = activity.sport.data.attributes.name;
  const date = formatDateFromToday(activity.date, "dd MMMM yyy");
  const participants = activity.participants.data;
  const description = activity.description;
  const hour = {
    start : "12:00",
    end : "14:00",
  }
  const coord : LocationType= {
    longitude : activity.longitude,
    latitude : activity.latitude,
  }
  const distance = useDistance(coord);


  return (
    <SafeAreaView style={{flex:1}}>

      <ScrollView>
      <YStack flex={1} pa={"md"} overflow="scroll">
        <Button
          icon={LeftArrow}
          iconScale={3}
          rounded
          onPress={() => {
            navigation.goBack();
          }}
          />
        <YStack jc="center" ai="center"  h={200}>
          <Image source={{ uri: icon }} resizeMode="contain" style={iconStyle} />
        </YStack>
        <YStack h={150} jc="space-evenly">
          <YStack jc="center">
            <Text size="xl" preset="bold">{sportName}</Text>
            <AddressField textProps={{size : "sm"}} coord={coord} format={"%city% (%state%), %street% %streetNb%"} color="white"/> 
            <Text>{distance}</Text>
          </YStack>
          <YStack  jc="center">
            <Text color="primary" preset="bold">{date}</Text>
            <Text color="primary">{hour.start} - {hour.end}</Text>
          </YStack>
        </YStack>
        <Stack h={1} bc="grey600"></Stack>
        <YStack h={130} jc="space-evenly">
          <Text preset="bold" size="md">{participants.length} Participant.e.s</Text>
          <Avatar source={participants[1].attributes.avatar.data.attributes.url} containerStyle={{ width:30}}/>
        </YStack>
        <Stack h={1} bc="grey600"></Stack>
        {description && 
          <YStack mt={10}>
            <Text preset="bold" size="md" style={{marginBottom: 10}}>Info : </Text>
            <Text style={{marginBottom: 10}} color="dim">{description}</Text>
            <Stack h={1} bc="grey600"></Stack>
          </YStack>
        }

      </YStack>
    </ScrollView>
    </SafeAreaView>
  );
}

const iconStyle = {
  height: 180,
  width: 180,
} as StyleProp<ImageStyle>;