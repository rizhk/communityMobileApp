import { NavType } from "navigators/NavType";
import { ActivityScreen, LocationScreen, ActualityScreen, InfosScreen, OfficialScreen } from "screens/stack";

import { BottomTabParamList } from "../BottomStack/BottomNavProps";
import { ActivityItem } from "types/activity";
import { ActualityItem } from "types/actuality";

import { InfoItem } from "types/info";
import { LocationItem } from "types/location";
import { TeamItem } from "types/official";

export interface MainNavPropsType extends NavType<MainStackParamList> {
  noHeader?: boolean;
}

export type MainStackParamList = BottomTabParamList & {
  team: { team: TeamItem };
  activity: { activity: ActivityItem };
  location: { location: LocationItem };
  actuality: { actuality: ActualityItem };
  info: { info: InfoItem };
};

export const MainNavProps: MainNavPropsType[] = [
  {
    route: "activity",
    component: ActivityScreen,
  },
  {
    route: "team",
    component: OfficialScreen,
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
    component: InfosScreen,
  },
];
