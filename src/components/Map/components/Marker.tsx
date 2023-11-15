import { Icon } from "components/Icon";
import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Platform } from "react-native";

import { Image } from "react-native";
import { color, radius, spacing, TextStyles, shadow } from "theme";

import Svg, { Path } from "react-native-svg";

const PinIcon = () => {
  return (
    <Svg width="60.435" height="80.101" viewBox="0 0 60.435 80.101">
      <Path
        d="M-548.5-413.5a21.2,21.2,0,0,1,21.2-21.2,21.2,21.2,0,0,1,21.2,21.2,21.2,21.2,0,0,1-21.2,21.2h0v19.7C-540.131-384.143-549.187-397.011-548.5-413.5Z"
        transform="translate(557.54 443.7)"
        fill="#ad3822"
      />
    </Svg>
  );
};

interface CustomMarkerProps {
  activityID: number;
  participantCount: number | undefined;
  image: ImageUpload;
  //   pinImage?: IconTypes | ImageRequireSource;
  pinImage?: any;
  type?: "activity" | "field" | "tournament";
}

export function CustomMarker({
  type,
  activityID,
  participantCount,
  image,
  pinImage,
}: CustomMarkerProps) {
  const pinType = type ? `pin-${type}` : "pin-activity";

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      //   style={[
      //     styles.pinWrapper,
      //     {
      //       width: 60,
      //       height: 60,
      //       marginBottom: Platform.OS === "ios" ? 60 : 0,
      //       marginTop: Platform.OS === "android" ? 20 : 0,
      //     },
      //   ]}
    >
      {/* participants number */}
      {/* {participantCount !== undefined && participantCount >= 0 && (
        <View style={styles.pinContainer}>
          <Text style={styles.pinNotifCount}>{participantCount}</Text>
        </View>
      )} */}

      <View style={styles.pinContainer}>
        <Text style={styles.pinNotifCount}>112</Text>
      </View>

      <View style={styles.pinContainer}>
        <PinIcon />
        {image && <Image source={{ uri: image }} resizeMode="contain" style={styles.pinImage} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pinContainer: {
    // ...shadow.sm,
    // alignItems: "center",
    // justifyContent: "center",
  },
  pinNotifContainer: {
    backgroundColor: color.white,
    position: "absolute" as const,
    zIndex: 1,
    elevation: 1,
    right: "10%",
    top: "-15%",
    borderRadius: radius.full,
  },
  pinNotifCount: {
    // ...TextStyles.weight.bold,
    // ...TextStyles.h6,
    color: color.text,
    paddingHorizontal: 4,
  },
  pinImage: {
    width: 30,
    height: 30,
    top: 16,
    left: 16,
    position: "absolute",
  },
});

const PinStyles = {
  pin: {
    front: {
      position: "absolute" as const,
      zIndex: 1,
      elevation: 1,
      Padding: 20,
      top: "12%",
      left: "25%",
      width: "50%",
      height: "50%",
    },
    back: {
      position: "relative" as const,
      zIndex: 0,
      elevation: 0,
      flex: 1,
    },
  },
  text: {
    date: {
      marginTop: spacing.sm,
      color: color.text,
      textAlign: "center" as const,
    },
    time: {
      ...TextStyles.weight.bold,
      marginTop: spacing.xs,
      color: color.text,
      textAlign: "center" as const,
    },
  },
};

const styles2 = StyleSheet.create({
  pinWrapper: {
    position: "relative" as const,
    zIndex: 0,
    // marginTop: 20,
    // backgroundColor: "red"
    //paddingBottom: 20,
  },
  pinNotifContainer: {
    backgroundColor: color.white,
    position: "absolute" as const,
    zIndex: 1,
    elevation: 1,
    right: "10%",
    top: "-15%",
    borderRadius: radius.full,
  },
  pinNotifCount: {
    ...TextStyles.weight.bold,
    ...TextStyles.h6,
    paddingHorizontal: 4,
  },
  pinEvent: {
    position: "relative" as const,
    width: 70,
  },
  pinEventFront: {
    position: "absolute" as const,
    zIndex: 1,
    elevation: 1,
    padding: 20,
    top: "12%",
    left: "25%",
    width: "50%",
    height: "50%",
  },
  pinEventFrontOpac: {
    ...PinStyles.pin.front,
    opacity: 0.5,
  },
  pinEventBack: {
    ...PinStyles.pin.back,
  },
  pinEventBackOpac: {
    ...PinStyles.pin.back,
    opacity: 0.5,
  },
  pinEventBackground: {
    width: "100%",
    height: "100%",
  },
  pinEventImageActivity: {
    width: "100%",
    height: "100%",
    // backgroundColor: "green",
  },
  pinEventDate: {
    ...PinStyles.text.date,
  },
  pinEventTime: {
    ...PinStyles.text.time,
  },
});
