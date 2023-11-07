import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavProps, BottomNavPropsType } from "./BottomNavProps";
import TabButton from "./TabButton.tsx";

const Bottom = createBottomTabNavigator();

export function BottomStack() {
  return (
    // <Bottom.Navigator tabBar={(props) => <BottomMenu {...props} />}>
    <Bottom.Navigator
      initialRouteName="map"
      screenOptions={() => ({
        // tabBarStyle: navigationStyles.tabBarStyle,
        // headerStyle: navigationStyles.headerStyle,
        // headerTintColor: color.headercolor,
        // headerTitleAlign: "center",
        // headerTitleStyle: navigationStyles.headerTitleStyle,
      })}
    >
      {BottomNavProps.map((tab: BottomNavPropsType) => (
        <Bottom.Screen
          key={tab.id}
          name={tab.label}
          component={tab.component}
          options={{
            tabBarButton: (props) => <TabButton {...props} tab={tab} />,
          }}
        />
      ))}
    </Bottom.Navigator>
  );
}
