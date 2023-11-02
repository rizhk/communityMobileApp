import { TouchableOpacityProps } from "react-native";
import { ChannelItem, MessageItem } from "types/message";

export interface ChannelCardProps extends TouchableOpacityProps {
  channel: ChannelItem;
  lastMessage?: MessageItem;
}
