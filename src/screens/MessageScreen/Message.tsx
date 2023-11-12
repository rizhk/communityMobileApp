import React from "react";
import { Text, View } from "react-native";
import { MessageStyles } from "./message.styles";
import { palette } from "theme/palette";
import { differenceInCalendarDays, format } from "date-fns";
import { MessageItem } from "types/message";
import { Avatar } from "components/Avatar";
import { useAuth } from "context/AuthContext";
import { formatDateFromToday } from "utils/Date";

export type MessageProps = {
  message: MessageItem;
  prevDate?: Date;
};

export function Message({ message, prevDate = new Date(200, 1, 1) }: MessageProps) {
  const { content, createdAt, author } = message;
  const { user } = useAuth();
  const isAuthor = user.id === author.id;
  const channelType = message.channel.type;
  return (
    <View style={MessageStyles.outerContainer}>
      {differenceInCalendarDays(new Date(createdAt), new Date(prevDate)) > 0 && (
        <Text style={MessageStyles.date}>{formatDateFromToday(createdAt)}</Text>
      )}
      <View
        testID="Message"
        style={{
          ...MessageStyles.innerContainer,
          justifyContent: isAuthor ? "flex-end" : "flex-start",
        }}
      >
        {!isAuthor && <Avatar source={author.avatar} />}
        <View
          style={{
            ...MessageStyles.content,
            backgroundColor: isAuthor ? palette.red : palette.lightGrey,
          }}
        >
          {!isAuthor && channelType !== "private" && (
            <Text style={MessageStyles.authorText}>{author.firstName}</Text>
          )}
          <Text style={{ ...MessageStyles.contentText }}>{content}</Text>
          <Text
            style={{
              ...MessageStyles.timeText,
              color: !isAuthor ? palette.darkGrey : palette.grey,
            }}
          >
            {format(new Date(createdAt), "HH:mm")}
          </Text>
        </View>
        {isAuthor && <Avatar source={author.avatar} />}
      </View>
    </View>
  );
}
