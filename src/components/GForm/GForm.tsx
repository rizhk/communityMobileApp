import { Formik, FormikConfig, FormikValues } from "formik";
import { PropsWithChildren } from "react";

import { GFormContext, GFormProps } from "./GForm.props";
import SubmitButton from "./components/SubmitButton";
import TextInput from "./components/TextInput";
import NumberPicker from "./components/NumberPicker";

GForm.SubmitButton = SubmitButton;
GForm.TextInput = TextInput;
GForm.NumberPicker = NumberPicker;

export default function GForm<Values extends FormikValues = FormikValues>({
  submitTx = "common.submit",
  submitText,
  submitIcon,
  containerStyle,
  children,
  ...props
}: PropsWithChildren<FormikConfig<Values> & GFormProps>) {
  const submitButtonProps = { tx: submitTx, text: submitText };
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
        setFieldError,
      }) => (
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
      )}
    </Formik>
  );
}
