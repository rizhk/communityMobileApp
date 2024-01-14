export type AppScreen = ({ navigation, route }: any) => JSX.Element;

export type NavType<ParamList> = {
  route: keyof ParamList;
  component: AppScreen;
};
