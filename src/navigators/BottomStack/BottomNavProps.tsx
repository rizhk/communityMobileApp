import { Chat, Home, PinOutline } from "assets/svg";
import Joker from "assets/svg/joker.svg";
import { translate } from "i18n";
import { NavType } from "navigators/NavType";
import { SVGAttributes } from "react";
import { ActivitiesScreen, ChatScreen, MapScreen } from "screens";
import TestScreen from "screens/TestScreen/TestScreen";
import { ChannelUserItem } from "types/message";
//TODO: remove (test purpose)
export interface BottomNavPropsType extends NavType<BottomTabParamList> {
  icon: React.FunctionComponent<SVGAttributes<SVGElement>>;
  tabBarBadge: number;
  iconSize: number;
  label: string;
}

export type BottomTabParamList = {
  map: { region?: { latitude: number; longitude: number } };
  activities: undefined;
  profile: { user: any };
  messages: { channelUser: ChannelUserItem };
  test: undefined;
};

//TODO: change icons from png to svg
export const BottomNavProps: BottomNavPropsType[] = [
  {
    id: 1,
    route: "map",
    label: `${translate("screenTitle.pelops")}`,
    icon: Home,
    tabBarBadge: 0,
    iconSize: 26,
    component: MapScreen,
  },
  {
    id: 2,
    route: "activities",
    label: `${translate("screenTitle.activity")}`,
    icon: PinOutline,
    tabBarBadge: 0,
    iconSize: 26,
    component: ActivitiesScreen,
  },
  {
    id: 5,
    route: "messages",
    label: `${translate("screenTitle.messages")}`,
    icon: Chat,
    tabBarBadge: 0,
    iconSize: 26,
    component: ChatScreen,
  },
  // {
  //   id: 3,
  //   route: "profile",
  //   label: `${i18n.t("screenTitle.profil")}`,
  //   icon: User,
  //   tabBarBadge: 0,
  //   iconSize: 26,
  //   component: ProfileScreen,
  // },
  //TODO: remove (test purpose)
  {
    id: 6,
    route: "test",
    label: "Design System",
    icon: Joker,
    tabBarBadge: 0,
    iconSize: 26,
    component: TestScreen,
  },
];
