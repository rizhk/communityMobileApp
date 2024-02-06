export type CommunityScreen = (({ navigation, route }: any) => JSX.Element | null) & {
  displayName: string;
};

export enum AuthStrategy {
  LOCAL = "local",
  GOOGLE = "google",
  APPLE = "apple",
}
