import { FormikErrors } from "formik";
import I18n from "i18n-js";
import i18n from "i18n-js";
import { SVGAttributes, createContext, useContext } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type GFieldProps = {
  valName: string;
  tx?: I18n.Scope;
  text?: string;
};

export type GFormProps = {
  submitTx?: i18n.Scope;
  txOptions?: i18n.TranslateOptions;
  submitText?: string;
  submitIcon?: React.FunctionComponent<SVGAttributes<SVGElement>>;
  containerStyle?: StyleProp<ViewStyle>;
};

type ContextProps = {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  };
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<any>>;
  handleSubmit: (e: any) => void;
  values: { [key: string]: any };
  errors: any;
  setFieldError: (field: string, error: string) => void;
  validateField: (e: any) => void;
};

export const GFormContext = createContext<ContextProps>({} as ContextProps);
export const useGForm = () => useContext(GFormContext);
