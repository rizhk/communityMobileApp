import { MessageItem, channelType } from "types/message";

export type MessageProps = {
  message: MessageItem;
  isAuthor: boolean;
  isRead?: boolean;
  channelType?: channelType;
};
