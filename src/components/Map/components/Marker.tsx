import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import { Text } from "components/Text";

import { Image } from "react-native";
import { color, spacing, TextStyles, shadow, text } from "theme";

import Svg, { Path } from "react-native-svg";

const PinIcon = ({ bgColor = color.primary }) => {
  return (
    <Svg width="60.435" height="80.101" viewBox="0 0 60.435 80.101">
      <Path
        d="M-548.5-413.5a21.2,21.2,0,0,1,21.2-21.2,21.2,21.2,0,0,1,21.2,21.2,21.2,21.2,0,0,1-21.2,21.2h0v19.7C-540.131-384.143-549.187-397.011-548.5-413.5Z"
        transform="translate(557.54 443.7)"
        fill={bgColor}
      />
    </Svg>
  );
};

interface CustomMarkerProps {
  participantCount: number | undefined;
  image: string | undefined;
  //   pinImage?: IconTypes | ImageRequireSource;
  pinImage?: any;
  type?: "activity" | "field" | "tournament";
}

export function CustomMarker(props: CustomMarkerProps) {
  const {
    type,

    participantCount,
    image,
    pinImage,
  } = props;
  const pinType = type ? `pin-${type}` : "pin-activity";

  return (
    <TouchableOpacity activeOpacity={1} style={styles.pinWrapper}>
      <View style={styles.pinContainer}>
        <PinIcon />
        {/* TODO: Use CLoudinary image ? Or improve function to get image from cloudinary */}
        {image && <Image source={{ uri: image }} resizeMode="contain" style={styles.pinImage} />}
        <View style={styles.notificationBubble}>
          <Text style={styles.notificationText}>{participantCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// const pin;

const styles = StyleSheet.create({
  pinWrapper: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  pinContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pinImage: {
    width: 30,
    height: 30,
    position: "absolute",
    top: 16,
    left: 14,
  },
  notificationBubble: {
    position: "absolute",
    top: 8,
    right: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: color.white,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    ...shadow.sm,
  },
  notificationText: {
    color: color.black,
    fontSize: text.xxs,
    // fontWeight: TextStyles.weight.bold.fontWeight,
    ...TextStyles.weight.bold,
  },
});
