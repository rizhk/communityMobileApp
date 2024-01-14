import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomStack } from "navigators/BottomStack/BottomStack";

import { MainNavProps, MainNavPropsType } from "./MainNavProps";

const Main = createNativeStackNavigator();

export function MainStack() {
  return (
    <Main.Navigator>
      <Main.Screen name="Main" component={BottomStack} options={{ headerShown: false }} />
      {MainNavProps.map((tab: MainNavPropsType) => (
        <Main.Screen key={tab.route} name={tab.route} component={tab.component} options={{ headerShown: false }} />
      ))}
    </Main.Navigator>
  );
}
