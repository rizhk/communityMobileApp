import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainNavProps, MainNavPropsType } from "./MainNavProps";
import { BottomStack } from "navigators/BottomStack/BottomStack";
import { color, textSize } from "theme";

const Main = createNativeStackNavigator();

export function MainStack() {
  return (
    <Main.Navigator>
      <Main.Screen name="Main" component={BottomStack} options={{ headerShown: false }} />
      {MainNavProps.map((tab: MainNavPropsType) => (
        <Main.Screen
          key={tab.id}
          name={tab.route}
          component={tab.component}
          options={{ headerShown: false }}
        />
      ))}
    </Main.Navigator>
  );
}
