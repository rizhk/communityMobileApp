import { GFieldProps, useGForm } from "components/GForm/GForm.props";
import { TimeInterval } from "components/Inputs";
import { useState } from "react";

import { BaseField } from "./BaseField";
export interface DateTimePickerProps extends Omit<GFieldProps, "valName"> {
  valNames: { start: string; end: string };
  nestedScrollEnabled?: boolean;
  minDate: Date;
}

export default function DateTimePicker(props: DateTimePickerProps) {
  const { minDate, valNames, tx, text, containerStyle } = props;
  const { setFieldValue, values, themeColor } = useGForm();
  const [minimalDate] = useState(new Date(minDate ?? 0));

  return (
    <BaseField style={containerStyle}>
      <BaseField.Label tx={tx} text={text} />
      <TimeInterval
        minDate={minimalDate}
        start={values[valNames.start]}
        end={values[valNames.end]}
        setStart={(d: Date) => setFieldValue(valNames.start, d)}
        setEnd={(d: Date) => setFieldValue(valNames.end, d)}
        color={themeColor}
      />
    </BaseField>
  );
}
