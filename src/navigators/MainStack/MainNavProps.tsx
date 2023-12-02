import { NavType } from "navigators/NavType";
import { ActivityScreen, MessageScreen } from "screens";
import { ChannelUserItem } from "types/message";

export interface MainNavPropsType extends NavType<MainStackParamList> {
  noHeader?: boolean;
}

export type MainStackParamList = {
  map: undefined;
  activities: undefined;
  chat: undefined;
  profile: undefined;
  message: { channelUser: ChannelUserItem };
  chats: undefined;
  activity: { activityId: number };
  // activity: { activity: ActivityItemStrapi };
  //   activities: undefined;
  //   "create-activity": { coordinate: Region | null; fieldId: number | null };
  //   "edit-profile": any;
  //   "follower-screen": any;
  //   home: any;
  //   field: { field: FieldItemStrapi };
  //   "create-field": { coordinate: Region | null };
  //   "choose-location-screen": undefined;
  //   "create-tournament": undefined;
  //   "tournament-screen": undefined;
  //   "team-screen": undefined;
  //   "team-participant-screen": undefined;
  //   "create-team": undefined;
};

export const MainNavProps: MainNavPropsType[] = [
  {
    id: 1,
    route: "activity",
    component: ActivityScreen,
  },
  {
    id: 1,
    route: "message",
    component: MessageScreen,
  },
];
