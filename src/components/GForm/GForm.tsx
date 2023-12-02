import { Formik, FormikConfig, FormikValues } from "formik";
import { PropsWithChildren } from "react";

import { GFormContext, GFormProps } from "./GForm.props";
import AddressPicker from "./components/AddressPicker";
import DateTimePicker from "./components/DateTimePicker";
import DropPicker from "./components/DropPicker";
import NumberPicker from "./components/NumberPicker";
import Radio from "./components/Radio";
import SubmitButton from "./components/SubmitButton";
import Switch from "./components/Switch";
import TextInput from "./components/TextInput";

GForm.SubmitButton = SubmitButton;
GForm.TextInput = TextInput;
GForm.NumberPicker = NumberPicker;
GForm.Radio = Radio;
GForm.Switch = Switch;
GForm.DateTimePicker = DateTimePicker;
GForm.DropPicker = DropPicker;
GForm.AddressPicker = AddressPicker;

export default function GForm<Values extends FormikValues = FormikValues>({
  containerStyle,
  children,
  themeColor,
  ...props
}: PropsWithChildren<FormikConfig<Values> & GFormProps>) {
  return (
    <Formik validateOnChange={false} {...props}>
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, validateField, setFieldError }) => (
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
            themeColor,
          }}
        >
          {children}
        </GFormContext.Provider>
      )}
    </Formik>
  );
}
