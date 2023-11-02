import { View, ViewStyle, Text, StyleSheet } from "react-native";
import { GButtonIcon } from "./GButton";
import { IconType } from "react-native-dynamic-vector-icons";
import React from "react";
import { channelType } from "types/message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DeepNavParam } from "navigators/navigator.types";
import { useChat } from "context/ChatContext";

type ChatProps = {
  iconName: string;
  iconType: IconType;
  onPress: () => void | Promise<void> | undefined;
};

export function ChatIcon({ iconName, iconType, onPress }: ChatProps) {
  return <GButtonIcon onPress={onPress} iconName={iconName} iconType={iconType} scale={0.7} />;
}
type GoBackProps = {
  navigation: any;
  sx?: ViewStyle;
  size?: number;
  scale?: number;
  iconSize?: number;
};

export function CrossButton({ onPress }: { onPress: () => void }) {
  return (
    <GButtonIcon
      onPress={onPress}
      iconName="circle-with-cross"
      iconType={IconType.Entypo}
      size={30}
      bgColor="transparent"
      color="lightGrey"
      sx={{ position: "absolute", top: 0, right: 10 }}
    />
  );
}

export function GoBackButton({ navigation, scale = 1, sx = {} }: GoBackProps) {
  return (
    <GButtonIcon
      iconName="arrow-back-ios"
      iconType={IconType.MaterialIcons}
      onPress={() => navigation.goBack()}
      sx={{ paddingLeft: 13 * scale, ...sx }}
      scale={scale}
    />
  );
}

type FilterButtonProps = {
  onPress: () => void;
  sx?: ViewStyle;
};

export function FilterButton({ onPress, sx = {} }: FilterButtonProps) {
  return (
    <GButtonIcon
      iconName="sliders"
      iconType={IconType.FontAwesome}
      onPress={onPress}
      iconSize={25}
      size={60}
      bgColor="grey"
      sx={{ position: "absolute", bottom: 5, right: 5, ...sx }}
    />
  );
}

export function GoBackTitle({
  navigation,
  title,
  sx = {},
}: {
  navigation: any;
  title: string;
  sx?: ViewStyle;
}) {
  return (
    <View style={{ ...styles.goBackContainer, ...sx }}>
      <GoBackButton navigation={navigation} />
      <Text style={styles.goBackTitle}>{title}</Text>
    </View>
  );
}

type Props = {
  channelId?: number;
  type?: channelType;
  id?: number;
  navigation: NativeStackNavigationProp<DeepNavParam, any, undefined>;
  sx?: ViewStyle;
};

export default function JoinChatButton({
  channelId = undefined,
  type,
  id,
  navigation,
  sx = {},
}: Props) {
  const { joinChat } = useChat();
  const chatParam = channelId ? { channelId: channelId } : { type: type, id: id };

  return (
    <GButtonIcon
      onPress={() => joinChat(chatParam, navigation)}
      iconName="chatbox-ellipses-outline"
      iconType={IconType.Ionicons}
      sx={{ ...sx }}
    />
  );
}

const styles = StyleSheet.create({
  goBackContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  goBackTitle: {
    fontSize: 29,
    fontWeight: "bold",
    marginLeft: 20,
    color: "white",
  },
});
