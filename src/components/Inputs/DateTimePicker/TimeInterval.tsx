import { Text } from "components/Text";
import { XStack, YStack } from "components/containers/Stack";
import { TextStyle, ViewStyle } from "react-native";
import { color, spacing } from "theme";
import { inputFieldStyle } from "theme/styles";

import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";
import { TimeIntervalPickerProps } from "./components/DatePicker.props";
import { format } from "date-fns";

export function TimeInterval(props: TimeIntervalPickerProps) {
  const { start, end, setStart, setEnd, minimumDate, maximumDate, color } = props;

  const updateDate = (date: Date) => {
    const startNew = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      start.getHours(),
      start.getMinutes()
    );
    const endNew = new Date(date.getFullYear(), date.getMonth(), date.getDate(), end.getHours(), end.getMinutes());
    setStart(startNew);
    if (startNew > endNew) setEnd(startNew);
    else setEnd(endNew);
  };

  const updateTime = (date: Date, d: Date, setD: (date: Date) => void) => {
    setD(new Date(d.getFullYear(), d.getMonth(), d.getDate(), date.getHours(), date.getMinutes()));
  };

  const onStartChange = (date: Date) => {
    updateTime(date, start, setStart);
    if (date > end) updateTime(date, end, setEnd);
  };

  const onEndChange = (date: Date) => {
    updateTime(date, end, setEnd);
    if (date < start) updateTime(date, start, setStart);
  };

  return (
    <YStack gap="sm">
      <DatePicker date={start} setDate={updateDate} minimumDate={minimumDate} maximumDate={maximumDate} color={color} />
      <XStack jc="space-around" gap="sm" ai="center">
        <XStack ai="center" jc="center" gap="sm" style={labelContainer}>
          <Text size="sm" preset="bold" tx="timePicker.from" style={timeLabel} />
          <TimePicker
            date={start}
            // setDate={(date) => updateTime(date, start, setStart)}
            setDate={onStartChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            color={color}
          />
        </XStack>
        <XStack ai="center" jc="center" gap="sm" style={labelContainer}>
          <Text size="sm" preset="bold" tx="timePicker.to" style={timeLabel} />
          <TimePicker
            date={end}
            // setDate={(date) => updateTime(date, end, setEnd)}
            setDate={onEndChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            color={color}
          />
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
