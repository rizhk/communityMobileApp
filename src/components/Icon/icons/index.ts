import { ImageRequireSource } from "react-native";

export const icons: Record<string, ImageRequireSource> = {
  "add-friends": require("./add-friends300.png"),
  arrow: require("./arrow300.png"),
  "burger-menu": require("./burger-menu300.png"),
  "chat-menu": require("./chat-menu300.png"),
  course: require("./course300.png"),
  echec: require("./echec300.png"),
  "home-menu": require("./home-menu300.png"),
  "map-menu": require("./map-menu300.png"),
  "notif-menu": require("./notif-menu300.png"),
  "participant-activite": require("./participant-activite300.png"),
  "pin-activite": require("./pin-activite300.png"),
  "pin-activity": require("./pin-activity300.png"),
  "pin-field": require("./pin-field300.png"),
  "pin-tournament": require("./pin-tournament300.png"),
  "pin-pelops-menu": require("./pin-pelops-menu300.png"),
  "realsport-color": require("./realsport-color300.png"),
  "realsport-white": require("./realsport-white.png"),
  star: require("./star300.png"),
  volley: require("./volley300.png"),
  "default-avatar": require("./default-avatar.png"),
  search: require("./search300.png"),
  profile: require("./profile.png"),
};

export type IconTypes = keyof typeof icons;
