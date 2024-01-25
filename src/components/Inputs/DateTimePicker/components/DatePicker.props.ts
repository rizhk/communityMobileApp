import { ViewStyle } from "react-native";
import { ThemeColorType } from "theme";

export type NativeDatePickerProps = BaseDatePickerProps & {
  visible: boolean;
  setVisible: (vis: boolean) => void;
  mode?: "date" | "time";
};

export type BaseDatePickerProps = {
  date: Date;
  setDate: (date: any) => void;
  minimumDate?: Date;
  maximumDate?: Date;

  color?: ThemeColorType;
  txLabel?: string;
};

export type DatePickerProps = BaseDatePickerProps & {
  style?: ViewStyle;
};

export type TimeIntervalPickerProps = Omit<BaseDatePickerProps, "date" | "setDate"> & {
  start: Date;
  end: Date;
  setStart: (date: Date) => void;
  setEnd: (date: Date) => void;
};
