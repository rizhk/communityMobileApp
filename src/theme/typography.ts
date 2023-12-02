import { Platform } from "react-native";

import { text } from "./sizing";

export const typography = {
  primary: Platform.select({ ios: "Helvetica", android: "normal" }),
  secondary: Platform.select({ ios: "Arial", android: "sans-serif" }),

  code: Platform.select({ ios: "Courier", android: "monospace" }),
};

export const TextStyles = {
  h1: {
    fontSize: text.lg,
  },
  h2: {
    fontSize: text.md,
  },
  h3: {
    fontSize: text.sm,
  },
  h4: {
    fontSize: text.xs,
  },
  h5: {},
  h6: {},
  description: {
    fontSize: text.md,
  },
  weight: {
    normal: {
      fontWeight: "normal" as const,
    },
    bold: {
      fontWeight: "bold" as const,
    },
    upperBold: {
      textTransform: "uppercase" as const,
      fontWeight: "bold" as const,
    },
    capiBold: {
      textTransform: "capitalize" as const,
      fontWeight: "bold" as const,
    },
  },
};
