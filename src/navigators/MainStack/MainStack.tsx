import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomNav } from "navigators/BottomNav/BottomNav";

import { MainNavProps, MainNavPropsType } from "./MainNavProps";
import { Text } from "components/Text";
import { QuickImage } from "components/Images/QuickImage";
import { Image } from "react-native";
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
            // headerTitle: () => <Image source={require("assets/image/logo-daillens.png")} width={188} height={62} />,
            headerTitle: () => (
              <QuickImage source={require("assets/image/logo-daillens.png")} width={188} height={62} />
            ),
            title: "",
            // headerLeft: () => <Text style={{ color: "white", marginLeft: 10 }}>Back</Text>,
          }}
        />
      ))}
    </Main.Navigator>
  );
}
