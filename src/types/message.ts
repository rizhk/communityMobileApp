import { ActivityItem } from "types/activity";

import { SportItemStrapi } from "./activity";

export type channelType = "private" | "activity" | "tournament" | "team" | "sport" | "group";

export interface UserItem {
  id: number;
  username: string;
  firstName: string;
  avatar: string | number | undefined;
}

export interface ChannelUserItem {
  id: number;
  channel: ChannelItem;
  lastMessage?: MessageItem;
  user?: UserItem;
}

export interface ChannelItem {
  id: number;
  type: channelType;
  name: string;
  userId?: number;
  image?: string;
  lastMessage?: MessageItem;
  eventDate?: string;
  channelUsers?: ChannelUserItem[];
  messages?: MessageItem[];
  activity?: ActivityItem;
  // tournament?: any;
  sport?: SportItemStrapi;
  user?: UserItem;
}

export interface ChannelUserItem {
  id: number;
  channel: ChannelItem;
  lastMessage?: MessageItem;
  createdAt?: Date;
}

export interface MessageItem {
  id: number;
  content: string;
  channel: ChannelItem;
  author: UserItem;
  createdAt: Date;
  updatedAt?: Date;
  isRead?: boolean;
}
