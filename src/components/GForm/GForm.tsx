import { Formik, FormikConfig, FormikValues } from "formik";
import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { AppButton } from "styles";

// import GDate from './GDate'
import { GFormContext, GFormProps } from "./GForm.props";
// import GIconInput from './GIconInput'
// import GImagePicker from './GImagePicker'
import GInput from "./GInput";
import React from "react";
// import GSelect from './GSelect'
// import GStack from './GStack'
// import GSwitch from './GSwitch'

// GForm.IconInput = GIconInput
GForm.Input = GInput;
// GForm.DatePicker = GDate
// GForm.Select = GSelect
// GForm.Stack = GStack
// GForm.ImagePicker = GImagePicker
// GForm.Switch = GSwitch

export default function GForm<Values extends FormikValues = FormikValues>({
  submitLabel,
  submitIcon = undefined,
  children,
  ...props
}: PropsWithChildren<FormikConfig<Values> & GFormProps>) {
  // useEffect(() => {
  //   if (status === 'submitting') {
  //     const timer = setTimeout(() => setStatus('off'), 2000)
  //     return () => {
  //       clearTimeout(timer)
  //     }
  //   }
  // }, [status])
  // console.log('test', props.onSubmit)
  return (
    <Formik validateOnChange={false} {...props}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        validateField,
        isSubmitting,
        setFieldError,
      }) => (
        <Form
          gap={8}
          jc="space-between"
          width="100%"
          flexShrink={1}
          flexGrow={1}
          onSubmit={handleSubmit}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 125 : 20}
            style={{ flex: 1 }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <YStack gap="$2">
                <GFormContext.Provider
                  value={{
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    setFieldValue,
                    values,
                    errors,
                    validateField,
                    setFieldError,
                  }}
                >
                  {children}
                </GFormContext.Provider>
              </YStack>
            </ScrollView>
          </KeyboardAvoidingView>
          <AppButton
            iconAfter={isSubmitting ? () => <Spinner color="$color11" /> : submitIcon ?? undefined}
          >
            {!isSubmitting && submitLabel}
          </AppButton>
        </Form>
      )}
    </Formik>
  );
}
