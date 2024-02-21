import { NavType } from "navigators/NavType";
import { ActivityScreen, LocationScreen, ActualityScreen } from "screens";

import { BottomTabParamList } from "../BottomStack/BottomNavProps";
import { ActivityItem } from "types/activity";
import { ActualityItem } from "types/actuality";

import { InfoItem } from "types/info";
import { LocationItem } from "types/location";

export interface MainNavPropsType extends NavType<MainStackParamList> {
  noHeader?: boolean;
}

export type MainStackParamList = BottomTabParamList & {
  activity: { activity: ActivityItem };
  location: { location: LocationItem };
  actuality: { actuality: ActualityItem };
  info: { info: InfoItem };
  // actuality: any;

  // actuality: { actuality: ActualityItem };
  // activity: { activity: ActivityItem };
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
    route: "location",
    component: LocationScreen,
  },
  {
    route: "actuality",
    component: ActualityScreen,
  },
  {
    route: "info",
    component: ActualityScreen,
  },
];
