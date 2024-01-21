import { NavType } from "navigators/NavType";
import { ActivityScreen, MessageScreen } from "screens";

import { BottomTabParamList } from "../BottomStack/BottomNavProps";
import { ActivityItem } from "types/activity";
export interface MainNavPropsType extends NavType<MainStackParamList> {
  noHeader?: boolean;
}

export type MainStackParamList = BottomTabParamList & {
  chats: undefined;
  activity: { activity: ActivityItem };
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
    route: "activity",
    component: ActivityScreen,
  },
  {
    route: "chats",
    component: MessageScreen,
  },
];
