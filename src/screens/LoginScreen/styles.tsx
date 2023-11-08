import { StyleSheet } from "react-native";

import { color, typography, spacing, textSize, TextStyles } from "theme";

const styles = StyleSheet.create({
  main: {
    backgroundColor: color.background,
    height: "100%",
  },
  header: {
    color: color.headercolor,
    fontSize: textSize.lg,
    fontFamily: typography.primary,
    fontWeight: TextStyles.weight.bold.fontWeight,
    alignSelf: "center",
    marginTop: 51,
    marginBottom: 5,
  },
  image: {
    height: 108,
    width: 78,
    alignSelf: "center",
    marginTop: 47,
  },
  buttonOutline: {
    marginHorizontal: spacing.xl * 3,
    marginVertical: spacing.sm,
  },
});

export default styles;
