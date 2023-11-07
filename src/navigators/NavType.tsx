export type AppScreen = ({ navigation, route }: any) => JSX.Element;

export type NavType<ParamList> = {
  id: number;
  route: keyof ParamList;
  component: AppScreen;
};
