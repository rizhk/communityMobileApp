import { GFieldProps, useGForm } from "components/GForm/GForm.props";
import { TimeInterval } from "components/Inputs";
import { MAXIMAL_ACTIVITY_TIME, MINIMAL_ACTIVITY_TIME } from "constants/global";
import { differenceInMinutes } from "date-fns";
import { t } from "i18n-js";
import { useEffect, useState } from "react";

import { BaseField } from "./BaseField";
export interface DateTimePickerProps extends Omit<GFieldProps, "valName"> {
  valNames: { start: string; end: string };
  nestedScrollEnabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
}

export default function DateTimePicker(props: DateTimePickerProps) {
  const { minimumDate, maximumDate, valNames, tx, text, containerStyle } = props;
  const { setFieldValue, values, themeColor, setFieldError } = useGForm();
  const [minimalDate] = useState(new Date(minimumDate ?? 0));
  const [maximalDate] = useState(new Date(maximumDate ?? new Date(2100, 1, 1)));

  useEffect(() => {
    const start = new Date(values[valNames.start]);
    const end = new Date(values[valNames.end]);
    const timeDiff = differenceInMinutes(end, start);

    if (timeDiff < MINIMAL_ACTIVITY_TIME || MAXIMAL_ACTIVITY_TIME < timeDiff)
      setFieldError(
        valNames.end,
        t("createActivity.wrongActivityDuration", { min: MINIMAL_ACTIVITY_TIME, max: MAXIMAL_ACTIVITY_TIME / 60 })
      );
    else setFieldError(valNames.end, "");
  }, [values[valNames.start], values[valNames.end]]);

  return (
    <BaseField style={containerStyle}>
      <BaseField.Label tx={tx} text={text} />
      <TimeInterval
        minimumDate={minimalDate}
        maximumDate={maximalDate}
        start={values[valNames.start]}
        end={values[valNames.end]}
        setStart={(d: Date) => setFieldValue(valNames.start, d)}
        setEnd={(d: Date) => setFieldValue(valNames.end, d)}
        color={themeColor}
      />
      <BaseField.ErrorLabel valName={valNames.end} />
    </BaseField>
  );
}
