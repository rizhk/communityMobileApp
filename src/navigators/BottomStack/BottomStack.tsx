import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { color, text } from "theme";

import { BottomNavProps, BottomNavPropsType } from "./BottomNavProps";
import TabButton from "./TabButton.tsx";
import Header from "components/Header/Header";

const Bottom = createBottomTabNavigator();

export function BottomStack() {
  return (
    <Bottom.Navigator
      initialRouteName="map"
      screenOptions={() => ({
        header: () => <Header title="test" />,
        // headerTintColor: color.white,
        // headerTitleStyle: { fontWeight: "bold", fontSize: text.lg },
        tabBarStyle: {
          backgroundColor: color.backgroundLight,
          height: 80,
          borderTopWidth: 0.5,
          borderTopColor: color.grey600,
        },
      })}
    >
      {BottomNavProps.map((tab: BottomNavPropsType) => (
        <Bottom.Screen
          key={tab.id}
          name={tab.label}
          component={tab.component}
          options={{
            tabBarButton: (props) => (
              <TabButton {...props} tab={tab} isLast={tab.id === BottomNavProps[BottomNavProps.length - 1].id} />
            ),
          }}
        />
      ))}
    </Bottom.Navigator>
  );
}
