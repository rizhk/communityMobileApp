/**
 * Screens
 * */
import { EventsScreen, MapScreen } from "screens";
import { BottomMenuNavigatorParamList } from "navigators/navigator.types";
import { IconTypes } from "../../components/icon/icons";
import { PelopsScreen } from "../../types";
import { ProfileScreen } from "screens/profile";
import { ChatScreen } from "screens/index";
import i18n from "i18n-js";

export type TabProps = {
  id: number;
  route: keyof BottomMenuNavigatorParamList;
  label: string;
  activeIcon: IconTypes;
  tabBarBadge: number;
  iconSize: number;
  component: PelopsScreen;
};

/**
 * Tab navigation items with their options
 *
 * Icons can be uploaded to src/components/icon/icons
 * and then added to src/components/icon/icons/index.ts
 */
export const TabArr: TabProps[] = [
  {
    id: 1,
    route: "map",
    label: `${i18n.t("screenTitle.pelops")}`,
    activeIcon: "home-menu",
    tabBarBadge: 0,
    iconSize: 26,
    component: MapScreen,
  },
  // {
  //   id: 2,
  //   route: "events",
  //   label: `${i18n.t("screenTitle.activity")}`,
  //   activeIcon: "pin-pelops-menu",
  //   tabBarBadge: 0,
  //   iconSize: 26,
  //   component: EventsScreen,
  // },
  // {
  //   id: 5,
  //   route: "messages",
  //   label: "Messages",
  //   activeIcon: "chat-menu",
  //   tabBarBadge: 0,
  //   iconSize: 26,
  //   component: ChatScreen,
  // },
  // {
  //   id: 3,
  //   route: "profile",
  //   label: `${i18n.t("screenTitle.profil")}`,
  //   activeIcon: "profile",
  //   tabBarBadge: 0,
  //   iconSize: 26,
  //   component: ProfileScreen,
  // },

  // {
  //   id: 4,
  //   route: "notifications",
  //   label: "Notifications",
  //   activeIcon: "notif-menu",
  //   tabBarBadge: 0,
  //   iconSize: 26,
  //   component: NotifScreen,
  // },

  // {
  //   id: 6,
  //   route: "activity",
  //   label: "Activity",
  //   activeIcon: "notif-menu",
  //   tabBarBadge: 0,
  //   iconSize: 26,
  //   component: ActivityScreen,
  // },
];
