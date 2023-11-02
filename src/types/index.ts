export type PelopsScreen = (({ navigation, route }: any) => JSX.Element | null) & {
  displayName: string;
};

export enum AuthStrategy {
  LOCAL = "local",
  GOOGLE = "google",
  APPLE = "apple",
}
