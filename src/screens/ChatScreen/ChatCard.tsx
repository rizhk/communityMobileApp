import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { cardStyles } from "./chat.styles";
import { Avatar } from "components/Avatar";
import * as Location from "expo-location";
import { ChannelItem, MessageItem } from "types/message";
import { formatDateFromToday } from "utils/Date";
// import { Icon } from "components/Icon";

export interface ChannelCardProps extends TouchableOpacityProps {
  channel: ChannelItem;
  lastMessage?: MessageItem;
}

export function ChatCard(props: ChannelCardProps) {
  const { channel, lastMessage, onPress } = props;
  const lastIsRead = lastMessage?.id === channel.lastMessage?.id || false;
  const [locationString, setLocationString] = useState<string>("");

  useEffect(() => {
    if (channel.type !== "activity") return;
    const activity = channel.activity;
    const latitude = activity.latitude;
    const longitude = activity.longitude;
    Location.reverseGeocodeAsync({ latitude, longitude }).then((location) => {
      setLocationString(`${location[0].city} (${location[0].region}), ${location[0].name}`);
    });
  }, [channel]);

  return (
    <TouchableOpacity activeOpacity={1} style={cardStyles.messageContainer} onPress={onPress}>
      <View style={cardStyles.messageWrapper}>
        <View style={cardStyles.messageAvatar}>
          <Avatar
            source={channel.image}
            size={60}
            sx={cardStyles.avatarImage}
            containerStyle={
              lastIsRead ? cardStyles.avatarContainerBaseInactif : cardStyles.avatarContainerBase
            }
          />
        </View>
        <View style={cardStyles.messageDetailsContainer}>
          <View style={cardStyles.messageHeader}>
            <Text style={lastIsRead ? cardStyles.messageTitleInactif : cardStyles.messageTitle}>
              {channel.name?.substring(0, 22) + (channel.name?.length > 22 ? "..." : "")}
            </Text>
            {lastMessage?.createdAt && (
              <Text style={lastIsRead ? cardStyles.notifDateInactif : cardStyles.notifDate}>
                {formatDateFromToday(lastMessage.createdAt, true)}
              </Text>
            )}
          </View>
          {channel.lastMessage && (
            <Text
              style={lastIsRead ? cardStyles.messageTextInactif : cardStyles.messageText}
              numberOfLines={2}
            >
              {channel.type !== "private" && (
                <Text style={lastIsRead ? cardStyles.messageUserInactif : cardStyles.messageUser}>
                  {channel.lastMessage.author?.firstName || "Unknown"}
                  {": "}
                </Text>
              )}
              {channel.lastMessage.content?.substring(0, 50) +
                (channel.lastMessage.content?.length > 50 ? "..." : "")}
            </Text>
          )}
        </View>
      </View>
      {(channel.type === "activity" || channel.type === "tournament") && (
        <View style={cardStyles.eventDetails}>
          <Text style={cardStyles.eventDate}>{channel.eventDate}</Text>
          <View style={cardStyles.location}>
            <Icon icon={"pin-activite"} style={cardStyles.icon} />
            <Text style={cardStyles.eventText}>
              {locationString.substring(0, 35) + (locationString.length > 35 ? "..." : "")}
            </Text>
          </View>
        </View>
      )}

      <View style={cardStyles.border} />
    </TouchableOpacity>
  );
}
