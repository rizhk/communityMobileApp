import { ChannelUserItem } from "types/message";
import { Region } from "react-native-maps";
import { ActivityItemStrapi, FieldItemStrapi } from "types/activity";

export type NavigationParams = {
  userId: string;
};

export type DeepNavParam = {
  activity: { activity: ActivityItemStrapi };
  chats: undefined;
  message: { channelUser: ChannelUserItem };
  events: undefined;
  "create-activity": { coordinate: Region | null; fieldId: number | null };
  "edit-profile": any;
  "follower-screen": any;
  home: any;
  field: { field: FieldItemStrapi };
  "create-field": { coordinate: Region | null };
  "choose-location-screen": undefined;
  "create-tournament": undefined;
  "tournament-screen": undefined;
  "team-screen": undefined;
  "team-participant-screen": undefined;
  "create-team": undefined;
};
export type BottomMenuNavigatorParamList = {
  // Main app screens
  map: { region?: { latitude: number; longitude: number } };
  events: undefined;
  profile: { user: any };
  messages: { channelUser: ChannelUserItem };
};
