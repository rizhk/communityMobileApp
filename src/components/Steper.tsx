import { t } from "i18n-js";
import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { ProgressSteps, ProgressStepsProps, ProgressStep } from "react-native-progress-steps";
import { color as ThemeColor, ThemeColorType } from "theme/color";

export interface PStepsProps extends ProgressStepsProps {
  color?: ThemeColorType;
  children: React.ReactNode;
}

export default function PSteps(props: PStepsProps) {
  const [state, setState] = React.useState(0);
  const { children, color = "primary", ...rest } = props;

  return (
    <ProgressSteps
      activeStepNumColor={ThemeColor["white"]}
      activeLabelColor={ThemeColor[color]}
      //   activeStepIconColor={ThemeColor[color]}
      completedProgressBarColor={ThemeColor[color]}
      completedStepIconColor={ThemeColor[color]}
      activeStepIconBorderColor={ThemeColor[color]}
    >
      {children}
    </ProgressSteps>
  );
}
export interface PStepProps {
  children: React.ReactNode;
  label: string;
}
export function PStep(props: PStepProps) {
  const { children, label } = props;

  return (
    <ProgressStep
      label={label}
      //   nextBtnText={t("common.next")}
      //   previousBtnText={t("common.previous")}
      //   nextBtnStyle={btnStyle}
      //   nextBtnTextStyle={btnTextStyle}
      //   previousBtnStyle={btnStyle}
      //   previousBtnTextStyle={btnTextStyle}
    >
      {children}
    </ProgressStep>
  );
}

const btnStyle = {} as ViewStyle;
const btnTextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  color: ThemeColor["white"],
} as TextStyle;
