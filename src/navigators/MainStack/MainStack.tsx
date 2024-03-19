import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomNav } from "navigators/BottomNav/BottomNav";

import { MainNavProps, MainNavPropsType } from "./MainNavProps";

import { QuickImage } from "components/Images/QuickImage";

import { color } from "theme";

const Main = createNativeStackNavigator();

export function MainStack() {
  return (
    <Main.Navigator>
      <Main.Screen name="bottom" component={BottomNav} options={{ headerShown: false }} />
      {MainNavProps.map((tab: MainNavPropsType) => (
        <Main.Screen
          key={tab.route}
          name={tab.route}
          component={tab.component}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: color.primaryLight,
            },
            contentStyle: {
              padding: 20,
            },
            headerTitleAlign: "center",
            headerTitle: () => (
              <QuickImage
                source={require("assets/image/logo-daillens.png")}
                height={64}
                width={160}
                resizeMode="contain"
              />
            ),
            title: "",
          }}
        />
      ))}
    </Main.Navigator>
  );
}
