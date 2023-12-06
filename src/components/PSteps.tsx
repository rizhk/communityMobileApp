import { Tick } from "assets/svg";
import { Button, ButtonProps } from "components/Button";
import { Icon } from "components/Icon";
import { Text } from "components/Text";
import { Stack, StackProps, XStack, YStack } from "components/containers/Stack";
import { i18n } from "i18n";
import { Children, createContext, useContext, useState } from "react";
import { View } from "react-native";
import { ThemeColorType } from "theme/color";

export type PStepsContextType = {
  currentStep: number;
  labels: string[];
};

const PStepsContext = createContext<PStepsContextType>({} as PStepsContextType);

const usePSteps = () => useContext(PStepsContext);

export type PStepsProps = {
  children: React.ReactNode;
  color?: ThemeColorType;
  inactiveColor?: ThemeColorType;
  nextTx?: i18n.Scope;
  previousTx?: i18n.Scope;
  submitTx?: i18n.Scope;
  onNext?: () => void;
  onPrevious?: () => void;
  onSubmit?: () => void;
  iconMode?: boolean;
  submitButton?: JSX.Element;
  buttonProps?: ButtonProps;
};

export function PSteps(props: PStepsProps) {
  const {
    children,
    color = "primary",
    inactiveColor = "grey600",
    nextTx,
    previousTx,
    submitTx,
    onNext,
    onPrevious,
    onSubmit,
    submitButton,
    buttonProps,
  } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const labels: string[] =
    Children.map(children, (child) => {
      return (child as any).props.label;
    }) || [];
  const pressNext = () => {
    setCurrentStep(currentStep + 1);
    onNext && onNext();
  };

  const pressPrevious = () => {
    setCurrentStep(currentStep - 1);
    onPrevious && onPrevious();
  };

  const pressSubmit = () => {
    onSubmit && onSubmit();
  };

  return (
    <PStepsContext.Provider
      value={{
        labels,
        currentStep,
      }}
    >
      <YStack flexGrow>
        <XStack jc="center" style={{ paddingVertical: 10 }}>
          {labels.map((label, index) => {
            const state = index === currentStep ? "active" : index < currentStep ? "completed" : "inactive";
            const stepColor = state === "inactive" ? inactiveColor : color;
            return (
              <XStack key={index} position="relative">
                {index !== 0 && <XStack w={42} h={4} bc={stepColor} position="absolute" x={-20} y={13} z={100} />}
                <YStack ai="center" gap="xxs">
                  <Stack
                    key={index}
                    br="full"
                    borderWidth={3}
                    borderColor={stepColor}
                    bc={state === "completed" ? stepColor : "transparent"}
                    jc="center"
                    ai="center"
                    gap="sm"
                    w={30}
                    h={30}
                  >
                    {state === "completed" && <Icon icon={Tick} color="white" />}
                    {state !== "completed" && (
                      <Text text={`${index + 1}`} color={state === "inactive" ? inactiveColor : "white"} />
                    )}
                  </Stack>
                  <Text
                    size={14}
                    text={label}
                    color={state === "inactive" ? inactiveColor : "white"}
                    style={{ width: 70, paddingHorizontal: 2, textAlign: "center" }}
                  />
                </YStack>
              </XStack>
            );
          })}
        </XStack>
        {children}
        <XStack ai="center" jc="space-between">
          <View style={{ flex: 1 }}>
            {currentStep !== 0 && (
              <Button
                text={i18n.t(previousTx || "common.previous")}
                textColor={color}
                onPress={pressPrevious}
                preset="plainText"
                size="sm"
                {...buttonProps}
              />
            )}
          </View>
          <View style={{ flex: 1 }}>
            {currentStep !== labels.length - 1 && (
              <Button
                text={i18n.t(nextTx || "common.next")}
                textColor={color}
                onPress={pressNext}
                preset="plainText"
                size="sm"
                {...buttonProps}
              />
            )}
            {currentStep === labels.length - 1 && submitButton !== undefined && submitButton}
            {currentStep === labels.length - 1 && submitButton === undefined && (
              <Button
                text={i18n.t(submitTx || "common.submit")}
                textColor={color}
                onPress={pressSubmit}
                preset="plainText"
                size="sm"
                {...buttonProps}
              />
            )}
          </View>
        </XStack>
      </YStack>
    </PStepsContext.Provider>
  );
}

export interface PStepProps extends StackProps {
  children: React.ReactNode;
  label: string;
}

export function PStep(props: PStepProps) {
  const { children, label, flexGrow = true, direction = "column", jc = "center", style = {}, ...rest } = props;
  const { currentStep, labels } = usePSteps();
  if (label === labels[currentStep])
    return (
      <Stack flexGrow={flexGrow} direction={direction} jc={jc} {...rest} style={[{ marginTop: 10 }, style]}>
        {children}
      </Stack>
    );
}
