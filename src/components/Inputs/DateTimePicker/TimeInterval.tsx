import { Text } from "components/Text";
import { XStack, YStack } from "components/containers/Stack";
import { TextStyle, ViewStyle } from "react-native";
import { ThemeColorType, color, spacing } from "theme";
import { inputFieldStyle } from "theme/styles";

import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";

export type TimeIntervalProps = {
  start: Date;
  end: Date;
  setStart: (date: Date) => void;
  setEnd: (date: Date) => void;
  minDate?: Date;
  color?: ThemeColorType;
};

export function TimeInterval(props: TimeIntervalProps) {
  const { start, end, setStart, setEnd, minDate, color } = props;

  const updateDate = (date: Date) => {
    setStart(new Date(date.getFullYear(), date.getMonth(), date.getDate(), start.getHours(), start.getMinutes()));
    setEnd(new Date(date.getFullYear(), date.getMonth(), date.getDate(), end.getHours(), end.getMinutes()));
  };

  const updateTime = (date: Date, d: Date, setD: (date: Date) => void) => {
    setD(new Date(d.getFullYear(), d.getMonth(), d.getDate(), date.getHours(), date.getMinutes()));
  };

  return (
    <YStack gap="sm">
      <DatePicker date={start} setDate={updateDate} minDate={minDate} color={color} />
      <XStack jc="space-around" gap="sm" ai="center">
        <XStack ai="center" jc="center" gap="sm" style={labelContainer}>
          <Text size="sm" preset="bold" tx="timePicker.from" style={timeLabel} />
          <TimePicker
            date={start}
            setDate={(date) => updateTime(date, start, setStart)}
            minDate={minDate}
            color={color}
          />
        </XStack>
        <XStack ai="center" jc="center" gap="sm" style={labelContainer}>
          <Text size="sm" preset="bold" tx="timePicker.to" style={timeLabel} />
          <TimePicker date={end} setDate={(date) => updateTime(date, end, setEnd)} minDate={start} color={color} />
        </XStack>
      </XStack>
    </YStack>
  );
}

const timeLabel = {
  textTransform: "capitalize",
  textAlign: "center",
} as TextStyle;

const labelContainer = {
  ...inputFieldStyle,
  backgroundColor: color.grey800,
  paddingLeft: spacing.sm,
  paddingRight: 0,
} as ViewStyle;
