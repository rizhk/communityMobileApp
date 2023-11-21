export const textWeight = {
  normal: "normal" as const,
  bold: "bold" as const,
};

export type TextSizeTypes = keyof typeof textWeight;
