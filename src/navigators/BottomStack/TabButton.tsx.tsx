import { StyleSheet, View } from "react-native";
import { BottomNavProps, BottomNavPropsType } from "./BottomNavProps";
import { Text } from "components/Text/Text";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { G, Rect, Svg } from "react-native-svg";
import * as Animatable from "react-native-animatable";
import { Icon } from "components/Icon";

export interface TabButtonProps {
  tab: BottomNavPropsType;
  onPress?: any;
  accessibilityState?: any;
}

// export default function TabButton({ tab, onPress, accessibilityState }: TabButtonProps) {
//   return (
//     <View>
//       <Text>{tab.label}</Text>
//     </View>
//   );
// }

// Set button icon & animation
const TabButton = (props: TabButtonProps) => {
  // grab the props
  const { tab, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<any>(null);
  const [hasFocus, setFocus] = useState(false);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 1.1 }, 1: { scale: 1.1 } });
      setFocus(true);
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 1 } });
      setFocus(false);
    }
  }, [focused]);
  return (
    <View>
      <Text>{tab.label}</Text>
    </View>
  );
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <View style={styles.view}>
        <Svg
          style={hasFocus ? styles.svgBg : { display: "none" }}
          width="109.681"
          height="85"
          viewBox="0 0 109.681 85"
        >
          <G id="Group_93" data-name="Group 93" transform="translate(1215.841 -825)">
            <Rect
              id="Rectangle_19"
              data-name="Rectangle 19"
              width="64"
              height="85"
              rx="25"
              transform="translate(-1193 825)"
              fill="#ad3822"
            />
          </G>
        </Svg>

        <Animatable.View ref={viewRef} style={styles.tab}>
          <Icon icon={tab.activeIcon} style={{ width: tab.iconSize, height: tab.iconSize }} />
          {tab.tabBarBadge > 0 && (
            <View style={hasFocus ? styles.badgeFocus : styles.badge}>
              <Text style={styles.badgeText}>{tab.tabBarBadge}</Text>
            </View>
          )}
        </Animatable.View>
        {tab.id != BottomNavProps.length && <View style={styles.separator} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    height: 60,
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  svgBg: {
    position: "absolute",
    top: -20,
  },
  tab: {
    width: "100%",
    position: "relative",
    display: "flex",
    marginTop: 15,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  separator: {
    position: "absolute",
    width: 2,
    height: 20,
    right: -1,
    top: "30%",
    borderRadius: 2,
    backgroundColor: "#33383E",
  },
  badge: {
    position: "absolute",
    right: 20,
    top: 10,
    backgroundColor: "#ad3822",
    padding: 3,
    borderRadius: 50,
  },
  badgeFocus: {
    position: "absolute",
    right: 20,
    top: 10,
    backgroundColor: "#33383E",
    padding: 3,
    borderRadius: 50,
  },
  badgeText: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
