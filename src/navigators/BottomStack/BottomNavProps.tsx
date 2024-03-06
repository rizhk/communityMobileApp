import { Calendar, Chat, Home, Info, Map, News, Official, PinOutline } from "assets/svg";
import Joker from "assets/svg/joker.svg";
import { translate } from "i18n";
import { NavType } from "navigators/NavType";
import { SVGAttributes } from "react";
import { CalendarScreen, HomeScreen, InfosScreen, MapScreen, OfficialScreen } from "screens";
// import TestScreen from "screens/TestScreen/TestScreen";

export interface BottomNavPropsType extends NavType<BottomTabParamList> {
  icon: React.FunctionComponent<SVGAttributes<SVGElement>>;
  iconSize: number;
  label: string;
}

export type BottomTabParamList = {
  home: undefined;
  calendar: undefined;
  map: { region?: { latitude: number; longitude: number } };
  official: undefined;
  infos: undefined;
};

export type BottomRoute = keyof BottomTabParamList;

//TODO: change icons from png to svg
export const BottomNavProps: BottomNavPropsType[] = [
  {
    route: "home",
    label: `${translate("screenTitle.community")}`,
    icon: News,
    iconSize: 26,
    component: HomeScreen,
  },
  {
    route: "calendar",
    label: `Calendar`,
    icon: Calendar,
    iconSize: 26,
    component: CalendarScreen,
  },
  {
    route: "map",
    label: `Map`,
    icon: Map,
    iconSize: 26,
    component: MapScreen,
  },
  {
    route: "official",
    label: `Official`,
    icon: Official,
    iconSize: 26,
    component: OfficialScreen,
  },

  {
    route: "infos",
    label: `Info`,
    icon: Info,
    iconSize: 26,
    component: InfosScreen,
  },

  // {
  //   route: "map",
  //   label: `${translate("screenTitle.community")}`,
  //   icon: Home,
  //   iconSize: 26,
  //   component: MapScreen,
  // },
  // {
  //   route: "activities",
  //   label: `${translate("screenTitle.activity")}`,
  //   icon: PinOutline,
  //   iconSize: 26,
  //   component: CalendarScreen,
  // },
  // {
  //   route: "messages",
  //   label: `${translate("screenTitle.messages")}`,
  //   icon: Chat,
  //   iconSize: 26,
  //   component: ChatScreen,
  // },
  // {
  //   route: "test",
  //   label: "Design System",
  //   icon: Joker,
  //   iconSize: 26,
  //   component: TestScreen,
  // },
];
// {
//   id: 3,
//   route: "profile",
//   label: `${translate("screenTitle.profil")}`,
//   icon: User,
//   iconSize: 26,
//   component: ProfileScreen,
// },
