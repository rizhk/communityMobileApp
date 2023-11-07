import { IconTypes } from "components/Icon/icons";
import { translate } from "i18n";
import { NavType } from "navigators/NavType";
import { ChatScreen } from "screens";
import ActivitiesScreen from "screens/ActivitiesScreen/ActivitiesScreen";
import MapScreen from "screens/MapScreen/MapScreen";
import { ChannelUserItem } from "types/message";

export interface BottomNavPropsType extends NavType<BottomTabParamList> {
  activeIcon: IconTypes;
  tabBarBadge: number;
  iconSize: number;
  label: string;
}

export type BottomTabParamList = {
  map: { region?: { latitude: number; longitude: number } };
  activities: undefined;
  profile: { user: any };
  messages: { channelUser: ChannelUserItem };
};

//TODO: change icons from png to svg
export const BottomNavProps: BottomNavPropsType[] = [
  {
    id: 1,
    route: "map",
    label: `${translate("screenTitle.pelops")}`,
    activeIcon: "home-menu",
    tabBarBadge: 0,
    iconSize: 26,
    component: MapScreen,
  },
  {
    id: 2,
    route: "activities",
    label: `${translate("screenTitle.activity")}`,
    activeIcon: "pin-pelops-menu",
    tabBarBadge: 0,
    iconSize: 26,
    component: ActivitiesScreen,
  },
  {
    id: 5,
    route: "messages",
    label: "Messages",
    activeIcon: "chat-menu",
    tabBarBadge: 0,
    iconSize: 26,
    component: ChatScreen,
  },
  //   {
  //     id: 3,
  //     route: "profile",
  //     label: `${i18n.t("screenTitle.profil")}`,
  //     activeIcon: "profile",
  //     tabBarBadge: 0,
  //     iconSize: 26,
  //     component: ProfileScreen,
  //   },
];
